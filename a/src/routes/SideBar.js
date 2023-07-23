import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, }
    from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TransferDataContext } from './context';
import { useContext } from 'react';
import Hero from "../components/Hero.js";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function downloadChartAsImage() {
    // Get the chart container element
    const chartContainer = document.querySelector(".chart-container");

    // Use html2canvas to convert the chart container to an image
    html2canvas(chartContainer).then((canvas) => {
      // Convert canvas to blob
      canvas.toBlob(function (blob) {
        // Use file-saver to save the blob as an image file
        saveAs(blob, "Side_Bar_Chart.png");
      });
    });
  }


export default function SideBar() {
    
    const { labels } = useContext(TransferDataContext);
    const { categordata } = useContext(TransferDataContext);
    const { laa } = useContext(TransferDataContext);

    const datasets = labels.map((label, index) => ({
        label: label,
        data: categordata[index],
        backgroundColor: getRandomColor(),
      }));
    
const datas = {
        labels: laa ? laa : [],
        datasets: datasets,
      };
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
            title="Side Bar Chart"
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
        <Bar data = {datas} />
        </div>
        </>);
}