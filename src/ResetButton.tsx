import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

function ResetButton() {
  const queryCache = useQueryCache();
  const [mutate] = useMutation(async () => {
    const filename = localStorage.getItem('files');
    const res = await fetch(`/reset-csv?filename=${filename}`, { method: 'POST' });
    return res.json();
  }, {
    onSuccess: () => {
      queryCache.invalidateQueries('output');
    }
  });
  const onReset = async () => {
    await mutate();
    localStorage.removeItem('files');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
      <button style={{ padding: 12 }} onClick={onReset}>Reset</button>
    </div>
  );
}

export default ResetButton;
