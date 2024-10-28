import './App.scss';
import Header from "./components/Header";
import TableProduct from "./components/products/TableProduct";
import Container from "react-bootstrap/Container";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from "react-router-dom";
import TableOrders from "./components/orders/TableOrders";
import AddOrder from "./components/orders/AddOrder";

function App() {
  return (
      <>
          <div className="app-container">
              <Header/>
              <Container>
                  <Routes>
                      <Route path="/products" element={<TableProduct/>}/>
                      <Route path="/orders" element={<TableOrders/>}/>
                      <Route path="/orders/new" element={<AddOrder />} />
                  </Routes>
              </Container>
          </div>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
      </>
  );
}

export default App;
