import axios from 'axios';

import { baseURL } from '../config';

export const getAllExpenses = async () => {
    const { data } = await axios.get(baseURL + '/expense/getAllExpenses/');
    return data;
}

export const getExpensesByCategory = async (category) => {
    const { data } = await axios.get(baseURL + '/expense/getExpensesByCategory/'+ category);
    return data;
}