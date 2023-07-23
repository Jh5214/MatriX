import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TransferDataContext } from "./context";
import { useContext, useState, useEffect, useRef } from "react";
import Hero from "../components/Hero.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Area() {
  const { labels } = useContext(TransferDataContext);
  const { categordata } = useContext(TransferDataContext);
  const { laa } = useContext(TransferDataContext);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Area Chart",
      },
    },
  };

  const datasets = labels.map((label, index) => ({
    label: label,
    data: categordata[index],
    fill: true,
    backgroundColor: getRandomColor(),
  }));

  const datas = {
    labels: laa ? laa : [],
    datasets: datasets,
  };

  function downloadChartAsImage() {
    // Get the chart container element
    const chartContainer = document.querySelector(".chart-container");

    // Use html2canvas to convert the chart container to an image
    html2canvas(chartContainer).then((canvas) => {
      // Convert canvas to blob
      canvas.toBlob(function (blob) {
        // Use file-saver to save the blob as an image file
        saveAs(blob, "Area_chart.png");
      });
    });
  }

  // Helper function to get a random color for the dataset background
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <>
      <Hero
        name="hero"
        title="Areae Chart"
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
        <Line options={options} data={datas} />
      </div>
      <button onClick={downloadChartAsImage}>Download Chart</button>
    </>
  );
}
