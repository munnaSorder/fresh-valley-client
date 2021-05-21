import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SideNav from './SideNav';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const initialValues = {
    name: '',
    price: '',
    weight: ''
  }

  const handleImage = (event) => {
    setLoading(true)
    setImageUrl('')
    const imageData = new FormData();
    imageData.set('key', '97d66b6bdc5e8d57cad48ebc23a94884');
    imageData.append('image', event.target.files[0])
    axios.post('https://api.imgbb.com/1/upload', imageData)
    .then(function (response) {
      setLoading(false)
      setImageUrl(response.data.data.display_url);
    })
    .catch(function (error) {
      setLoading(false)
      alert("image upload problem");
    });
  }

  const onSubmit = (values) => {
    const product = {
      name: values.name,
      price: values.price,
      photo: imageUrl,
      weight: values.weight,
    }
    fetch('https://salty-earth-64211.herokuapp.com/addSingleProduct',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(result => {
      if(result){
        alert("Product added successfully")
      }
    })
  }
  const formik = useFormik( {
    initialValues,
    onSubmit,
  })

  return (
    <div className="mt-3">
      <Row style={{margin: '0', padding: '0 50px'}}>
        <Col md={3}>
         <SideNav />
        </Col>
        <Col md={9}>
          <h3 style={{fontWeight: 'bold'}}>Add Product</h3>
          <form onSubmit={formik.handleSubmit}>
            <Row className="add-product-container">
              <Col md={6}>
                <h5>Product Name</h5>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="form-control mb-4"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <h5>Add Price</h5>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter Price"
                  className="form-control"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
              </Col>
              <Col md={6}>
                <h5>Weight</h5>
                  <input
                    type="text"
                    name="weight"
                    placeholder="Enter Weight"
                    className="form-control mb-4"
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  <h5>Add Photo</h5>
                  {
                    loading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <label htmlFor="file" className="custom-input">
                        <AddAPhotoIcon />&nbsp;
                        Upload Photo
                        </label>
                        <input
                          onChange={handleImage}
                          type="file"
                          name="file"
                          id="file"
                        />                     
                      </>
                    )
                  }
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="save-btn">Save</button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default AddProduct;