import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, }
    from 'chart.js';
import { Line } from 'react-chartjs-2';
import { tempData } from '../tempData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    plugins : {
        title : {
            display:true,
            text: 'Stacked Line Chart',},
        },
        responsive: true,
        scales: {
            x:{
                stacked: true,
            },
            y: {
                stacked : true,
            },
            },
        };

const labels = tempData.map((val) => val.year);

const data = {
    labels,
    datasets: [
    {
        label: 'first',
        data : tempData.map((val) => val.value),
        backgroundColor: 'rgb(255,99,152)',
    },
    {
        label: 'second',
        data: tempData.map((val) => val.value - 2),
        backgroundColor: 'rgb(75,192,192)',
    },
    {
        label: 'third',
        data: tempData.map((val) => val.value + 5 + 5),
        backgroundColor: 'rgb(53,162,235)',
    }
],};

export default function StackedLineChart( {chartData} ) {
    return (
        <>
            <h2 style = {{textAlign: "center"}}>Stacked Line Chart</h2>
            <Line options = {options} data = {data} />
        </>);
}