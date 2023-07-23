import React, { useContext, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import Hero from "../components/Hero.js";
import { Scatter } from 'react-chartjs-2';
import { tempData } from "../components/tempData.js";
import { createClient } from '@supabase/supabase-js';
import { TransferDataContext } from './context';
import {Chart as ChartJS} from 'chart.js/auto';
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

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

  function downloadChartAsImage() {
    // Get the chart container element
    const chartContainer = document.querySelector(".chart-container");

    // Use html2canvas to convert the chart container to an image
    html2canvas(chartContainer).then((canvas) => {
      // Convert canvas to blob
      canvas.toBlob(function (blob) {
        // Use file-saver to save the blob as an image file
        saveAs(blob, "Scatter_Chart.png");
      });
    });
  }

  return (
    <div>
      <Hero
        name="hero"
        title="Scatter Chart"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />
      <div
        className="chart-container"
        style={{
          height: "70vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
      >

<button onClick={downloadChartAsImage}>Download Chart</button>
        <Scatter data = {blank} width="30%"
              options={{ maintainAspectRatio: false}}/> 
      </div>
    </div>
  );
}