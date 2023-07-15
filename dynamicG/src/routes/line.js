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

  return (
    <div>
      <Hero
        name="hero"
        title="Graphs"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />
      <div
        style={{
          height: "70vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
        ref={chartRef}
      >
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
      <button onClick={handleDownload}>Download Chart</button>
    </div>
  );
}
