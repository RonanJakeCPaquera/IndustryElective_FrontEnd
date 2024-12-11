import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md'; // Importing icons

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
        setEditingMethod(method.paymentMethodId);
        setUpdatedDetails({
            paymentAmount: method.paymentAmount,
            paymentDate: new Date(method.paymentDate).toISOString().split('T')[0], // Set date in 'YYYY-MM-DD' format for input
        });
    };

    const handleSave = async (id) => {
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
                                <td>
                                    {editingMethod === method.paymentMethodId ? (
                                        <input
                                            type="number"
                                            name="paymentAmount"
                                            value={updatedDetails.paymentAmount}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        `₱${method.paymentAmount}`
                                    )}
                                </td>
                                <td>
                                    {editingMethod === method.paymentMethodId ? (
                                        <input
                                            type="date"
                                            name="paymentDate"
                                            value={updatedDetails.paymentDate}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        new Date(method.paymentDate).toLocaleDateString()
                                    )}
                                </td>
                                <td>
                                    {editingMethod === method.paymentMethodId ? (
                                        <>
                                            <button onClick={() => handleSave(method.paymentMethodId)}>
                                                Save
                                            </button>
                                            <button onClick={() => setEditingMethod(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(method)}>
                                                <MdEdit />
                                            </button>
                                            <button
                                                onClick={() => deletePaymentMethod(method.paymentMethodId)}
                                            >
                                                <MdDelete />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                    background-color: yellow;
                }

                button {
                    margin: 0 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                    background-color: #f2f2f2;
                    border: none;
                    border-radius: 3px;
                }

                button:hover {
                    background-color: #2196F3;
                    color: white;
                }

                input {
                    padding: 5px;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default PaymentMethodList;
