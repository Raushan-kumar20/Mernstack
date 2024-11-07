import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../api';

const Statistics = ({ month }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const loadStatistics = async () => {
            const data = await fetchStatistics(month);
            setStats(data);
        };
        loadStatistics();
    }, [month]);

    return (
        <div className="stats-container">
            <h2>Statistics</h2>
            {stats ? (
                <div>
                    <p>Total Sales Amount: ${stats.totalSales.totalAmount}</p>
                    <p>Total Sold Items: {stats.totalSales.totalSold}</p>
                    <p>Total Unsold Items: {stats.unsoldItems}</p>
                </div>
            ) : (
                <p>Loading statistics...</p>
            )}
        </div>
    );
};

export default Statistics;
