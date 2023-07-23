import {Bar, Pie, Doughnut} from "react-chartjs-2";
import Papa from 'papaparse';
import { useState } from "react";

 
export default function GraphCreation() {

    const [data, setData] = useState([]);
    const[columnArray, setColumn] = useState([]);
    const[values, setValues] = useState([]);

    const handleFile = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines:true,
            complete: function(result) {
                const columnArray = [];
                const valueArray= [];

                result.data.map((d)=> {
                    columnArray.push(Object.keys(d));
                    valueArray.push(Object.values(d));
                });
                setData(result.data);
                setColumn(columnArray[0]);
                setValues(valueArray[0]);
            }
        })
      };

    return (
        <>
        <div>
            <input 
                type = 'file' 
                name = 'file' 
                accept = '.csv' 
                onChange = {handleFile} 
                stye = {{display:'block', margin:"10px auto"}}
            ></input>
            <table style = {{borderCollapse: 'collapse', border:'1px solid black', margin: '5px auto'}}>
                <thead>
                <tr>
                    {columnArray.map((col, i) => {
                        <th style = {{border: '1px solid black'}} key = {i}>{col}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {values.map((v,i) => {
                        return (
                        <tr key ={i}>
                            {v.map((value,i) => {
                                <td key = {i}>{value}</td>
                            })}
                        </tr>
                        );})}
                </tbody>
            </table>

        </div>
        <h1 style = {{textAlign: "center"}}>Graph Creation</h1>
        <Bar
            data = {{
                label : ['jan','feb', 'mar', 'apr','may'],
                datasets: [
                    {   
                        label: 'store 1',
                        data: [10,20,30,40,50],
                        backgroundColor: 'red',
                        barThickness: 12
                    },
                    {   
                        label: 'store 2',
                        data: [1,2,3,4,5],
                        backgroundColor: 'pink',
                        barThickness: 12
                    },
                    {   
                        label: 'store 3',
                        data: [11,12,13,14,15],
                        backgroundColor: 'blue',
                        barThickness: 12
                    },
                    {   
                        label: 'store 4',
                        data: [21,220,230,240,250],
                        backgroundColor: 'green',
                        barThickness: 12
                    }
                ]
            }}
            options = {{
                tooltips: {
                    mode: 'index',
                    callbacks: {
                        label: function(toolTipItem){
                            return (toolTipItem.value);
                        }
                    }
                },
                scales: {
                    xAxes: [
                        {   
                            gridLines : {
                                color: 'cyan'
                            },
                            scaleLabel:{
                                labelString: "Mouths",
                                display:true,
                                fontSize:20,
                                fontColor: 'blue',
                            },
                            ticks: {
                                beginAtZero:true,
                                fontColor:'green'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines : {
                                color: 'cyan'
                            },
                            scaleLabel:{
                                labelString: "Mouths",
                                display:true,
                                fontColor: 'blue',
                                fontSize:20
                            },
                            ticks: {
                                beginAtZero : true,
                                fontColor : 'green'
                            }
                        }
                    ]
                }
            }}
        ></Bar>
        <Pie>
        data = {{
                label : ['jan','feb', 'mar', 'apr','may'],
                datasets: [
                    {   
                        label: 'store 1',
                        data: [10,20,30,40,50],
                        backgroundColor: ['red','blue','yellow','purple','pink']
                    }],
                }}
        </Pie>
        <Doughnut>
        data = {{
                label : ['jan','feb', 'mar', 'apr','may'],
                datasets: [
                    {   
                        label: 'store 1',
                        data: [10,20,30,40,50],
                        backgroundColor: ['red','blue','yellow','purple','pink']
                    }],
                }}
        </Doughnut>
        </>
    );
}