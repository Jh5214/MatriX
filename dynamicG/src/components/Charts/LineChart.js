import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function LineChart( {chartData} ) {
    return (
        <>
            <h2 style = {{textAlign: "center"}}>Line Chart</h2>
            <Line data = {chartData} />
        </>);
}