//How to Render and Display Excel Spreadsheets on a Webpage with React JS

import React, { useContext , useState } from "react";
import Hero from "../components/Hero.js";
import { Line } from 'react-chartjs-2';
import { TransferDataContext } from './context';


export default function LinePage(props) { 

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
      <div>
      <Line data = {lineData ? lineData : blank} />
      </div>
    </div>
  );
}