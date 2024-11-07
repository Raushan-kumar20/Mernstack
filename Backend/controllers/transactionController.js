const Transaction = require('../models/Transaction');
const axios = require('axios');

exports.initializeDatabase = async (req, res) => {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
    const { data } = await axios.get(url);
    await Transaction.insertMany(data);
    res.send("Database initialized");
};

exports.listTransactions = async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
    const query = {
        dateOfSale: { $regex: month, $options: 'i' },
        $or: [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
        ],
    };
    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));
    res.json(transactions);
};
