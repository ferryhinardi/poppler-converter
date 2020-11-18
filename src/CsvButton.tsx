import React from 'react';
import { useMutation } from 'react-query';
import './CsvButton';

function CsvButton() {
  const [mutate] = useMutation(async () => {
    const filename = localStorage.getItem('files');
    const res = await fetch(`/export-csv?filename=${filename}`, { method: 'POST' });
    return res.blob();
  });
  const onExport = async () => {
    const result = await mutate();
    const url = window.URL.createObjectURL(new Blob([result as any]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
      <button style={{ padding: 12 }} onClick={onExport}>Export CSV</button>
    </div>
  );
}

export default CsvButton;
