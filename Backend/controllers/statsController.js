const Transaction = require('../models/Transaction');

// Get total sales amount, sold items, and unsold items for a selected month
exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    
    // Calculate total sales and total sold items
    const totalSales = await Transaction.aggregate([
        { $match: { dateOfSale: { $regex: month, $options: 'i' }, sold: true }},
        { $group: { _id: null, totalAmount: { $sum: "$price" }, totalSold: { $sum: 1 } }}
    ]);

    // Count the number of unsold items
    const unsoldItems = await Transaction.countDocuments({ dateOfSale: { $regex: month, $options: 'i' }, sold: false });

    res.json({ totalSales, unsoldItems });
};

// Get data for bar chart based on price ranges for the selected month
exports.getBarChart = async (req, res) => {
    const { month } = req.query;
    const priceRanges = [
        { range: '0-100', min: 0, max: 100 },
        { range: '101-200', min: 101, max: 200 },
        { range: '201-300', min: 201, max: 300 },
        { range: '301-400', min: 301, max: 400 },
        { range: '401-500', min: 401, max: 500 },
        { range: '501-600', min: 501, max: 600 },
        { range: '601-700', min: 601, max: 700 },
        { range: '701-800', min: 701, max: 800 },
        { range: '801-900', min: 801, max: 900 },
        { range: '901-above', min: 901, max: Infinity }
    ];

    const chartData = await Promise.all(priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
            dateOfSale: { $regex: month, $options: 'i' },
            price: { $gte: range.min, $lt: range.max },
        });
        return { range: range.range, count };
    }));
    res.json(chartData);
};

// Get data for pie chart based on category distribution for the selected month
exports.getPieChart = async (req, res) => {
    const { month } = req.query;

    const categories = await Transaction.aggregate([
        { $match: { dateOfSale: { $regex: month, $options: 'i' } }},
        { $group: { _id: "$category", count: { $sum: 1 } }}
    ]);
    res.json(categories);
};
