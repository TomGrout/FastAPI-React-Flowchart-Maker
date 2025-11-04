import { useState } from 'react';
import { createNode } from './factory';

export const InputNode = createNode({
  title: 'Input',
  outputs: [{ id: 'value' }],
  Render: ({ id, data }) => {
    const [currName, setCurrName] = useState(
      data?.inputName || id.replace('customInput-', 'input_')
    );
    const [inputType, setInputType] = useState(data.inputType || 'Text');

    return (
      <div className="vs-node">
        {/* Header */}
        <div className="vs-node__title">Input</div>

        {/* Name field */}
        <label className="vs-label">
          Name:
          <input
            className="vs-input"
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>

        {/* Type dropdown */}
        <label className="vs-label">
          Type:
          <select
            className="vs-select"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    );
  },
});
