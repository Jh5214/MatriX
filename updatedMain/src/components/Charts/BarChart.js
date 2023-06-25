import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function BarChart( {chartData} ) {
    
    return (
        <>
            <h2 style = {{textAlign: "center"}}>Bar Chart</h2>
            <Bar data = {chartData} />
        </>);
}