import Hero from "../components/Hero.js";
import "../images/logo.png";
import { useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { TransferDataContext } from './context';
import { useUser, useSupabaseClient} from "@supabase/auth-helpers-react";
import {Row, Col} from 'react-bootstrap';
import { Button } from "@mui/material";

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
  const { check } = useContext(TransferDataContext);
  const { setCheck } = useContext(TransferDataContext);

  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [ar, setAr] = useState([]);
  const [stackedV, setStackedV] = useState([]);
  const [axis, setAxis] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState([]);

  const [originAr, setOriginAr] = useState([]);
  const [originStackedV, setOriginStackedV] = useState([]);
  const [originAxis, setoriginAxis] = useState([]);

  const [userFiles, setUserFiles] = useState([]);

  const user = useUser();
  const CDNURL = "https://jedendeblvtzvmbtgmsv.supabase.co/storage/v1/object/public/excel/";
  
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
          setOriginAr((prevOAr) => [...prevOAr, value]);
        });
      });

      parsedData.forEach((row) => {
        Object.values(row).forEach((value, index) => {
          if (index == 0) {
            setAxis((prevAx) => [...prevAx, value]);
          setoriginAxis((prevAx) => [...prevAx, value]);
          }
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

      parsedData.map((row, index) => (
        Object.values(row).map((value, secondIndex) => {
          setOriginStackedV((prevOStackedV) => {
            const updatedStackedV = [...prevOStackedV];
            if (updatedStackedV[secondIndex] == null) {
              updatedStackedV[secondIndex] = [value];
            } else {
              updatedStackedV[secondIndex] = updatedStackedV[secondIndex].concat([value]);
            }
            return updatedStackedV;
          })
          ;
        })
      ));

      // Extract column headers and set the state
      setColumnHeaders(Object.keys(parsedData[0]));
    };
  };

  useEffect(() => {
      setDatas(ar);
  }, [ar]);

  useEffect(() => {
      setLaa(axis);
  }, [axis]);

  useEffect(() => {
      setcategorData(stackedV);
  }, [stackedV]);

  useEffect(() => {
    if (user) {
      getPrevFile();
    }
}, [user]);

    useEffect(() => {
      if (user) {
        getPrevFile();
      }
    }, [userFiles]);

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
        .upload(user.id + "/" + fileName, fileData, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Error uploading file:", error);
        setUploadStatus('Upload failed: ' + error.message);
      } else {
        console.log("File uploaded successfully:", uploadedData.Key);
        setUploadStatus('Upload successful');
        getPrevFile();
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

    setDatas(originAr);
    setAr(originAr);
    
    setLaa(originAxis);
    setAxis(originAxis);
    
    setcategorData(originStackedV);
    setStackedV(originStackedV);
  };

  const handlePredictFutureData = () => {
    if (data.length >= 2) {
      const numWeeks = data.length;
      const numDays = columnHeaders.length - 1; // Exclude the first column (week)

      // Check if the first column contains a string or a number
      const firstColumnValue = data[numWeeks - 1][columnHeaders[0]];
      if (typeof firstColumnValue !== 'string') {
        alert('Cannot predict future data for tables without a string first column (e.g., "week" or "day").');
        return;
      }

      // Get the prefix (e.g., "week" or "day") from the uploaded data's first column
      const prefix = firstColumnValue.split(' ')[0];

      // Get the last day/week number in the uploaded data
      const lastNumber = parseInt(firstColumnValue.split(' ')[1], 10);

      // Predict future values for each day/week of the next week
      const nextNumber = lastNumber + 1;
      const predictedDataPoint = { [columnHeaders[0]]: `${prefix} ${nextNumber}` }; // Increment the number with the prefix
      setAxis((prevAx) => [...prevAx, predictedDataPoint[columnHeaders[0]]]);
      const averageChanges = {};
      for (let i = 1; i <= numDays; i++) {
        let sumChanges = 0;
        for (let j = 1; j < numWeeks; j++) {
          sumChanges += data[j][columnHeaders[i]] - data[j - 1][columnHeaders[i]];
        }
        averageChanges[columnHeaders[i]] = sumChanges / (numWeeks - 1);
      }
      for (let i = 1; i <= numDays; i++) {
        const day = columnHeaders[i];
        const lastWeekValue = data[numWeeks - 1][day];
        const predictedValue = lastWeekValue + averageChanges[day];
        predictedDataPoint[day] = predictedValue;
        
        setStackedV((prevStackedV) => {
              const updatedStackedV = [...prevStackedV];
              if (updatedStackedV[i] == null) {
                updatedStackedV[i] = [predictedValue];
              } else {
                updatedStackedV[i] = updatedStackedV[i].concat([predictedValue]);
              }
              return updatedStackedV;
            });
      }

      setData((prevData) => [...prevData, predictedDataPoint]);
    } else {
      alert('Insufficient data to make predictions.');
    }
  };

  const getPrevFile = async () => {
    const { data : filedata, error } = await supabase
        .storage
        .from('excel')
        .list(user?.id + "/", {
          sortBy: { column: 'name', order: 'asc' },
        });
        if (data != null ) {
          setUserFiles(filedata);
        } else {
          console.error("Error getting file:", error);
        }
  };

  const deleteFile = async (fileName) => {
      const {error} = await supabase
      .storage
      .from('excel')
      .remove([user.id + "/" + fileName] )

      if (error) {
        alert(error);
      } else {
        getPrevFile();
      }
  }
  
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Hero name="hero" title="Uploading of excel file" url="/" next="hide" />
        <div style={{ margin: '10px auto' }}>
          
          {user === null ?
          <></>
          :
          <>
          <h1> Existing Files</h1>
          <p>Current user: {user.email}</p>
          <>
          <Row xs = {1} md = {3} className = 'g-4'>
            {userFiles?.map((file) => {
              return (
                <Col key = {CDNURL + user.id + "/" + file.name}>
                  <Button variant="contained" onClick={() => window.open(CDNURL + user.id + '/' + file.name, '_blank')}>
                    {file.name}
                  </Button>
                  <Button color="secondary" onClick={() => deleteFile(file.name)}>
                    Delete File
                  </Button>
                </Col>
              )
            })}
          </Row>
          </>
          <p>Use the Choose File button below to upload an file to your storage</p>
          </>
        }
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
            <h2>Data Table</h2>
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
            {check ? 
            <></> :
            <>
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleUpdate}>Update</button>
            </>
            }
            <button onClick={handlePredictFutureData}>Predict Future Data</button>
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
