import Hero from "../components/Hero.js";
import "../images/logo.png";
import { useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { TransferDataContext } from './context';

const supabase = createClient("https://jedendeblvtzvmbtgmsv.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGVuZGVibHZ0enZtYnRnbXN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDgyNjIyOSwiZXhwIjoyMDAwNDAyMjI5fQ.B22JM-wZyJlj2Brtx7keClIgkFE_Y_-4SXeQnAp6HGE"
); // Replace with your Supabase credentials

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}

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
  const [ar, setAr] = useState([]);
  const [stackedV, setStackedV] = useState([]);
  const [axis, setAxis] = useState([]);
  
  const no = [];
  const removeL = [];
  const removeBasic = [];
  const remAxis = [];

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

      setLabels(Object.keys(parsedData[0]).map((key) => key));
      parsedData.forEach((row) => {
        Object.values(row).forEach((value) => {
          setAr((prevAr) => [...prevAr, value]);
        });
      });

      parsedData.forEach((row) => {
        Object.values(row).forEach((value, index) => {
          index == 0 ? setAxis((prevAx) => [...prevAx, value]) : no.push(value);
        })});
      
       

      parsedData.map((row, index) => (
        Object.values(row).map((value, secondIndex) => {
          setStackedV((prevStackedV) => {
            const updatedStackedV = [...prevStackedV];
            if (updatedStackedV[secondIndex] == null) {
              updatedStackedV[secondIndex] = [value];
            } else {
              updatedStackedV[secondIndex] = updatedStackedV[secondIndex].concat([value]);
            }
            return updatedStackedV;
          });
        })
      ));
    };
  };

  useEffect(() => {
    if (ar.length > 0) {
      setDatas(ar);
    }
  }, [ar]);

  useEffect(() => {
    if (axis.length > 0) {
      setLaa(axis);
    }
  }, [axis]);

  useEffect(() => {
    if (stackedV.length > 0) {
      setcategorData(stackedV);
    }
  }, [stackedV]);

  const handleUpload = async () => {
    if (data.length > 0) {
      const formData = new FormData();
      const fileName = selectedFile ? selectedFile.name : "file.xlsx";
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet");
      const fileData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      formData.append("file", new Blob([fileData], { type: "application/octet-stream" }), fileName);

      const { data: uploadedData, error } = await supabase.storage
        .from("excel")
        .upload(fileName, fileData, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error uploading file:", error);
        setUploadStatus('Upload failed: ' + error.message);
      } else {
        console.log("File uploaded successfully:", uploadedData.Key);
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
    setUploadStatus(null); // Reset the upload status
  };

  const handleRemoveEmptyRows = () => {
    const updatedData = data.filter((row) => !Object.values(row).includes(''));
    setData(updatedData);
    setUploadStatus(null); // Reset the upload status

    updatedData.map((row, index) => (Object.values(row).map((value, index) => (
      index == 0 ? remAxis.push(value) : no[1] = value))));
    setLaa(remAxis);

    updatedData.map((row, index) => (Object.values(row).map((value, index) => (
      removeBasic.push(value)))));
    
    setDatas(removeBasic)

    updatedData.map((row, index) => (
      Object.values(row).map((value, secondIndex) => (
        removeL[secondIndex] == null
          ? (removeL[secondIndex] = [value])
          : (removeL[secondIndex] = removeL[secondIndex].concat([value]))
      ))
    ));

    setcategorData(removeL);
  };

  const handleUpdate = () => {
    handleUpload();
    setUploadStatus('Update successful'); // Set the upload status to "Update successful"
  };

  const handleBack = () => {
    setData(originalData);

    setDatas(ar);

    setLaa(axis);

    setcategorData(stackedV);
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
            <button onClick={handleFillZeros}>Fill Zeros</button>
            <button onClick={handleRemoveEmptyRows}>Remove Empty Rows</button>
            <br />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleUpdate}>Update</button>
            {uploadStatus && <p>{uploadStatus}</p>}
            <br />
            <button onClick={handleBack}>Back</button>
            <Link to="/graphs">
              <button>Get Graph</button>
            </Link>
            <TransferDataContext.Provider
              value={{ setLineDataa, setLabels, setDatas, setTitle }}
            ></TransferDataContext.Provider>
          </>
        )}
      </div>
    </>
  );
}

export default Features;
