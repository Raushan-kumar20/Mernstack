import React, { useEffect, useState } from 'react';
import { fetchBarChart } from '../api';

const BarChart = ({ month }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const loadBarChart = async () => {
            const data = await fetchBarChart(month);
            setChartData(data);
        };
        loadBarChart();
    }, [month]);

    return (
        <div className="chart-container">
            <h2>Price Range Distribution</h2>
            {chartData.map((range) => (
                <p key={range.range}>{range.range}: {range.count}</p>
            ))}
        </div>
    );
};

export default BarChart;
