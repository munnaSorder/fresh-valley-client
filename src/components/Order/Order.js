import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import './order.css';

const Order = () => {
    const [ loggedInUser ] = useContext(UserContext)
    const [card, setCard] = useState([])
    const [pendingOrderList, setPendingOrderList] = useState([])

    useEffect(() => {
        fetch(`https://salty-earth-64211.herokuapp.com/filterOrder/${loggedInUser.email}`)
            .then(res => res.json())
            .then(result => setCard(result))
        fetch(`https://salty-earth-64211.herokuapp.com/getPendingOrder/${loggedInUser.email}`)
        .then(res => res.json())
        .then(result => setPendingOrderList(result))
    }, [pendingOrderList, card])


    const placeOrder = () => {
        const createOrderNumber = Date.now();
        const orderItem = {
            orderNumber: createOrderNumber,
            items: card,
            email: loggedInUser.email
        }
        fetch('https://salty-earth-64211.herokuapp.com/pendingOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItem)
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                alert('Order Place Success')
                fetch(`https://salty-earth-64211.herokuapp.com/getPendingOrder/${loggedInUser.email}`)
                .then(res => res.json())
                .then(result => setPendingOrderList(result))

                // delete previous order
                fetch(`https://salty-earth-64211.herokuapp.com/pendingOrderDelete/${loggedInUser.email}`, {
                    method: 'DELETE',
                })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        setCard([])
                    }
                })
            }
        })
    }

    
    const totalPrice = card.reduce((total, item) => {
        return total + item.price * item.quantity
    }, 0)

    return (
        <Container className="mt-5">
            <h1>Checkout</h1>
            <div className="mt-5 table-main-container">
                <Table hover>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            card.map((item, index) => (
                                <tr>
                                    <td>{item.name} - {item.weight}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td><strong>Total</strong></td>
                            <td></td>
                            <td><strong>${totalPrice}</strong></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="text-right">
                <Button onClick={() => placeOrder()}>Checkout</Button>
            </div>

            <div>
                <h3>Pending Order number</h3>
                <ul>
                    {
                        pendingOrderList.map((doc, index) => <li key={index}>{doc.orderNumber}</li>)
                    }
                </ul>
            </div>
        </Container>
    );
};

export default Order;