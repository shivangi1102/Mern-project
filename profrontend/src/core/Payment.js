import DropIn from 'braintree-web-drop-in-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isauthenticate } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/carthelper'
import { createOrder } from './helper/orderHelper'
import { getToken, processPayment } from './helper/paymenthelper'

const Payment = ({products, setReload = f => f, reload = undefined}) => {
    
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: ""
    })

    const userId = isauthenticate() && isauthenticate().user._id
    const token = isauthenticate() && isauthenticate().token

    const getMeToken = (userId, token) => {
          getToken(userId, token)
        .then(info => {
            //console.log("info", info)
            if(info.error){
                setInfo({...info,error:info.error});
           }
            else{
                const clientToken = info.clientToken
                setInfo({clientToken});
            }
         });
    };

    useEffect(() => {
     getMeToken(userId,token);
    }, [])
    


  const onPurchase = () => {
    setInfo({loading: true})
    let nonce;
    let getNonce = info.instance
    .requestPaymentMethod()
    .then(data => {
        nonce = data.nonce
        const paymentData ={
            paymentMethodNonce:nonce,
            amount: getAmount()
        };
        processPayment(userId,token,paymentData)
        .then (respomse =>{
            setInfo({...info,success:respomse.success,loading:false})
            console.log("payment success",respomse)
            console.log("id",respomse.transaction.id)
            const orderData = {
              products:products,
              transaction_id: respomse.transaction.id,
              amount:respomse.transaction.amount,
            }
            console.log(orderData)
            createOrder(userId,token,orderData)
           console.log("order success")
            cartEmpty(() =>{
              console.log('errr')
            })
            setReload(!reload)
        })
        .catch(error => {
            setInfo({loading:false,
            success:false,
            error:error
        })
        console.log("error")
        })
    })
  }

  const getAmount = () => {
    let amount =0
    products.map (p => {
        amount= amount + p.price;
    })
    return amount;
  }

  const showDropIn = () =>{
    return (
        <div>
            {info.clientToken !== null && products.length >0 ? (
            <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className='btn w-100 btn-success' onClick={onPurchase}>Buy</button>
          </div>
            ):(<h1>hello</h1>)}
        </div>
    )
}


  return (
    <div>
        <h2>Your bill is {getAmount()}</h2>
        {showDropIn() }
    </div>
  )
}

export default Payment