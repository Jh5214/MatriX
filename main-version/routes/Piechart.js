import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import Hero from "../components/Hero.js";
import { Pie } from 'react-chartjs-2';
import { tempData } from "../components/tempData.js";
import { createClient } from '@supabase/supabase-js';
import PieChart from "../components/Charts/PieChart.js";

export default function Piechart() { 
  const [header, setHeader] = useState([]);
  const [title, setTitle] = useState("");
  const [cols, setCols] = useState([]);
  const [state, setState] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [data, setData] = useState([]); 

  const supabase = createClient(
    "https://jedendeblvtzvmbtgmsv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDgyNjIyOSwiZXhwIjoyMDAwNDAyMjI5fQ.B22JM-wZyJlj2Brtx7keClIgkFE_Y_-4SXeQnAp6HGE"
    
  );

  const handleFile = async (event) => {
    const file = event.target.files[0];
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        if (response && response.rows && response.rows.length > 0) {
          setHeader(response.rows[0]);
          setCols(response.rows);
          setTitle(file.name);
        } else {
          console.log("Invalid file format");
        }
      }
    });

    try {
      const { data, error } = await supabase.storage
        .from('excel') // Replace with your specific bucket name
        .upload(file.name, file, { cacheControl: '3600', upsert: false });

      if (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Upload failed: ' + error.message);
      } else {
        console.log('File uploaded successfully:', data.Key);
        setUploadStatus('Upload successful');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed: ' + error.message);
    }
  };

  const getGraph = () => {
    setState(true);
    setLineData({
      labels: header,
      datasets: [{
        label: title,
        data: cols.slice(1).map(col => col.map(c => c))
      }]
    });
  };

  const [lineData, setLineData] = useState({
    labels: tempData.map(a => a.year),
    datasets: [{
      label: "heading",
      data: tempData.map(b => b.value)
    }]
  });

  return (
    <div>
      <Hero
        name="hero"
        title="Graphs"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />

      <div style={{ margin: "10px auto" }}>
        <input type="file" onChange={handleFile} />
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
        <thead>
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
        </thead>
        <tbody>
          {cols.slice(1).map((col, i) => (
            <tr key={i}>
              {col.map((c, j) => (
                <td style={{ border: "1px solid black" }} key={j}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uploadStatus && <p>{uploadStatus}</p>}
        <button onClick={getGraph}>Get Graph</button>
        {state && <Pie data={lineData} />}
      </div>
    </div>
  );
}
