import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import './home.css'
import Search from './Search';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const Home = () => {
    const history = useHistory()
    const [ loggedInUser ] = useContext(UserContext)
    // product state
    const [allProduct, setAllProduct] = useState([]);
    const [card, setCard] = useState([]);

    // initial load product
    useEffect(() => {
        setAllProduct(false)
        fetch('https://salty-earth-64211.herokuapp.com/allProduct')
        .then(res => res.json())
        .then(data => setAllProduct(data))

        fetch(`https://salty-earth-64211.herokuapp.com/filterOrder/${loggedInUser.email}`)
            .then(res => res.json())
            .then(result => setCard(result))
    }, [])

    // search product function
    const searchProduct = (name) => {
        // clear initial state array
        setAllProduct(false)
        // load search data and store it
        fetch(`https://salty-earth-64211.herokuapp.com/searchProducts/${name}`)
        .then(res => res.json())
        .then(result => {
            if(result.length > 0){
                setAllProduct(result)
            } else {
                alert("Product not found! please search in valid product name");
                window.location.reload();
            }
        })
    }

    const addItemToCard =  (_id, name, weight, price, photo) => {
        if (loggedInUser.email) {      

            const product = {_id, name, weight, price, photo}
            const newCart = [...card, product]
            setCard(newCart)
            const item = {
                _id,
                name,
                weight,
                price,
                photo,               
                quantity: 1,
                email: loggedInUser.email
            }

            fetch(`https://salty-earth-64211.herokuapp.com/filterOrder/${loggedInUser.email}`)
            .then(res => res.json())
            .then(result => {
                const filterData = result.filter(doc => doc._id === _id)

                if(!filterData.length > 0){
                    fetch('https://salty-earth-64211.herokuapp.com/addItem', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(item)
                    })
                    .then(res => res.json())
                    .then(result => {
                        if (result) {
                            alert('item added successfully')
                        }
                    })
    
                    setCard(result)
                } else {
                    alert('Product already added')
                }
                
            })
        } else {
            history.push('/login')
        } 
    }
    return (
        <Container>
            <div className="searchComponents">
                <Search searchProduct={searchProduct} />
            </div>
            <div className="productsArea mt-5 mb-5">
                <Row>
                        {
                            allProduct ? (
                                allProduct.map((pd, index) => (
                                    <Col md={4} key={index}>
                                        <div className="productCard">
                                            <img className="img-fluid p-3" src={pd.photo} alt="" />
                                            <h6 className="font-weight-bold">{pd.name} - {pd.weight}</h6>
                                            <div className="d-flex justify-content-between mt-3">
                                                <h4 style={{fontWeight: 'bold', color: '#71ba58'}}>${pd.price}</h4>
                                                <button onClick={() => addItemToCard(pd._id,pd.name,pd.weight,pd.price,pd.photo)} className="buyNowBtn">Buy Now</button>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <div className="text-center w-100">
                                    <Spinner animation="border" variant="primary" />
                                </div>
                            )
                        }
                </Row>
            </div>
        </Container>
    );
};

export default Home;