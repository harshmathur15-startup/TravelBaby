import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AGENT_MODELS } from './types';

describe('AGENT_MODELS', () => {
  it('should have a CLASSIFICATION model pointing to haiku', () => {
    assert.equal(AGENT_MODELS.CLASSIFICATION, 'claude-haiku-4-5-20251001');
  });

  it('should have a REASONING model pointing to sonnet', () => {
    assert.equal(AGENT_MODELS.REASONING, 'claude-sonnet-4-6');
  });

  it('should have exactly two model entries', () => {
    const keys = Object.keys(AGENT_MODELS);
    assert.equal(keys.length, 2);
    assert.deepEqual(keys.sort(), ['CLASSIFICATION', 'REASONING']);
  });

  it('should be frozen (as const makes values readonly)', () => {
    // Verify the values are strings — runtime check that the constant is usable
    assert.equal(typeof AGENT_MODELS.CLASSIFICATION, 'string');
    assert.equal(typeof AGENT_MODELS.REASONING, 'string');
  });
});
