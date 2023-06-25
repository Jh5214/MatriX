import "./graphTypes.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { tempData } from "../components/tempData";
import { useLocation } from "react-router-dom";

import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
import PolarChart from "../components/Charts/PolarChart";
import ScatterChart from "../components/Charts/ScatterChart";
import DoughnutChart from '../components/Charts/DoughnutChart';
import RadarChart from "../components/Charts/RadarChart.js";
import StackedBarChart from "../components/Charts/StackedBarChart";
import StackedLineChart from "../components/Charts/stackedLine.js";
import AreaChart from "../components/Charts/AreaChart.js";

export default function GraphTypes( props ) {
    
const [userData, setUserData] = useState(
    {
      labels: (tempData.map((a) => {
        return ( a.year);})),
      datasets: [{
        label: "heading",
        data: (tempData.map((b) => {
          return ( b.value);})),
        backgroundColor: [
          "yellow"
        ]
      },
      {
        label: "heading2",
        data: (tempData.map((b) => {
          return ( b.value + 3);})),
        backgroundColor: [
          "pink"
        ]
      }
    ]
    }
  )

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

  const value = [];
  for (let i = 1; i < 100; i++) {
    value[i - 1] = Math.floor(Math.random() * 50) + 1;
  }

  const [ScatterData, setScatterData] = useState(
    {
      labels: (value.map((a) => {
        return ( value.indexOf(a));})),
      datasets: [{
        label: "heading",
        data: (value.map((b) => {
          return ( b);}))
      }
    ]
    }
  )

    return (
        <div className = "Graphs">
        <h1 style = {{textAlign: "center"}}>Graph Creation</h1>
        <div className = "row">
          <div className = 'col'>
        <div >
            <Link to= "/graphs/barchart" style = {{textDecoration: "none"}} >
              <BarChart chartData = {userData}/>
            </Link>
        </div>
        <div >
              <Link to= {{ pathname:  "/graphs/linechart"}}
                style = {{textDecoration: "none"}}>
                <LineChart chartData = {lineData} />
              </Link>
        </div>        
        <div >
          
              <Link to= "/graphs/piechart" style = {{textDecoration: "none"}}>
                <PieChart chartData = {lineData} />
              </Link>
        </div>
        </div>
        <div className = "col">
        <div >
              <Link to= "/graphs/polararea" style = {{textDecoration: "none"}}>
                <PolarChart chartData = {lineData} />
              </Link>
        </div>
        <div >
          
              <Link to= "/graphs/scatterchart" style = {{textDecoration: "none"}}>
                <ScatterChart chartData = {ScatterData} />
              </Link>

        </div>
        <div >
          
              <Link to= "/graphs/doughnutchart" style = {{textDecoration: "none"}}>
                <DoughnutChart chartData = {lineData} />
              </Link>

        </div>
        </div>
        <div className = 'col'>
        <div >
            
                <Link to= "/graphs/radarchart" style = {{textDecoration: "none"}}>
                  <RadarChart chartData = {lineData} />
                </Link>

        </div>
        <div >
            
                <Link to= "/graphs/stackedbarchart" style = {{textDecoration: "none"}}>
                <StackedBarChart chartData = {lineData} />
              </Link>

        </div>
        </div>
        <div className = 'col'>
        <div>
          
              <Link to= "/graphs/stackedlinechart" style = {{textDecoration: "none"}}>
                <StackedLineChart chartData = {lineData} />
              </Link>

        </div>
        <div >
          
              <Link to= "/graphs/areachart" style = {{textDecoration: "none"}}>
                <AreaChart/>
                </Link>

        </div>
        </div>
        </div>

      </div>
    );}