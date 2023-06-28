import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import PayPalButton from './Paypal';
import useRazorpay from 'react-razorpay'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 

const Payment = () => {
  const selectedPrice = useSelector((state) => state.auth.selectedPrice);
  const selectedPlan = useSelector((state) => state.auth.selectedPlan);
  const selectedNumber = useSelector((state) => state.auth.selectedNumber);
  const navigate = useNavigate();
  const Razorpay = useRazorpay();
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));

  const handleRazorpay = () => {
    const options = {
      key: "rzp_test_rVlBh4uxr1y4Nd",
      amount: 1 * 100,
      currency: "INR",
      name: "Nexwave",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: async function (response) {
        console.log("response: ", response)

        
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/create-subscription/', {
            recharge_plan_id: selectedPlan,
            other_field: "other_value"
          }, {
            headers: {
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + String(authTokens.access),
            },
          });
    
          console.log('response data:', response.data);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
        toast.success("Payment Successful");
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      toast.error("Payment Failed");
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  useEffect(() => {
    // Check if selectedPrice is null
    if (selectedPrice === null) {
      // Navigate to the /recharge page
      navigate('/recharge');
    }
  }, [selectedPrice, navigate]);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className='payment-amount'>
          <p>Amount Payable</p>
          <h1>{selectedPrice}</h1>
          <h1>{selectedNumber}</h1>
          
        </div>
        <PayPalButton selectedPrice={selectedPrice} />
        <button className="pay-button" onClick={handleRazorpay}>
          Pay with Razorpay
        </button>
      </div>
      <ToastContainer />
    </div>
  );

};

export default Payment;
