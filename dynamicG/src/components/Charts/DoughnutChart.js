import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function DoughnutChart( {chartData} ) {
    return (
        <>
            <h2 style = {{textAlign: "center"}}>Doughnut Chart</h2>
            <Doughnut data = {chartData} />
        </>);
}