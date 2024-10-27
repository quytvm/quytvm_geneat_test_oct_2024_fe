import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import {putEditProduct} from "../services/ProductService";
import { toast } from 'react-toastify';

const ModalEditProduct = (props) => {
    const { show, onHide, getProduct, product } = props;
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        if (show) {
            setName(product.productName);
            setUnit(product.unit);
            setPurchasePrice(product.purchasePrice);
            setSalePrice(product.salePrice);
            setTaxRate(product.taxRate);
            setStatus(product.isActive);
        }
    }, [product,show]);

    const handleEditProduct = async () => {
        let productEdit = {
            productId: product.productId,
            productName: name,
            unit: unit,
            purchasePrice: purchasePrice,
            salePrice: salePrice,
            isActive: status,
            taxRate: taxRate
        }

        let res = await putEditProduct(productEdit);
        console.log(res);
        if(res.status === 200){
            onHide();
            setName('');
            setUnit('');
            setPurchasePrice(0);
            setSalePrice(0);
            setTaxRate(0);
            setStatus(0);
            getProduct(1);
            toast.success(res.data);

        } else {
            toast.error("A product is updated fail!")
        }
    }

    return (
        <>
            <Modal size="lg" aria-labelledby="example-modal-sizes-title-lg"
                   show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name product"
                                autoFocus
                                value={name}
                                onChange={(event)=>setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="unit calculator"
                                autoFocus
                                value={unit}
                                onChange={(event)=>setUnit(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Purchase price</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                value={purchasePrice}
                                onChange={(event)=>setPurchasePrice(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Sale price</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                value={salePrice}
                                onChange={(event)=>setSalePrice(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Tax rate</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                value={taxRate}
                                onChange={(event)=>setTaxRate(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                autoFocus
                                value={String(status)}
                                onChange={(event) => setStatus(event.target.value === "true")}
                            >
                                <option value="true">Active</option>
                                <option value="false">Unactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalEditProduct;