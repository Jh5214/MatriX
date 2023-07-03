import { Bar } from 'react-chartjs-2';
import {BarElement, Chart as ChartJS} from 'chart.js/auto';

ChartJS.register(
    BarElement
)

export default function BarChart( {chartData} ) {
    
    return (
        <>
            <h2 style = {{textAlign: "center"}}>Bar Chart</h2>
            <Bar data = {chartData} />
        </>);
}