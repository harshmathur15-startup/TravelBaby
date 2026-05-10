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

  const prompt = `You are an expert Vedic and Western astrologer specialising in travel recommendations for Indian travellers. A user has provided their birth details:

Date of Birth: ${dob}
Time of Birth: ${tob}
Place of Birth: ${pob}

Based on their astrological chart, provide personalised travel recommendations. The user is from India.

Respond ONLY with valid JSON — no markdown, no code fences, no extra text:
{
  "sign": "Sun sign name",
  "symbol": "Zodiac symbol emoji",
  "element": "Fire | Earth | Air | Water",
  "risingSign": "Approximate rising sign based on birth time",
  "cosmicProfile": "2-3 sentence poetic description of this person as a traveller",
  "travelStyle": "Short label e.g. 'The Spiritual Wanderer'",
  "domesticBeach": [
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" }
  ],
  "domesticMountain": [
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "City or Place", "state": "Indian State", "emoji": "relevant emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" }
  ],
  "international": [
    { "name": "Country name", "emoji": "country flag emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "Country name", "emoji": "country flag emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "Country name", "emoji": "country flag emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "Country name", "emoji": "country flag emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" },
    { "name": "Country name", "emoji": "country flag emoji", "tagline": "5-word evocative tagline", "whyItFits": "1 sentence astrological reason" }
  ],
  "bestMonths": ["Month1", "Month2", "Month3"],
  "cosmicMessage": "One inspiring closing line about their cosmic travel destiny"
}`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    const cleaned = raw
      .replace(/^```(?:json)?\s*/m, '')
      .replace(/\s*```\s*$/m, '')
      .trim()
    const data = JSON.parse(cleaned)

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[astro-reading] error:', err)
    return new Response(
      JSON.stringify({ error: 'Failed to generate reading. Please try again.' }),
      { status: 500 },
    )
  }
}
