//How to Render and Display Excel Spreadsheets on a Webpage with React JS

import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import Hero from "../components/Hero.js";
import { Doughnut } from 'react-chartjs-2';
import { tempData } from "../components/tempData.js";
import { createClient } from '@supabase/supabase-js';
import PolarChart from "../components/Charts/PolarChart.js";

export default function DoughnutGraph() { 
  const [header, setHeader] = useState([]);
  const[title, setTitle] = useState("");
  const [cols, setCols] = useState([]);
  const [state, setState] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [data, setData] = useState([]); 


  const supabase = createClient("https://jedendeblvtzvmbtgmsv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDgyNjIyOSwiZXhwIjoyMDAwNDAyMjI5fQ.B22JM-wZyJlj2Brtx7keClIgkFE_Y_-4SXeQnAp6HGE"
    );

  const handleFile = async (event) => {
    const file = event.target.files[0];
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        setHeader(response.rows[0]);
        setCols(response.rows);
        setTitle(file.name);
      }
    });

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
  };

  const getG = () => {
    setState(true);
    setLineData({
      labels: (header.map((h, i) => (h))),
      datasets: [{
        label: "heading",
        data: (cols.slice(1).map((col, i) => (
            (col.map((c, i) => (c))))))
      }
    ]
    })
  }


  const [lineData, setLineData] = useState(
    {
      labels: (tempData.map((a) => {
        return ( a.year);})),
      datasets: [{
        label: "heading",
        data: (tempData.map((b) => {
          return ( b.value);}))
      }
    ]
    }
  )

  return (
    <div>
      <Hero
        name="hero"
        title="Graphs"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />

      <div style={{ margin: "10px auto"  }}>
        <input type="file" onChange={handleFile} ></input>
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
      <div>
        {uploadStatus && <p>{uploadStatus}</p>}
        <button onClick = { getG }>Get Graph</button>
        {state && <Doughnut data = {lineData} /> }
      </div>
    </div>
  );
}