import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { useDropzone } from 'react-dropzone';
import TableData, { RowData, ColumnData } from './ReactDataTable';
import './App.css';

function App() {
  const [filename, setFilename] = useState<string | undefined>();
  const queryCache = useQueryCache()
  const [mutate, { isLoading: loadingMutate }] = useMutation<{ data: { filename: string; result: string }, success: boolean }>(async (data) => {
    const res = await fetch('/upload', { method: 'POST', body: data });
    return res.json();
  }, {
    onSuccess: async (data) => {
      queryCache.invalidateQueries(['output', { filename: data.data.filename }]);
    }
  });
  const { data, isLoading } = useQuery<{
    success: boolean;
    data: {
      column: ColumnData[],
      data: RowData[]
    } | any;
  }>(['output', { filename }], async (_, params) => {
    const filename = params.filename || localStorage.getItem('files');
    const res = await fetch(`/output?filename=${filename}`);
    return res.json();
  });
  const onDrop = useCallback(async (acceptedFiles) => {
    const form = new FormData();

    // Do something with the files
    acceptedFiles.forEach((file: File) => {
      form.append(`files`, file);
    });

    const res = await mutate(form as any);
    const filename = res?.data?.filename || '';
    setFilename(filename);
    localStorage.setItem('files', filename);
  }, [mutate]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const isEmptyTable = !isLoading && data?.data?.data?.length === 0;

  return (
    <>
      <div className="Border Center" {...getRootProps()}>
        <input {...getInputProps()} accept=".pdf" />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      {loadingMutate && <div className="Center"><p>Uploading...</p></div>}
      {isEmptyTable ? null : (
        <div className="Center">
          {isLoading ? <p>Loading...</p> : <TableData columns={data?.data?.column || []} data={data?.data?.data || []} />}
        </div>
      )}
    </>
  );
}

export default App;
