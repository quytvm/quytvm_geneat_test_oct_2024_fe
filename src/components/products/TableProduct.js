import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import {useEffect, useState} from "react";
import {activeProduct, deleteMultiProducts, fetchAllProducts, fetchSearchProducts} from "../../services/ProductService";
import '../Style.scss';
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
    const [search, setSearch] = useState("");

    const [selectedProducts, setSelectedProducts] = useState([]);


    const handleCloseAdd = () => setShowAddProduct(false);
    const handleShowAdd= () => setShowAddProduct(true);

    const handleCloseEdit = () => setShowEditProduct(false);
    const handleShowEdit= () => setShowEditProduct(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete= () => setShowDelete(true);


    useEffect(() => {
        getProduct(page,pageSize,search);
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
        setPage(1);
        getProductSearch();

        return () => {
            controller.abort();
        };
    },[pageSize,search]);

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
        if(res.status === 200){
            toast.success("Update status active product success!");
            getProduct(page, pageSize, search);
        } else {
            toast.error("Activated fail!")
        }
    }

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedProducts((prev) => [...selectedProducts, value]);
        } else {
            setSelectedProducts((selectedProducts) => selectedProducts.filter((v) => v !== value));
        }
    };

    const handleDeleteProductSelected = async () => {
        let ids = selectedProducts.map(id => Number(id));
        let res = await deleteMultiProducts(ids)
        if(res.status === 200){
            setSelectedProducts([]);
            getProduct(page, pageSize, search);
            toast.success("Delete products success!");
        } else {
            toast.error("Delete products fail!")
        }
    }

    console.log(selectedProducts);
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
                <Button
                    variant="danger"
                    style={{marginRight: '10px'}}
                    disabled={selectedProducts.length > 0 ? false : true}
                    onClick={handleDeleteProductSelected}
                >
                    <i data-fa-symbol="delete" className="fa-solid fa-trash fa-fw"></i>
                </Button>
                <Form.Control
                    type="number"
                    value={pageSize}
                    min="1"
                    onChange={(event) => setPageSize(event.target.value)}
                    style={{ width: '70px', height: '50px', marginRight: '10px' }}
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
                            <th></th>
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
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            id="custom-switch"
                                            value={product.productId}
                                            onChange={handleCheckboxChange}
                                        />
                                    </td>
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
                forcePage={page - 1}
            />

            <ModalAddProduct
                page={page}
                pageSize={pageSize}
                search={search}
                show={showAddProduct}
                onHide={handleCloseAdd}
                onShow={handleShowAdd}
                getProduct={getProduct}
            />

            <ModalEditProduct
                page={page}
                pageSize={pageSize}
                search={search}
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