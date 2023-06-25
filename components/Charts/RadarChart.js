import { Radar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function RadarChart( {chartData} ) {
    return (
        <>
        <h2 style = {{textAlign: "center"}}>Radar Chart</h2>
        <Radar data = {chartData} />
        </>);
}