import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EquipmentList = () => {
    const [equipment, setEquipment] = useState([]);
    const [counters, setCounters] = useState({});
    const [editing, setEditing] = useState(null);
    const [updatedEquipment, setUpdatedEquipment] = useState({
        name: '',
        quantity: 0,
        type: ''
    });

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const response = await axios.get('/equipments/getAllEquipments');
            const equipmentData = response.data;
            setEquipment(equipmentData);

            const initialCounters = {};
            equipmentData.forEach((item, index) => {
                initialCounters[item.equipmentId] = index + 1;
            });
            setCounters(initialCounters);
        } catch (error) {
            console.error('Error fetching equipment:', error);
        }
    };

    const updateEquipment = async (id, updatedDetails) => {
        try {
            await axios.put(`/equipments/updateEquipment/${id}`, updatedDetails);
            fetchEquipment();
            setEditing(null);
        } catch (error) {
            console.error('Error updating equipment:', error);
        }
    };

    const deleteEquipment = async (id) => {
        try {
            await axios.delete(`/equipments/deleteEquipment/${id}`);
            fetchEquipment();
        } catch (error) {
            console.error('Error deleting equipment:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEquipment((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Equipment List</h2>
            {/* Equipment Table */}
            <div className="table-container">
                <table className="equipment-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipment.map((item) => (
                            <tr key={item.equipmentId}>
                                <td>{counters[item.equipmentId] || 1}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.type}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setEditing(item.equipmentId);
                                            setUpdatedEquipment({
                                                name: item.name,
                                                quantity: item.quantity,
                                                type: item.type
                                            });
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteEquipment(item.equipmentId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Equipment Form */}
            {editing && (
                <div className="edit-form">
                    <h3>Edit Equipment</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateEquipment(editing, updatedEquipment);
                        }}
                    >
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={updatedEquipment.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={updatedEquipment.quantity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Type:</label>
                            <input
                                type="text"
                                name="type"
                                value={updatedEquipment.type}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Update Equipment</button>
                        <button type="button" onClick={() => setEditing(null)}>
                            Cancel
                        </button>
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

                .edit-form {
                    margin-top: 20px;
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

export default EquipmentList;
