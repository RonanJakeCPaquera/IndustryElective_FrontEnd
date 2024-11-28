import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentMethodList = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [counters, setCounters] = useState({});
    const [editingMethod, setEditingMethod] = useState(null); // State for tracking the editing payment method
    const [updatedDetails, setUpdatedDetails] = useState({
        paymentAmount: '',
        paymentDate: '',
        status: ''
    });

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        const response = await axios.get('/paymentMethods/getAllPaymentMethods');
        const paymentData = response.data;
        setPaymentMethods(paymentData);

        const initialCounters = {};
        paymentData.forEach((method, index) => {
            initialCounters[method.paymentMethodId] = index + 1;
        });
        setCounters(initialCounters);
    };


    const handleEdit = (method) => {
        setEditingMethod(method);
        setUpdatedDetails({
            paymentAmount: method.paymentAmount,
            paymentDate: new Date(method.paymentDate).toLocaleDateString(), // Assuming you want to display date in a specific format
            status: method.status
        });
    };

    const updatePaymentMethod = async (id, updatedDetails) => {
        await axios.put(`/paymentMethods/updatePaymentMethod/${id}`, updatedDetails);
        fetchPaymentMethods();
        setEditingMethod(null); // Close the editing form after successful update
    };

    const deletePaymentMethod = async (id) => {
        await axios.delete(`/paymentMethods/deletePaymentMethod/${id}`);
        fetchPaymentMethods();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Payment Methods</h1>
            <ul>
                {paymentMethods.map((method) => (
                    <li key={method.paymentMethodId}>
                        <p><strong>({counters[method.paymentMethodId] || 1}) Payment Amount:</strong> {`₱${method.paymentAmount}`}</p>
                        <p><strong>Payment Date:</strong> {new Date(method.paymentDate).toLocaleDateString()}</p>
                        <button onClick={() => handleEdit(method)}>Edit</button>
                        <button onClick={() => deletePaymentMethod(method.paymentMethodId)}>Delete Payment Method</button>
                    </li>
                ))}
            </ul>

            {/* Editing Form */}
            {editingMethod && (
                <div>
                    <h2>Edit Payment Method</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updatePaymentMethod(editingMethod.paymentMethodId, updatedDetails);
                        }}
                    >
                        <div>
                            <label>Payment Amount:</label>
                            <input
                                type="number"
                                name="paymentAmount"
                                value={updatedDetails.paymentAmount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Payment Date:</label>
                            <input
                                type="date"
                                name="paymentDate"
                                value={updatedDetails.paymentDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Status:</label>
                            <select
                                name="status"
                                value={updatedDetails.status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <button type="submit">Update Payment Method</button>
                        <button type="button" onClick={() => setEditingMethod(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PaymentMethodList;
