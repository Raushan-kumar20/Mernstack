import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../api';

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadTransactions = async () => {
            const data = await fetchTransactions(month, search, page);
            setTransactions(data);
        };
        loadTransactions();
    }, [month, search, page]);

    return (
        <div>
            <h2>Transactions</h2>
            <input
                type="text"
                placeholder="Search by title, description, or price"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.dateOfSale}</td>
                            <td>{transaction.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Previous</button>
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
    );
};

export default TransactionsTable;
