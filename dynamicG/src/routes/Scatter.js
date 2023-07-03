import React, { useContext, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import Hero from "../components/Hero.js";
import { Scatter } from 'react-chartjs-2';
import { tempData } from "../components/tempData.js";
import { createClient } from '@supabase/supabase-js';
import { TransferDataContext } from './context';
import {Chart as ChartJS} from 'chart.js/auto';

export default function ScatterPlot() { 

  const { labels } = useContext(TransferDataContext);
  const { datas } = useContext(TransferDataContext);
  const { title } = useContext(TransferDataContext);

  const blank = {
    labels: labels ? labels : [],
    datasets: [{
      label: title ? title : "heading",
      data: datas ? datas : []
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
        <Scatter data = {blank} width="30%"
              options={{ maintainAspectRatio: false}}/> 
      </div>
    </div>
  );
}