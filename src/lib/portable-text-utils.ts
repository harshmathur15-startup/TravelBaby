/**
 * Extract plain text from Portable Text blocks for reading time, excerpts, etc.
 */

interface PortableTextChild {
  _type: string;
  text?: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextChild[];
}

export function portableTextToPlainText(blocks: PortableTextBlock[]): string {
  if (!blocks?.length) return '';
  return blocks
    .filter((block) => block._type === 'block' && block.children)
    .map((block) => block.children!.map((child) => child.text ?? '').join(''))
    .join('\n\n');
}
