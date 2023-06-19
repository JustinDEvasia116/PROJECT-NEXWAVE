// PayPalButton.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import swal from 'sweetalert';

const PayPalButton = ({ selectedPrice }) => {
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "0.01",
            },
          },
        ],
      })
      .then((orderId) => {
        // Your code here after creating the order
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (orderData) {
      console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

      // Handle the success case
      swal({
        title: "Payment Successful",
        text: "Your payment is successful",
        icon: "success",
        button: "OK",
      }).then(() => {
        window.location.href = "/";
      });
    });
  };

  return (
    <PayPalScriptProvider options={{
      "client-id": "AShn40Fb_4dIhXOVfYkbn6kDhmAI5iWBBVrXvzTNws_hwWxsgxZX_bbbSol6Dnd3P4f6EpCOjIf40Yaz"
    }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
