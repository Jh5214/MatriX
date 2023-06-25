import { PolarArea } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function PolarChart( {chartData} ) {
    return (
        <>
            <h2 style = {{textAlign: "center"}}>PolarArea</h2>
            <PolarArea data = {chartData} />
        </>);
}