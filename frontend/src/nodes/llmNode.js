import { useState } from 'react';
import { createNode } from './factory';

const LLMRender = ({ id, data }) => {
  const [llmName, setLlmName] = useState(
    data?.llmName || id.replace('customLLM-', 'llm_')
  );
  const [description, setDescription] = useState(
    data?.description || 'This is an LLM node.'
  );

  return (
    <div className="vs-node">
      <div className="vs-node__title">LLM</div>

      <label className="vs-label">
        Name:
        <input
          className="vs-input"
          type="text"
          value={llmName}
          onChange={(e) => setLlmName(e.target.value)}
        />
      </label>

      <label className="vs-label">
        Description:
        <input
          className="vs-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
    </div>
  );
};

export const LLMNode = createNode({
  title: 'LLM',
  inputs: [
    { id: 'system' },
    { id: 'prompt' },
  ],
  outputs: [{ id: 'response' }],
  Render: LLMRender,
});
