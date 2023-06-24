import * as XLSX from "xlsx";
import { useState } from "react";

export default function ExcelData() {

    const [fileN, setfileN] = useState(null);
    const [columns, setCol]= useState([]);

    const handleFile = async (e) => {

        const file = e.target.files[0];

        setfileN(file.name);

        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data);

        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const readF = XLSX.utils.sheet_to_json(workSheet, {
            header: 1,
        });
        
        setCol(readF[0]);
        console.log(e.target.files[0]);
    };


    return (
        <>
        <h1> Please input your file </h1>
        {fileN && (
            <>
            <p>
                FileName : <span>{fileN}</span>
            </p>
            <p>
                Columns: <select>
                    {columns.map((c) => {
                        <option value = {c}></option>
                    })}
                </select>
            </p>
            </>
        )}
        <input type = 'file' onChange={(e) => handleFile(e)}/>
        </>
    );}