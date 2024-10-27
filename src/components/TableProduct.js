import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import {useEffect, useState} from "react";
import {activeProduct, fetchAllProducts, fetchSearchProducts} from "../services/ProductService";
import './TableProduct.scss';
import ModalAddProduct from "./ModalAddProduct";
import Button from "react-bootstrap/Button";
import ModalEditProduct from "./ModalEditProduct";
import ModalConfirm from "./MoldalConfirm";
import {toast} from "react-toastify";
import Form from "react-bootstrap/Form";

const TableProduct = () => {
    const [products, setProducts] = useState([]);

    const [showAddProduct, setShowAddProduct] = useState(false);

    const [showEditProduct, setShowEditProduct] = useState(false);
    const [productEdit,setProductEdit] = useState({});

    const [showDelete,setShowDelete] = useState(false);
    const [productDelete,setProductDelete] = useState({});

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');


    const handleCloseAdd = () => setShowAddProduct(false);
    const handleShowAdd= () => setShowAddProduct(true);

    const handleCloseEdit = () => setShowEditProduct(false);
    const handleShowEdit= () => setShowEditProduct(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete= () => setShowDelete(true);


    useEffect(() => {
        getProduct(1,pageSize,search);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const getProductSearch = async () => {
            try {
                let res = await fetchSearchProducts(1, pageSize, search, signal);
                if (res.data) {
                    setProducts(res.data);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error("Error fetching products:", error);
                    toast.error("Failed to fetch products");
                }
            }
        };

        if (search) {
            getProductSearch();
        }

        return () => {
            controller.abort();
        };
    },[pageSize,search,page]);

    const getProduct = async (page, pageSize = 2, search = "") => {
        let res = await fetchAllProducts(page, pageSize, search);
        if (res.data ) {
            setProducts(res.data);
        }
    }

    const handlePageClick = (event) => {
        const selectedPage = +event.selected + 1;
        getProduct(selectedPage, pageSize, search);
        setPage(selectedPage);
    };

    const handleEditProduct = (product) => {
        handleShowEdit()
        setProductEdit(product);
    }

    const handleDeleteProduct = (product) => {
        handleShowDelete()
        setProductDelete(product);
    }

    const handleActivateProduct = async (productId) => {
        let res = await activeProduct(productId)
        console.log(res);
        if(res.status === 200){
            getProduct(1);
            toast.success("Update status active product success!");
        } else {
            toast.error("Activated fail!")
        }
    }

    console.log(products);
    return (
        <>
            <div className='my-3 add-new d-sm-flex'>
                <span><b>List Products:</b></span>
                <div className='group-btns'>
                    <Button variant="success" onClick={handleShowAdd}>
                        Add new Product
                    </Button>
                </div>
            </div>
            <div className='col-12 col-sm-5 my-3 d-sm-flex'>
                <Form.Control
                    type="number"
                    value={pageSize}
                    min="1"
                    onChange={(event)=>{setPageSize((event.target.value))}}
                    style={{ width: '70px',height: '50px',marginRight: '10px' }}
                />
                <input className='form-control'
                       value={search}
                       onChange={(event)=>{setSearch(event.target.value)}}
                       placeholder='Search product by code or name product...'
                />
            </div>
            <div className="table-customize">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Product Name</th>
                            <th>Unit</th>
                            <th>Purchase Price</th>
                            <th>Sale Price</th>
                            <th>Tax Rate</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.items &&
                        products.items.map((product, index) => {
                            return (
                                <tr key={product.productId}>
                                    <td>{product.productCode}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.unit}</td>
                                    <td>{product.purchasePrice}</td>
                                    <td>{product.salePrice}</td>
                                    <td>{product.taxRate}</td>
                                    <td>{product.isActive ? "Active" : "Unactive"}</td>
                                    <td>
                                        {product.isActive ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={()=>handleActivateProduct(product.productId)}
                                            >Active</button>
                                        ) : (
                                            <button
                                                className="btn btn-primary"
                                                onClick={()=>handleActivateProduct(product.productId)}
                                            >Unactive</button>
                                        )}
                                        <button className='btn btn-warning mx-3'
                                                onClick={()=>handleEditProduct(product)}
                                        >Edit
                                        </button>
                                        <button className='btn btn-danger'
                                                onClick={() => handleDeleteProduct(product)}
                                        >Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={products.totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />

            <ModalAddProduct
                show={showAddProduct}
                onHide={handleCloseAdd}
                onShow={handleShowAdd}
                getProduct={getProduct}
            />

            <ModalEditProduct
                product={productEdit}
                show={showEditProduct}
                onHide={handleCloseEdit}
                onShow={handleShowEdit}
                getProduct={getProduct}
            />

            <ModalConfirm
                product={productDelete}
                show={showDelete}
                onHide={handleCloseDelete}
                getProduct={getProduct}
            />
        </>
    )
}
export default TableProduct;