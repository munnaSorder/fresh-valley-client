import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SideNav from './SideNav';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useParams } from 'react-router';
import { useFormik } from 'formik'
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
const EditProduct = () => {

  let { id } = useParams()
  const [ singleProduct, setSingleProduct ] = useState({});
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const initialValues = {
    name: singleProduct.name,
    price: singleProduct.price,
    weight: singleProduct.weight,
    photo: singleProduct.photo,
  }
// initial product load
  useEffect(() => {
    fetch(`https://salty-earth-64211.herokuapp.com/singleProduct/${id}`)
    .then(res => res.json())
    .then(data => setSingleProduct(data))
  }, [])

  // handle image upload
  const handleImageUpload = (event) => {
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

  // product update function
  const onSubmit = (values) => {
    const updateProductItem = {
      name: values.name,
      price: values.price,
      photo: imageUrl,
      weight: values.weight
    }
    fetch(`https://salty-earth-64211.herokuapp.com/updateProduct/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateProductItem)
    })
    .then(res => res.json())
    .then(result => {
      if(result) {
        alert("Product updated successfully")
      }
    })
  }
  
  const formik = useFormik( {
    initialValues,
    onSubmit
  })
    return (
        <div className="mt-3">
        <Row style={{margin: '0', padding: '0 50px'}}>
          <Col md={3}>
           <SideNav />
          </Col>
          <Col md={9}>
          <h3 style={{fontWeight: 'bold'}}>Edit Product</h3>
            <form onSubmit={formik.handleSubmit}>
              <Row className="add-product-container">
                <Col md={6}>
                  <h5>Change Name</h5>
                  <input
                    type="text"
                    name="name"
                    defaultValue={singleProduct.name}
                    placeholder="Enter Name"
                    className="form-control mb-4"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <h5>Edit Price</h5>
                  <input
                    type="text"
                    name="price"
                    defaultValue={singleProduct.price}
                    placeholder="Enter Price"
                    className="form-control"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Col>
                <Col md={6}>
                  <h5>Weight</h5>
                    <input
                      type="text"
                      name="weight"
                      placeholder="Enter Weight"
                      className="form-control mb-4"
                      defaultValue={singleProduct.weight}
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <h5>Change Photo</h5>
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
                          onChange={handleImageUpload}
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
                <input
                  type="submit"
                  className="save-btn"
                  value="Update"
                />
              </div>
            </form>           
        </Col>
        </Row>
      </div>
    );
};

export default EditProduct;