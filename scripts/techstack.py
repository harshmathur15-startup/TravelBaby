"""
Tech Stack Detection — scans a repo and reports languages, frameworks, and key dependencies.
Usage: python scripts/techstack.py [path]
"""

import os
import json
import sys
from collections import defaultdict

SKIP_DIRS = {"node_modules", ".git", ".next", ".nuxt", "dist", "build", "__pycache__", ".venv", "venv", ".turbo", ".cache"}

EXT_MAP = {
    ".py": "Python",
    ".js": "JavaScript",
    ".mjs": "JavaScript",
    ".cjs": "JavaScript",
    ".ts": "TypeScript",
    ".tsx": "React/TypeScript",
    ".jsx": "React/JSX",
    ".astro": "Astro",
    ".vue": "Vue",
    ".svelte": "Svelte",
    ".html": "HTML",
    ".css": "CSS",
    ".scss": "SCSS",
    ".java": "Java",
    ".go": "Go",
    ".cs": "C#",
    ".rs": "Rust",
    ".kt": "Kotlin",
    ".swift": "Swift",
    ".rb": "Ruby",
    ".sh": "Shell",
    ".php": "PHP",
    ".sql": "SQL",
    ".prisma": "Prisma",
    ".graphql": "GraphQL",
    ".gql": "GraphQL",
}

KNOWN_FRAMEWORKS = {
    "next": "Next.js",
    "react": "React",
    "vue": "Vue",
    "nuxt": "Nuxt",
    "angular": "Angular",
    "svelte": "Svelte",
    "astro": "Astro",
    "express": "Express",
    "fastify": "Fastify",
    "nestjs": "NestJS",
    "@nestjs/core": "NestJS",
    "hono": "Hono",
    "django": "Django",
    "flask": "Flask",
    "fastapi": "FastAPI",
    "prisma": "Prisma",
    "@prisma/client": "Prisma",
    "drizzle-orm": "Drizzle",
    "typeorm": "TypeORM",
    "sequelize": "Sequelize",
    "tailwindcss": "Tailwind CSS",
    "@tailwindcss/vite": "Tailwind CSS",
    "bullmq": "BullMQ",
    "ioredis": "Redis (ioredis)",
    "zod": "Zod",
    "@anthropic-ai/sdk": "Anthropic SDK",
    "@modelcontextprotocol/sdk": "MCP SDK",
    "openai": "OpenAI SDK",
    "stripe": "Stripe",
    "@supabase/supabase-js": "Supabase",
    "firebase": "Firebase",
    "vitest": "Vitest",
    "jest": "Jest",
    "playwright": "Playwright",
    "@playwright/test": "Playwright",
    "cypress": "Cypress",
}


def scan_repo(repo_path="."):
    language_count = defaultdict(int)
    frameworks = []
    dep_file_found = False

    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]

        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in EXT_MAP:
                language_count[EXT_MAP[ext]] += 1

            # Shebang detection for extensionless files
            if ext == "":
                file_path = os.path.join(root, f)
                try:
                    with open(file_path, "r", errors="ignore") as fh:
                        first_line = fh.readline()
                        if first_line.startswith("#!"):
                            if "python" in first_line.lower():
                                language_count["Python"] += 1
                            elif "node" in first_line.lower():
                                language_count["JavaScript"] += 1
                            elif "sh" in first_line.lower():
                                language_count["Shell"] += 1
                except (OSError, UnicodeDecodeError):
                    pass

    # --- Detect frameworks from package.json ---
    pkg_json = os.path.join(repo_path, "package.json")
    if os.path.exists(pkg_json):
        dep_file_found = True
        try:
            with open(pkg_json) as f:
                data = json.load(f)
            all_deps = {}
            for key in ("dependencies", "devDependencies", "peerDependencies"):
                if key in data:
                    all_deps.update(data[key])
            seen = set()
            for pkg, label in KNOWN_FRAMEWORKS.items():
                if pkg in all_deps and label not in seen:
                    seen.add(label)
                    frameworks.append(f"{label} ({all_deps[pkg]})")
        except (json.JSONDecodeError, OSError):
            pass

    # --- Detect frameworks from Python dependency files ---
    python_fw = {"django": "Django", "flask": "Flask", "fastapi": "FastAPI", "pyramid": "Pyramid"}
    for req_file in ("requirements.txt", "pyproject.toml", "Pipfile"):
        path = os.path.join(repo_path, req_file)
        if os.path.exists(path):
            dep_file_found = True
            try:
                with open(path, errors="ignore") as f:
                    content = f.read().lower()
                for pkg, label in python_fw.items():
                    if pkg in content:
                        frameworks.append(label)
            except OSError:
                pass

    return language_count, frameworks, dep_file_found


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "."
    langs, frameworks, has_deps = scan_repo(path)

    print(f"=== Tech Stack: {os.path.basename(os.path.abspath(path))} ===\n")

    if langs:
        print("Languages:")
        for lang, count in sorted(langs.items(), key=lambda x: -x[1]):
            print(f"  {lang}: {count} files")
    else:
        print("No recognized languages detected.")

    if frameworks:
        print(f"\nFrameworks & Libraries:")
        for fw in sorted(frameworks):
            print(f"  {fw}")
    elif has_deps:
        print("\nNo known frameworks detected in dependency files.")
    else:
        print("\nNo dependency files found (package.json, requirements.txt, etc.)")
