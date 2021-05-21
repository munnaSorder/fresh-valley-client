import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './sidenav.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import SideNav from './SideNav';
import { useHistory } from 'react-router';

const Admin = () => {

  const history = useHistory()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageReload, setPageReload] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('https://salty-earth-64211.herokuapp.com/allProduct')
    .then(res => res.json())
    .then(data => {
      setLoading(false)
      setProducts(data)
    })
    .catch(err => alert(err))
  }, [pageReload])

  const editProduct = (id) => {
    history.push(`/editProduct/${id}`)
  }

  const deleteProduct = (id) => {
    fetch(`https://salty-earth-64211.herokuapp.com/deleteProduct/${id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(result => {
      if(result){
        setPageReload(!pageReload)
      }
    })
  }

  return (
    <div className="mt-3">
      <Row style={{margin: '0', padding: '0 50px'}}>
        <Col md={3}>
         <SideNav />
        </Col>
        <Col md={9}>
          <h3 style={{fontWeight: 'bold'}}>Manage Product</h3>
          <div className="table-container">
            <Table borderless>
              <thead>
                <tr style={{backgroundColor: '#f5f6fa'}}>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Weight</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
               {
                 loading ? (
                    <div className="mt-5 text-center">
                      <CircularProgress />
                    </div>
                 ) : (
                    products.map((pd, index) => (
                       <tr key={index}>
                         <td>{pd.name}</td>
                         <td>${pd.price}</td>
                         <td>{pd.weight}</td>
                         <td>
                           <button onClick={() => editProduct(pd._id)} className="edit-btn"><EditIcon /></button>
                           <button onClick={() => deleteProduct(pd._id)} className="delete-btn"><DeleteIcon /></button>
                         </td>
                       </tr>
                    ))
                 )
               }
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;