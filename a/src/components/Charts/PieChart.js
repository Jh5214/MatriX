import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function PieChart( {chartData} ) {
    return (
        <>
            <h2 style = {{textAlign: "center"}}>Pie Chart</h2>
            <Pie data = {chartData} />
        </>);
}