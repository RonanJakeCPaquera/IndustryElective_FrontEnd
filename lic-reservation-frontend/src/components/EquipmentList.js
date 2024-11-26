import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EquipmentList = () => {
    const [equipment, setEquipment] = useState([]);
    const [counters, setCounters] = useState({});

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        const response = await axios.get('/equipments/getAllEquipments');
        const equipmentData = response.data;
        setEquipment(equipmentData);

        const initialCounters = {};
        equipmentData.forEach((item, index) => {
            initialCounters[item.equipmentId] = index + 1;
        });
        setCounters(initialCounters);
    };

    const incrementCounter = (equipmentId) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [equipmentId]: prevCounters[equipmentId] + 1,
        }));
    };

    const updateEquipment = async (id, updatedDetails) => {
        await axios.put(`/equipments/updateEquipment/${id}`, updatedDetails);
        fetchEquipment();
    };

    const deleteEquipment = async (id) => {
        await axios.delete(`/equipments/deleteEquipment/${id}`);
        fetchEquipment();
    };

    return (
        <div>
            <h2>Equipment List</h2>
            <ul>
                {equipment.map((item) => (
                    <li key={item.equipmentId}>
                        <p><strong>({counters[item.equipmentId] || 1}) Name:</strong> {item.name}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Type:</strong> {item.type}</p>
                        <button 
                            onClick={() => {
                                updateEquipment(item.equipmentId, { ...item, quantity: item.quantity + 1 });
                                incrementCounter(item.equipmentId);
                            }}
                        >
                            Increase Quantity
                        </button>
                        <button onClick={() => deleteEquipment(item.equipmentId)}>
                            Delete Equipment
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EquipmentList;
