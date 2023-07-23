//How to Render and Display Excel Spreadsheets on a Webpage with React JS

import React, { useContext, useState, useRef } from "react";
import Hero from "../components/Hero.js";
import { Line } from "react-chartjs-2";
import { TransferDataContext } from "./context";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

export default function LinePage(props) {
  const { labels } = useContext(TransferDataContext);
  const { datas } = useContext(TransferDataContext);
  const { title } = useContext(TransferDataContext);

  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: labels ? labels : [],
    datasets: [
      {
        label: title ? title : "heading",
        data: datas ? datas : [],
      },
    ],
  });

  const handleDownload = () => {
    html2canvas(chartRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "chart.png");
      });
    });
  };

  function downloadChartAsImage() {
    // Get the chart container element
    const chartContainer = document.querySelector(".chart-container");

    // Use html2canvas to convert the chart container to an image
    html2canvas(chartContainer).then((canvas) => {
      // Convert canvas to blob
      canvas.toBlob(function (blob) {
        // Use file-saver to save the blob as an image file
        saveAs(blob, "Line_Chart.png");
      });
    });
  }

  return (
    <div>
      <Hero
        name="hero"
        title="Line Chart"
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
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
      <button onClick={handleDownload}>Download Chart</button>
    </div>
  );
}
