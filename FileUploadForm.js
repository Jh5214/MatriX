import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import Hero from "../components/Hero.js";

const supabase = createClient("https://jedendeblvtzvmbtgmsv.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDgyNjIyOSwiZXhwIjoyMDAwNDAyMjI5fQ.B22JM-wZyJlj2Brtx7keClIgkFE_Y_-4SXeQnAp6HGE"
); // Replace with your Supabase credentials

function FileUploadForm() {
  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);
  const [state, setState] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        setHeader(response.rows[0]);
        setCols(response.rows);
      }
    });
  }

  const handleUpload = async () => {
    if (selectedFile) {
      // Upload the file to Supabase Storage directly into the "excel" bucket
      const { data, error } = await supabase.storage
        .from('excel') // Replace with your specific bucket name
        .upload(selectedFile.name, selectedFile, { cacheControl: '3600', upsert: false });

      if (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Upload failed: ' + error.message);
      } else {
        console.log('File uploaded successfully:', data.Key);
        setUploadStatus('Upload successful');
      }

      
    }
  };

  return (
    <div>
      <Hero
        name="hero"
        title="Uploading of excel file"
        url="/"
        next="hide"
      />
      <div style={{ margin: "10px auto"  }}>
        <h1>File Upload Form</h1>
        <input type="file" onChange={handleFileChange} ></input>
      </div>
      <br />
      <table
        style={{
          borderCollapse: "collapse",
          margin: "10px auto",
          border: "1px solid black",
          width: "100%"
        }}
      >

          <tr>
            {header.map((h, i) => (
              <th
                style={{
                  border: "1px solid black"
                }}
                key={i}
              >
                {h}
              </th>
            ))}
          </tr>
          {cols.slice(1).map((col, i) => (
            <tr key={i}>
              {col.map((c, i) => (
                <td style={{ border: "1px solid black" }} key={i}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
      </table>
      
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default FileUploadForm;
