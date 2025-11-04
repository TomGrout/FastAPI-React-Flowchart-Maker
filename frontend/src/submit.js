import React from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      alert(
        `Pipeline Analysis:\n\n` +
        `Nodes: ${result.num_nodes}\n` +
        `Edges: ${result.num_edges}\n` 
        `Is DAG: ${result.is_dag ? 'Yes ' : 'No '}`
      );
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert('Failed to submit. Check console for details.');
    }
  };

};
