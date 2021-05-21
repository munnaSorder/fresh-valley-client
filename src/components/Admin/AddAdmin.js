import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import SideNav from './SideNav';
import { useFormik } from 'formik'

const AddAdmin = () => {
    const [allAdmin, setAllAdmin] = useState([])
    const [reload, setReload] = useState(true)

    const initialValues = {
      email: ''
    }
    const validate = (values) => {
      let errors = {}

      if(!values.email) {
        errors.email = 'Required'
      } else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors;
    }

    // admin add db
    const onSubmit = (values) => {
      const admin = {
        email: values.email
      }
      fetch('https://salty-earth-64211.herokuapp.com/addAdmin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
      })
      .then(res => res.json())
      .then(result => {
        if(result){
          setReload(!reload)
        }
      })
    }

    const removeAdmin = (id) => {
      fetch(`https://salty-earth-64211.herokuapp.com/removeAdmin/${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(result => {
        if(result){
          setReload(!reload)
        }
      })
    }

    const formik = useFormik({
      initialValues,
      onSubmit,
      validate
    })

    // load initial admin list
    useEffect(() => {
      fetch('https://salty-earth-64211.herokuapp.com/getAdminList')
      .then(res => res.json())
      .then(doc => setAllAdmin(doc))
    }, [reload])

    return (
        <div className="mt-3">
        <Row style={{margin: '0', padding: '0 50px'}}>
          <Col md={3}>
           <SideNav />
          </Col>
          <Col md={9}>
            <h3 style={{fontWeight: 'bold'}}>Add Admin</h3>
            <form className="d-flex" onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  name="email"
                  className="form-control w-50 mr-3"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Button type="submit">Add Admin</Button>              
            </form>
            {
              formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null
            }
            <div className="mt-5">
                <h3>Admin Email List.</h3>
                <ul>
                    {
                      allAdmin.map((admin, index) => <><li key={index}>{admin.email}</li> <button onClick={() => removeAdmin(admin._id)}>Remove Admin</button></>)
                    }
                </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
};

export default AddAdmin;