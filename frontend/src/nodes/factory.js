import React from 'react';
import { BaseNode } from './baseNode';

export const createNode = (config) => {
  return function NodeComponent({ id, data }) {
    
    const Content = config.Render
      ? config.Render
      : () => <div>No content defined.</div>;

    return (
      <BaseNode
        id={id}
        title={config.title}
        inputs={config.inputs}
        outputs={config.outputs}
        content={<Content id={id} data={data} />}      />
    );
  };
};
