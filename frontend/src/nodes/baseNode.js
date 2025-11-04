// baseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, inputs = [], outputs = [], content }) => {
  return (
    <div style={{ position: 'relative' }}>
      {/* Input handles (left side) */}
      {inputs?.map((inp, i) => (
        <Handle
          key={inp.id}
          type="target"
          position={inp.position || Position.Left}
          id={`${id}-${inp.id}`}
          style={{
            top: inp.top || `${(i + 1) * (100 / (inputs.length + 1))}%`,
          }}
        />
      ))}

      {/* Output handles (right side) */}
      {outputs?.map((out, i) => (
        <Handle
          key={out.id}
          type="source"
          position={out.position || Position.Right}
          id={`${id}-${out.id}`}
          style={{
            top: out.top || `${(i + 1) * (100 / (outputs.length + 1))}%`,
          }}
        />
      ))}

      {/* Node visual/content */}
      {content}
    </div>
  );
};
