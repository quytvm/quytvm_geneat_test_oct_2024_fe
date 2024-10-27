import axios from "./axios";

const fetchAllProducts = (page,pageSize=2,search) => {
    let url = `/api/product?SortOrder=date_desc&PageNumber=${page}&PageSize=${pageSize}`;

    if (search) {
        url += `&SearchString=${encodeURIComponent(search)}`;
    }
    return axios.get(url);
}

const fetchSearchProducts = async (page, pageSize, search, signal) => {
    let url = `/api/product?SortOrder=date_desc&PageNumber=${page}&PageSize=${pageSize}`;
    if (search) {
        url += `&SearchString=${encodeURIComponent(search)}`;
    }
    return axios.get(url, { signal });
};


const postCreateProduct = (product) => {
    return axios.post(`/api/product`, product);
}

const putEditProduct = (product) => {
    return axios.put(`/api/product`, product);
}

const deleteProduct = (productId) => {
    return axios.delete(`/api/product?id=${productId}`);
}

const activeProduct = (productId) => {
    return axios.patch(`/api/product/${productId}/activate`);
}
export {
    fetchAllProducts,
    postCreateProduct,
    putEditProduct,
    deleteProduct,
    activeProduct,
    fetchSearchProducts
}