import React from 'react';
import { useMutation, useQueryCache } from 'react-query';

function ResetButton() {
  const queryCache = useQueryCache()
  const [mutate] = useMutation(async () => {
    const res = await fetch('/reset-csv', { method: 'POST' });
    return res.json();
  }, {
    onSuccess: () => {
      queryCache.invalidateQueries('output');
    }
  });
  const onReset = async () => {
    await mutate();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
      <button style={{ padding: 12 }} onClick={onReset}>Reset</button>
    </div>
  );
}

export default ResetButton;
