import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import { postCreateProduct} from "../../services/ProductService";
import { toast } from 'react-toastify';

const ModalAddProduct = (props) => {
    const { show, onHide, getProduct, pageSize,search } = props;
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [status, setStatus] = useState(true);

    const handleCreateProduct = async () => {
        let product = {
            productId: 0,
            productName: name,
            unit: unit,
            purchasePrice: purchasePrice,
            salePrice: salePrice,
            isActive: status,
            taxRate: taxRate
        }

        let res = await postCreateProduct(product);
        if(res.data.productId){
            onHide();
            setName('');
            setUnit('');
            setPurchasePrice(0);
            setSalePrice(0);
            setTaxRate(0);
            setStatus(true);
            getProduct(1,pageSize,search);
            toast.success("A product is created successfully!")
        } else {
            toast.error("A product is created fail!")
        }
    }

    return (
        <>
            <Modal size="lg" aria-labelledby="example-modal-sizes-title-lg"
                   show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Add Product</Modal.Title>
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
                    <Button variant="primary" onClick={handleCreateProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddProduct;