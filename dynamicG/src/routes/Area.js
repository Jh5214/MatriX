import React, { useContext , useState } from "react";
import Hero from "../components/Hero.js";
import { TransferDataContext } from './context';
import {Chart as ChartJS} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function Area(props) { 

  const { labels } = useContext(TransferDataContext);
  const { categordata } = useContext(TransferDataContext);
  const { laa } = useContext(TransferDataContext);

  const options = {
    responsive : true,
    plugins : {
        legend : {
            position: 'top',
        },
        title : {
            display: true,
            text: 'area chart',
        },
    },
};


  const datas = {
    labels: laa ? laa : [],
    datasets: [
    {
        label: labels[0],
        data : categordata[0],
        fill : true,
        backgroundColor: 'rgb(255,99,152)',
    },
    {
        label: labels[1],
        data: categordata[1],
        fill : true,
        backgroundColor: 'rgb(75,192,192)',
    },
    {
        label: labels[2],
        data: categordata[2],
        fill : true,
        backgroundColor: 'rgb(53,162,235)',
    },
    {
        label: labels[3],
        data: categordata[3],
        fill : true,
        backgroundColor: 'orange',
    },
    {
        label: labels[4],
        data: categordata[4],
        fill : true,
        backgroundColor: 'blue',
    },
    {
        label: labels[5],
        data: categordata[5],
        fill : true,
        backgroundColor: 'cyan',
    }
],};

  return (
    <>
      <Hero
        name="hero"
        title="Area Chart"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />
      <div style = {{height:"70vh",position:"relative", marginBottom:"1%", padding:"1%"}} >
      <Line options={options} data = {datas}/>
      </div>
    </>
  );
}