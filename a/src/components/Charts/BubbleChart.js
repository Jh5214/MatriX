import { Bubble } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function BubbleChart( {chartData} ) {
    return (
        <>
            <h2 style = {{textAlign: "center"}}>Bubble Chart</h2>
            <Bubble data = {chartData} />
        </>
    );
}