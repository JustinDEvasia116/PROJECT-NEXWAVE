import React, { useState, useEffect } from 'react';
import './recharge.css'; // Import your CSS file for recharge page styling
import axios from 'axios';
const Recharge = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [allPlans, setAllplans] = useState([]);
    const [rechargePlans, setRechargePlans] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch and set the categories
        axios.get('http://127.0.0.1:8000/admins/categories/')
            .then(response => {
                setCategories(response.data);
                console.log(response.data); // Log the response data
            })
            .catch(error => console.error(error));

        // Fetch and set the recharge plans based on the selected category
        // Replace this with your own logic to fetch the data from your backend
        axios.get('http://127.0.0.1:8000/admins/recharge-plans/')
            .then(response => {
                setAllplans(response.data)
                const filteredPlans = response.data.filter(plan => plan.category === 1);
                setRechargePlans(filteredPlans);
        
            })
            .catch(error => console.error(error));
            setSelectedCategory('Popular Plans');
    }, []);
    const handleCategoryClick = (category) => {
        setSelectedCategory(category.name);
        const filteredPlans =allPlans.filter(plan => plan.category === category.id);
        setRechargePlans(filteredPlans)
      };

    return (
        <div className="recharge-container">
            <div className="recharge-left-section">
                {/* Content for the left section */}
                <div className="recharge-card">
                    {/* Content inside the left section card */}
                    <div className="recharge-card-content">
                        <h2>Select Plan</h2>
                        <div className="recharge-card-info">
                            <p>9645921191</p>
                            <button className="edit-button">Edit</button>
                        </div>
                        <div className="plan-categories">
                            {categories.map(category => (
                                <p key={category.id} onClick={() => handleCategoryClick(category)}>{category.name}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="recharge-right-section">
                {/* Content for the right section */}
                <div className="recharge-card">
                    {/* Content inside the right section card */}
                    {selectedCategory ? (
                        <>
                            <h2>{selectedCategory}</h2>
                            {rechargePlans.length > 0 ? (
                                <ul className="recharge-plans-list">
                                    {rechargePlans.map((plan, index) => (
                                        <div>
                                            <li key={index}>
                                                <div className="plan-item">
                                                    <h3>Plan</h3>
                                                    <p>${plan.price}</p>
                                                </div>
                                                <div className="plan-item">
                                                    <h3>Validity</h3>
                                                    <p>{plan.validity} days</p>
                                                </div>
                                                <div className="plan-item">
                                                    <h3>Data</h3>
                                                    <p>{plan.data} GB</p>
                                                </div>
                                                <a href="#" className="view-details">View Details</a>

                                                <button className="buy-button">Buy</button>

                                            </li>

                                        </div>


                                    ))}

                                </ul>
                            ) : (
                                <p>No recharge plans available for the selected category.</p>
                            )}
                        </>
                    ) : (
                        <p>Please select a category to view the recharge plans.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recharge;
