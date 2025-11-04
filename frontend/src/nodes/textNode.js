import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [textValue, setTextValue] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeHeight, setNodeHeight] = useState(140);
  const textRef = useRef(null);

  //Parse {{variables}} from text
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const found = Array.from(textValue.matchAll(regex)).map((m) => m[1]);
    setVariables([...new Set(found)]);
  }, [textValue]);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const prevScrollY = el.scrollTop;
      el.style.height = 'auto';
      const targetHeight = Math.min(Math.max(60, el.scrollHeight), 240);
      el.style.height = `${targetHeight}px`;
      const totalHeight = targetHeight + 90;
      if (Math.abs(totalHeight - nodeHeight) > 5) setNodeHeight(totalHeight);
      el.scrollTop = prevScrollY;
    }
  }, [textValue]);

  return (
    <div
      className="vs-node"
      style={{
        width: 280,
        height: nodeHeight,
        position: 'relative',
        transition: 'height 0.2s ease',
      }}
    >
      {/* Variable handles + labels */}
      {variables.map((v, i) => (
        <div
          key={v}
          style={{
            position: 'absolute',
            top: `${(i + 1) * (100 / (variables.length + 1))}%`,
            left: '-50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '45px',
            gap: '6px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none', 
          }}
        >
          <span
            style={{
              color: '#a1a1aa',
              fontSize: 11,
              fontFamily: 'Inter, monospace',
              background: '#1f1f29',
              borderRadius: 4,
              padding: '1px 4px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {v}
          </span>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${v}`}
            style={{
              left: 46,
              background: 'var(--vs-handle)',
              pointerEvents: 'auto',
            }}
          />
        </div>
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
      />

      {/* Header */}
      <div className="vs-node__title">Text</div>

      {/* Text area */}
      <label className="vs-label" style={{ flex: 1 }}>
        Text:
        <textarea
          ref={textRef}
          className="vs-input"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          style={{
            resize: 'none',
            width: '100%',
            lineHeight: 1.5,
            overflowY: 'hidden',
            background: '#2a2a34',
          }}
        />
      </label>
    </div>
  );
};
