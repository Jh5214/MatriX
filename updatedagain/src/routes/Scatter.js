import React, { useContext, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import Hero from "../components/Hero.js";
import { Scatter } from 'react-chartjs-2';
import { tempData } from "../components/tempData.js";
import { createClient } from '@supabase/supabase-js';
import { TransferDataContext } from './context';

export default function ScatterPlot() { 

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
        <Scatter data = {lineData ? lineData : blank} width="30%"
              options={{ maintainAspectRatio: false}}/> 
      </div>
    </div>
  );
}