import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchTransactions = async (month, search = '', page = 1, perPage = 10) => {
    const response = await axios.get(`${BASE_URL}/transactions`, {
        params: { month, search, page, perPage },
    });
    return response.data;
};

export const fetchStatistics = async (month) => {
    const response = await axios.get(`${BASE_URL}/statistics`, { params: { month } });
    return response.data;
};

export const fetchBarChart = async (month) => {
    const response = await axios.get(`${BASE_URL}/barchart`, { params: { month } });
    return response.data;
};

export const fetchPieChart = async (month) => {
    const response = await axios.get(`${BASE_URL}/piechart`, { params: { month } });
    return response.data;
};