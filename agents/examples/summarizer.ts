// Example Agent: Summarizer — demonstrates the full BaseAgent lifecycle.
// Clone this file as a starting point for your own agents.

import Anthropic from '@anthropic-ai/sdk'
import {
  BaseAgent, type AgentConfig, type AgentInput,
  type AgentOutput, type AgentTool, AGENT_MODELS,
} from '../src/core/BaseAgent'

// 1. Define your result and input types
interface SummaryResult { summary: string, wordCount: number }
interface SummaryInput extends AgentInput { context: { text: string } }

// 3. Extend BaseAgent with your input/result types
export class SummarizerAgent extends BaseAgent<SummaryInput, SummaryResult> {
  constructor(triggeredBy: string) {
    // 4. Configure the agent contract: model, caps, write scope
    const config: AgentConfig = {
      agentId: 'summarizer',
      role: 'Text Summarizer',
      goal: 'Produce concise summaries of input text',
      model: AGENT_MODELS.REASONING,
      maxIterations: 3,
      maxExecutionTimeMs: 30_000,
      humanInputMode: 'NEVER',
      writeScope: [],          // read-only agent — no write tools
      triggeredBy,
    }
    super(config)
  }

  // 5. System prompt — defines the agent's personality and constraints
  getSystemPrompt(): string {
    return 'You are a summarizer. Produce a concise summary of the given text. '
      + 'Use the submit_summary tool to return your result.'
  }

  // 6. Tool definitions — the agent's available actions
  getTools(): AgentTool[] {
    return [{
      name: 'submit_summary',
      description: 'Submit the final summary',
      inputSchema: {
        type: 'object' as const,
        properties: {
          summary: { type: 'string', description: 'The concise summary' },
        },
        required: ['summary'],
      },
      isWrite: false,
      isIdempotent: true,
    }]
  }

  // 7. Tool execution — runs when the model calls a tool
  async executeTool(name: string, input: Record<string, unknown>): Promise<unknown> {
    if (name === 'submit_summary') return { submitted: true, summary: input.summary }
    throw new Error(`Unknown tool: ${name}`)
  }

  // 8. Parse the conversation into your result type
  parseOutput(messages: Anthropic.MessageParam[]): AgentOutput<SummaryResult> {
    const last = messages.at(-1)
    const text = typeof last?.content === 'string' ? last.content : ''
    const summary = text || 'No summary produced'
    return {
      success: true,
      result: { summary, wordCount: summary.split(/\s+/).length },
      confidence: 0.85,
      reasoning: [{ iteration: 1, thought: 'Summarized input text', timestamp: new Date().toISOString() }],
      tokenUsage: { input: 0, output: 0, cacheHit: 0 },
      durationMs: 0,
      stopReason: 'end_turn',
    }
  }
}
