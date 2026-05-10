import type { APIRoute } from 'astro'
import Anthropic from '@anthropic-ai/sdk'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Service not configured.' }), { status: 500 })
  }

  let body: { dob?: string; tob?: string; pob?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400 })
  }

  const { dob, tob, pob } = body
  if (!dob || !tob || !pob) {
    return new Response(JSON.stringify({ error: 'Missing birth details.' }), { status: 400 })
  }

  const client = new Anthropic({ apiKey })

  const prompt = `You are an expert Vedic and Western astrologer who specialises in travel recommendations. A user has provided their birth details:

Date of Birth: ${dob}
Time of Birth: ${tob}
Place of Birth: ${pob}

Based on their astrological chart, provide personalised travel recommendations. Consider their:
- Sun sign (core identity and what energises them)
- Approximate rising sign based on birth time (how they engage with new environments)
- Dominant element and modality
- Ruling planet and what it governs in travel

Respond ONLY with valid JSON in exactly this structure (no markdown, no extra text):
{
  "sign": "Sun sign name",
  "symbol": "Zodiac symbol emoji",
  "element": "Fire | Earth | Air | Water",
  "risingSign": "Approximate rising sign",
  "cosmicProfile": "2-3 sentence poetic description of this person's travel soul",
  "destinations": [
    {
      "rank": 1,
      "name": "City or Region",
      "country": "Country",
      "emoji": "Relevant emoji",
      "whyItFits": "2 sentences explaining the astrological alignment",
      "experiences": ["Experience 1", "Experience 2", "Experience 3"]
    },
    {
      "rank": 2,
      "name": "City or Region",
      "country": "Country",
      "emoji": "Relevant emoji",
      "whyItFits": "2 sentences explaining the astrological alignment",
      "experiences": ["Experience 1", "Experience 2", "Experience 3"]
    },
    {
      "rank": 3,
      "name": "City or Region",
      "country": "Country",
      "emoji": "Relevant emoji",
      "whyItFits": "2 sentences explaining the astrological alignment",
      "experiences": ["Experience 1", "Experience 2", "Experience 3"]
    }
  ],
  "travelStyle": "Short label e.g. 'The Spiritual Wanderer'",
  "travelStyleDesc": "1-2 sentences on how they travel best",
  "bestMonths": ["Month1", "Month2", "Month3"],
  "avoidTip": "One sentence on what kind of travel drains them",
  "cosmicMessage": "One inspiring closing line about their cosmic travel destiny"
}`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const data = JSON.parse(text)

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to generate reading. Please try again.' }),
      {
        status: 500,
      },
    )
  }
}
