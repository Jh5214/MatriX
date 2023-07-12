
import Hero from "../components/Hero.js";
import "../images/logo.png";
//import GraphSlider from "../components/GraphsSlider";
import { tempData } from "../components/tempData.js";
import { useContext , useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { TransferDataContext } from './context';


const supabase = createClient("https://jedendeblvtzvmbtgmsv.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDgyNjIyOSwiZXhwIjoyMDAwNDAyMjI5fQ.B22JM-wZyJlj2Brtx7keClIgkFE_Y_-4SXeQnAp6HGE"
); // Replace with your Supabase credentials

function Features() {

  const { setLineDataa } = useContext(TransferDataContext);
  const { setLabels } = useContext(TransferDataContext);
  const { setDatas } = useContext(TransferDataContext);
  const { setTitle } = useContext(TransferDataContext);
  const { setcategorData } = useContext(TransferDataContext);
  const { setLaa } = useContext(TransferDataContext);


  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [check, setCheck] = useState(false);
  const ar = [];
  const stackedV =[];
  const axis = [];
  const no = [];
 
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      setTitle(sheetName);
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        header: 0,
        defval: '',
      });
      setData(parsedData);
      setOriginalData(parsedData);

      setLabels(Object.keys(parsedData[0]).map((key) => (key)));
      parsedData.map((row, index) => (Object.values(row).map((value, index) => (
                ar.push(value)))));
      
      setDatas(ar);
        
      parsedData.map((row, index) => (Object.values(row).map((value, index) => (
        index == 0 ? axis.push(value) : no.push(value)))));
      setLaa(axis);

      parsedData.map((row, index) => ( 
        Object.values(row).map((value, secondIndex) => (
          stackedV[secondIndex] == null ? stackedV[secondIndex] = [value] :
          stackedV[secondIndex] = stackedV[secondIndex] + value
        ))));
      setcategorData(stackedV);
    };
    
  };

  const handleUpload = async () => {
    if (data.length > 0) {
      const { data, error } = await supabase.storage
        .from('excel')
        .upload(selectedFile.name, selectedFile, { cacheControl: '3600', upsert: false });

      if (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Upload failed: ' + error.message);
      } else {
        console.log('File uploaded successfully:', data.Key);
        setUploadStatus('Upload successful');
      }
    } else {
      console.log('No data available to upload.');
    }
  };

  const handleFillZeros = () => {
    const updatedData = data.map((row) => {
      const updatedRow = { ...row };
      Object.keys(updatedRow).forEach((key) => {
        if (!updatedRow[key]) {
          updatedRow[key] = 0;
        }
      });
      return updatedRow;
    });
    setData(updatedData);


  };

  const handleRemoveEmptyRows = () => {
    const updatedData = data.filter((row) => !Object.values(row).includes(""));
    setData(updatedData);
  };

  const handleBack = () => {
    setData(originalData);
  };

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, check) => {
      setCheck(!check);
    });
    return () => check;
  }, []);

  return (
    <>
    
      <div style={{ textAlign: 'center' }}>
      <Hero name="hero" title="Uploading of excel file" url="/" next="hide" />
      <div style={{ margin: '10px auto' }}>
        <h1>File Upload Form</h1>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        />
      </div>
      <br />
      {data.length > 0 && (
        <>
          <table
            className="table"
            style={{
              borderCollapse: 'collapse',
              border: '1px solid black',
              margin: '0 auto',
            }}
          >
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} style={{ border: '1px solid black', padding: '8px' }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index} style={{ border: '1px solid black', padding: '8px' }}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          {check ?
          <button style = {{display : "none"}} onClick={handleUpload}>Upload</button> :
          <button onClick={handleUpload}>Upload</button> }
          <button onClick={handleFillZeros}>Fill Zeros</button>
          <button onClick={handleRemoveEmptyRows}>Remove Empty Rows</button>
          {uploadStatus && <p>{uploadStatus}</p>}
          <br />
          <button onClick={handleBack}>Back</button>
          <Link to=  "/graphs"><button>Get Graph</button></Link>
          <TransferDataContext.Provider value={{ setLineDataa, setLabels, setDatas, setTitle }}></TransferDataContext.Provider>
        </>
      )}
    </div>
    </>
  );
}

export default Features;
