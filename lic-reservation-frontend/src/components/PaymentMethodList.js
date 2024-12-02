import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentMethodList = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [counters, setCounters] = useState({});
    const [editingMethod, setEditingMethod] = useState(null);
    const [updatedDetails, setUpdatedDetails] = useState({
        paymentAmount: '',
        paymentDate: ''
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
            paymentDate: new Date(method.paymentDate).toISOString().split('T')[0], // Set date in 'YYYY-MM-DD' format for input
        });
    };

    const updatePaymentMethod = async (id, updatedDetails) => {
        await axios.put(`/paymentMethods/updatePaymentMethod/${id}`, updatedDetails);
        fetchPaymentMethods();
        setEditingMethod(null);
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
            {/* Payment Methods Table */}
            <div className="table-container">
                <table className="equipment-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Payment Amount</th>
                            <th>Payment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentMethods.map((method) => (
                            <tr key={method.paymentMethodId}>
                                <td>{counters[method.paymentMethodId] || 1}</td>
                                <td>{`₱${method.paymentAmount}`}</td>
                                <td>{new Date(method.paymentDate).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(method)}>Edit</button>
                                    <button onClick={() => deletePaymentMethod(method.paymentMethodId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                        <button type="submit">Update Payment Method</button>
                        <button type="button" onClick={() => setEditingMethod(null)}>Cancel</button>
                    </form>
                </div>
            )}

            <style jsx>{`
                .table-container {
                    margin: 20px 0;
                    overflow-x: auto;
                }

                .equipment-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: center;
                }

                .equipment-table th,
                .equipment-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }

                .equipment-table th {
                    background-color: maroon;
                    color: white;
                    font-weight: bold;
                }

                .equipment-table tr:nth-child(even) {
                    background-color: #f2f2f2;
                }

                .equipment-table tr:hover {
                    background-color: #ddd;
                }

                button {
                    margin: 0 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #2196F3;
                }
            `}</style>
        </div>
    );
};

export default PaymentMethodList;
