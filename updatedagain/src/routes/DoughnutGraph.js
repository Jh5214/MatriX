//How to Render and Display Excel Spreadsheets on a Webpage with React JS

import React, { useContext , useState } from "react";
import Hero from "../components/Hero.js";
import { Doughnut } from 'react-chartjs-2';
import { TransferDataContext } from './context';
import {Chart as ChartJS} from 'chart.js/auto';


export default function DoughnutGraph(props) { 

  const { labels } = useContext(TransferDataContext);
  const { datas } = useContext(TransferDataContext);
  const { title } = useContext(TransferDataContext);

  const linedata = {
    labels: labels ? labels : [],
    datasets: [{
      label: title ? title : "",
      data: datas ? datas : []
    }
  ]
  }

  return (
    <div>
      <Hero
        name="hero"
        title="Doughnut Chart"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />
      <div style =  {{height:"70vh",position:"relative", marginBottom:"1%", padding:"1%"}}>
      <Doughnut data = {linedata} width="30%"
              options={{ maintainAspectRatio: false}} />
      </div>
    </div>
  );
}