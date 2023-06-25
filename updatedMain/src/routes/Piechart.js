
import React, { useContext , useState } from "react";
import Hero from "../components/Hero.js";
import { Pie } from 'react-chartjs-2';
import { TransferDataContext } from './context';

export default function PieChar(props) { 

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
        title="Pie Chart"
        desc="Please input your data files (.xlsx or .xls)"
        url="/"
        next="hide"
      />
      <div>
      <Pie data = {linedata} />
      </div>
    </div>
  );
}