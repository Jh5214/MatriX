import { Scatter } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function ScatterChart( {chartData} ) {
    return (
        <>
        <h2 style = {{textAlign: "center"}}>Scatterplot</h2>
        <Scatter data = {chartData} />
        </>);
}