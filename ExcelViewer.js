import { useState } from "react";
import * as XLSX from "xlsx";

function ExcelViewer() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  return (
    <div className="App">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{ display: "block", marginleft: "auto", marginright: "auto" }}
      />
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
  );
}

export default ExcelViewer;

/*import {ExcelRenderer, OutTable} from 'react-excel-renderer';

fileHandler = (event) => {
  let fileObj = event.target.files[0];

  //just pass the fileObj as parameter
  ExcelRenderer(fileObj, (err, resp) => {
    if(err){
      console.log(err);            
    }
    else{
      this.setState({
        cols: resp.cols,
        rows: resp.rows
      });
    }
  });               
  }

  <OutTable data={this.state.rows} columns={this.state.cols} 
  tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />*/

/*import React, { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';

const ExcelViewer = ({ supabase }) => {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    async function fetchExcelData() {
      const { data: files, error } = await supabase.storage
        .from('excel')
        .list();

      if (error) {
        console.error('Error fetching files:', error);
      } else if (files && files.length > 0) {
        const latestFile = files.reduce((prev, curr) =>
          prev.updated_at > curr.updated_at ? prev : curr
        );
        const { data, error: downloadError } = await supabase.storage
          .from('excel')
          .download(latestFile.name);

        if (downloadError) {
          console.error('Error fetching Excel file:', downloadError);
        } else {
          const workbook = read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
          setExcelData(jsonData);
        }
      }
    }

    fetchExcelData();
  }, [supabase]);

  return (
    <div>
      <h1>Excel Viewer</h1>
      {excelData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {excelData[0].map((cell, index) => (
                <th key={index}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Excel file found.</p>
      )}
    </div>
  );
};

export default ExcelViewer;*/



/*import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { read, utils } from 'xlsx';
import Hero from "../components/Hero.js";

const ExcelViewer = () => {
  const supabase = createClient('https://jedendeblvtzvmbtgmsv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4MjYyMjksImV4cCI6MjAwMDQwMjIyOX0.lejG0c-0yaUsfd0optvquxA9shNvvFjYHOwzXPX5BS4');
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    async function fetchExcelData() {
      const { data, error } = await supabase.storage
        .from('excel')
        .download('file_name.xlsx');

      if (error) {
        console.error('Error fetching Excel file:', error);
      } else {
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData);
      }
    }

    fetchExcelData();
  }, []);

  return (
    <div>
      <Hero
        name="hero"
        title="Viewing of excel file"
        url="/"
        next="hide"
      />
      <h1>Excel Viewer</h1>
      <table>
        <thead>
          <tr>
            {excelData.length > 0 && excelData[0].map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {excelData.slice(1).map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelViewer;*/