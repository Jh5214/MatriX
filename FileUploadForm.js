import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import Hero from "../components/Hero.js";

const supabase = createClient("https://jedendeblvtzvmbtgmsv.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDgyNjIyOSwiZXhwIjoyMDAwNDAyMjI5fQ.B22JM-wZyJlj2Brtx7keClIgkFE_Y_-4SXeQnAp6HGE"
); // Replace with your Supabase credentials

function FileUploadForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async (event) => {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsBinaryString(event.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
      };
    }

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

  const handleNext = () => {
    navigate('/excel-viewer');
  };

  return (
    <div>
      <Hero
        name="hero"
        title="Uploading of excel file"
        url="/"
        next="hide"
      />
      <h1>File Upload Form</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
      <button onClick={handleNext}>Next</button>
      <input type="file" accept=".xlsx, .xls" onChange={(event) => handleUpload(event)} style={{ display: "block", marginleft: "auto", marginright: "auto" }} />
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
    /*<div>
      <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
      <h1>File Upload Form</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
      <button onClick={handleNext}>Next</button>
    </div>*/
  );
}

export default FileUploadForm;


/*import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://jedendeblvtzvmbtgmsv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDgyNjIyOSwiZXhwIjoyMDAwNDAyMjI5fQ.B22JM-wZyJlj2Brtx7keClIgkFE_Y_-4SXeQnAp6HGE"
  );

function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // Upload the file to Supabase Storage directly into the "excel" bucket
      const { data, error } = await supabase.storage
        .from('excel') // Replace with your specific bucket name
        .upload(selectedFile.name, selectedFile, {cacheControl: '3600', upsert: false});

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
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default FileUploadForm;*/