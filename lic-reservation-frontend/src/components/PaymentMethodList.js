import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentMethodList = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [counters, setCounters] = useState({});

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

    const incrementCounter = (methodId) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [methodId]: prevCounters[methodId] + 1,
        }));
    };

    const updatePaymentMethod = async (id, updatedDetails) => {
        await axios.put(`/paymentMethods/updatePaymentMethod/${id}`, updatedDetails);
        fetchPaymentMethods();
    };

    const deletePaymentMethod = async (id) => {
        await axios.delete(`/paymentMethods/deletePaymentMethod/${id}`);
        fetchPaymentMethods();
    };

    return (
        <div>
            <h1>Payment Methods</h1>
            <ul>
                {paymentMethods.map((method) => (
                    <li key={method.paymentMethodId}>
                        <p><strong>({counters[method.paymentMethodId] || 1}) Payment Amount:</strong> {`₱${method.paymentAmount}`}</p>
                        <p><strong>Payment Date:</strong> {new Date(method.paymentDate).toLocaleDateString()}</p>
                        <button 
                            onClick={() => {
                                updatePaymentMethod(method.paymentMethodId, { ...method, status: 'Inactive' });
                                incrementCounter(method.paymentMethodId);
                            }}
                        >
                            Deactivate
                        </button>
                        <button onClick={() => deletePaymentMethod(method.paymentMethodId)}>
                            Delete Payment Method
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentMethodList;
