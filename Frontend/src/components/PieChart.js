import React, { useEffect, useState } from 'react';
import { fetchPieChart } from '../api';

const PieChart = ({ month }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const loadPieChart = async () => {
            const data = await fetchPieChart(month);
            setChartData(data);
        };
        loadPieChart();
    }, [month]);

    return (
        <div className="chart-container">
            <h2>Category Distribution</h2>
            {chartData.map((category) => (
                <p key={category._id}>{category._id}: {category.count}</p>
            ))}
        </div>
    );
};

export default PieChart;
