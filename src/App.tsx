import React, { useCallback } from 'react';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { useDropzone } from 'react-dropzone';
import TableData, { RowData, ColumnData } from './ReactDataTable';
import './App.css';

function App() {
  const queryCache = useQueryCache()
  const [mutate] = useMutation(async (data) => {
    const res = await fetch('/upload', { method: 'POST', body: data });
    return res.json();
  }, {
    onSuccess: () => {
      queryCache.invalidateQueries('output');
    }
  });
  const { data, isLoading } = useQuery<{
    success: boolean;
    data: {
      column: ColumnData[],
      data: RowData[]
    } | any;
  }>('output', async () => {
    const res = await fetch('/output');
    return res.json();
  });
  const onDrop = useCallback(acceptedFiles => {
    const form = new FormData();

    // Do something with the files
    acceptedFiles.forEach((file: File) => {
      form.append(`files`, file);
    });

    mutate(form as any);
  }, []);
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
      {isEmptyTable ? null : (
        <div className="Center">
          {isLoading ? <p>Loading...</p> : <TableData columns={data?.data?.column || []} data={data?.data?.data || []} />}
        </div>
      )}
    </>
  );
}

export default App;
