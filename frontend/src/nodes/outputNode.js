import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <div className="vs-node">
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={{ top: '50%' }}
      />

      {/* Header */}
      <div className="vs-node__title">Output</div>

      {/* Fields */}
      <label className="vs-label">
        Name:
        <input
          className="vs-input"
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </label>

      <label className="vs-label">
        Type:
        <select
          className="vs-select"
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </div>
  );
};
