//How to Render and Display Excel Spreadsheets on a Webpage with React JS

import React, { useContext, useState } from "react";
import Hero from "../components/Hero.js";
import { Bar } from 'react-chartjs-2';
import { TransferDataContext } from './context';
import {Chart as ChartJS} from 'chart.js/auto';
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

export default function Selected() { 

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
        saveAs(blob, "Bar_Chart.png");
      });
    });
  }

  return (
    <div>
      <Hero
        name="hero"
        title="Bar Chart"
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
        <Bar data = {blank} width="30%"
              options={{ maintainAspectRatio: false, legend: {
                position: "right"
            }, }}/> 
      </div>
    </div>
  );
}