import React, { useContext , useState } from "react";
import Hero from "../components/Hero.js";
import { Line } from 'react-chartjs-2';
import { TransferDataContext } from './context';
import AreaChart from "../components/Charts/AreaChart.js";


export default function Area(props) { 

  const { lineData } = useContext(TransferDataContext);

  const blank = {
    labels: [],
    datasets: [{
      label: "heading",
      data: []
    }
  ]
  }

  return (
    <div>
      <Hero
        name="hero"
        title="Graphs"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />
      <div style =  {{height:"70vh",position:"relative", marginBottom:"1%", padding:"1%"}} >
      <AreaChart width="30%"
              options={{ maintainAspectRatio: false}} />
      </div>
    </div>
  );
}