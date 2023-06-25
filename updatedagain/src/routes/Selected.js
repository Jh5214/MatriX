//How to Render and Display Excel Spreadsheets on a Webpage with React JS

import React, { useContext, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import Hero from "../components/Hero.js";
import { Bar } from 'react-chartjs-2';
import { tempData } from "../components/tempData.js";
import { createClient } from '@supabase/supabase-js';
import { TransferDataContext } from './context';

export default function Selected() { 

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

      <div style={{height:"70vh",position:"relative", marginBottom:"1%", padding:"1%"}}>
        <Bar data = {lineData ? lineData : blank} 
              options={{ maintainAspectRatio: false }}/> 
      </div>
    </div>
  );
}