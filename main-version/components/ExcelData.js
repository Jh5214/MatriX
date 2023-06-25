import BarChart from "../components/Charts/BarChart";
import * as XLSX from "xlsx";
import { useState } from "react";

export default function ExcelData() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState(null);

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        
        reader.onload = (a) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: "binary"});
            const sheetName = workbook.SheetNames[0];
            setTitle(sheetName);
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
            console.log(workbook);
        };
    }

    const [graphData, setGraphData] = useState(
        title && { 
          labels: (Object.keys(data[0]).map((a) => {
            return (a);})),
          datasets: [{
            label: {title},
            data: (Object.values(data[0]).map((value, index) => {
              return (value);}))
          }
        ]
        }
      )

    return (
        <>
            <input 
                type = "file"
                accept = ".xlsx, .xls"
                onChange = {(e) => handleFileUpload(e)}/>
            {
                title && (
                    <BarChart chartData = {graphData}/>
                )
            }
        </>

    );}