import { Modal,Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {deleteProduct} from "../services/ProductService";

const ModalConfirm = (props) => {
    const {show, onHide, product,getProduct} = props

    const confirmDelete = async () => {
        let res = await deleteProduct(product.productId);
        if(res.status === 200){
            onHide();
            getProduct(1);
            toast.success("Delete product succeed!")
        } else{
            toast.error("error delete user")
        }
        console.log('>>>check res: ',res)
    }
    //console.log(">>> check res: " ,res)
    return (
        <>
            <Modal show={show}
                   onHide={onHide}
                   backdrop="static"
                   keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        This action can't be undone!
                        Do you want to delete this product?
                        <br/>
                        <b>id = {product.productId} , code = {product.productCode} ? </b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>confirmDelete()} >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalConfirm;
