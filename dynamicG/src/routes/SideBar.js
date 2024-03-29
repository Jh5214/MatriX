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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function SideBar() {
    
    const { labels } = useContext(TransferDataContext);
    const { categordata } = useContext(TransferDataContext);
    const { laa } = useContext(TransferDataContext);

    const datas = {
        labels: laa ? laa : [],
        datasets: [
        {
            label: labels[0],
            data : categordata[0],
            backgroundColor: 'rgb(255,99,152)',
        },
        {
            label: labels[1],
            data: categordata[1],
            backgroundColor: 'rgb(75,192,192)',
        },
        {
            label: labels[2],
            data: categordata[2],
            backgroundColor: 'rgb(53,162,235)',
        },
        {
            label: labels[3],
            data: categordata[3],
            backgroundColor: 'orange',
        },
        {
            label: labels[4],
            data: categordata[4],
            backgroundColor: 'blue',
        },
        {
            label: labels[5],
            data: categordata[5],
            backgroundColor: 'cyan',
        }
    ],};
    
    return (
        <>
        <Hero
            name="hero"
            title="Bar Chart"
            desc="Please input your data files (.xlsx or .xls)"
            url="/"
            next="hide"
        />
        <div style={{height:"70vh",position:"relative", marginBottom:"1%", padding:"1%"}}>
        <Bar data = {datas} />
        </div>
        </>);
}