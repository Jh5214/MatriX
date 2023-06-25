
import React, { useContext , useState } from "react";
import Hero from "../components/Hero.js";
import { Radar } from 'react-chartjs-2';
import { TransferDataContext } from './context';
import PieChart from "../components/Charts/PieChart";

export default function RadarGraph(props) { 

  const { labels } = useContext(TransferDataContext);
  const { datas } = useContext(TransferDataContext);
  const { title } = useContext(TransferDataContext);

  const linedata = {
    labels: labels ? labels : [],
    datasets: [{
      label: title ? title : "",
      data: datas ? datas : []
    }
  ]
  }

  return (
    <div>
      <Hero
        name="hero"
        title="Radar Graph"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />
      <div>
      <Radar data = {linedata} />
      </div>
    </div>
  );
}