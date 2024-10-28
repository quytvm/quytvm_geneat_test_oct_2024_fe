import axios from "./axios";

const fetchAllOrders = async () => {
    return axios.get('/api/order');
}

export {
    fetchAllOrders,
}