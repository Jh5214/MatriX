import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend, }
    from 'chart.js';
import { Line } from 'react-chartjs-2';
import { tempData } from '../tempData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

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

const labels = tempData.map((val) => val.year);

const data = {
    labels,
    datasets: [
    {
        label: 'first',
        data : tempData.map((val) => val.value),
        fill : true,
        borderColor: 'rgb(255,99,152)',
        backgroundColor: 'rgba(255,99,152,0.5)',
    },
    {
        label: 'second',
        data: tempData.map((val) => val.value - 2),
        fill : true,
        borderColor: 'rgb(75,192,192)',
        backgroundColor: 'rgba(75,192,192,0.5)',
    },
    {
        label: 'third',
        data: tempData.map((val) => val.value + 5 + 5),
        fill : true,
        borderColor: 'rgb(53,162,235)',
        backgroundColor: 'rgba(53,162,235,0.5)',
    }
],};

export default function AreaChart() {
    return (
        <>
        <h2 style = {{textAlign: "center"}}>Area Chart</h2>
        <Line options = {options} data = {data} />
        </>);
}