import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete,  } from 'react-icons/md';

const EquipmentList = () => {
    const [equipment, setEquipment] = useState([]);
    const [counters, setCounters] = useState({});
    const [isEditing, setIsEditing] = useState(null);
    const [editData, setEditData] = useState({
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

    const handleEditClick = (item) => {
        setIsEditing(item.equipmentId);
        setEditData({
            name: item.name,
            quantity: item.quantity,
            type: item.type
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditSave = async (id) => {
        try {
            await axios.put(`/equipments/updateEquipment/${id}`, editData);
            fetchEquipment();
            setIsEditing(null);
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
                                <td>
                                    {isEditing === item.equipmentId ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleEditChange}
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>
                                <td>
                                    {isEditing === item.equipmentId ? (
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={editData.quantity}
                                            onChange={handleEditChange}
                                        />
                                    ) : (
                                        item.quantity
                                    )}
                                </td>
                                <td>
                                    {isEditing === item.equipmentId ? (
                                        <input
                                            type="text"
                                            name="type"
                                            value={editData.type}
                                            onChange={handleEditChange}
                                        />
                                    ) : (
                                        item.type
                                    )}
                                </td>
                                <td>
                                    {isEditing === item.equipmentId ? (
                                        <>
                                            <button onClick={() => handleEditSave(item.equipmentId)}>
                                                Save
                                            </button>
                                            <button onClick={() => setIsEditing(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(item)}>
                                            <MdEdit />
                                            </button>
                                            <button
                                                onClick={() => deleteEquipment(item.equipmentId)}
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
                }

                button:hover {
                    background-color: #2196F3;
                }

                input {
                    padding: 5px;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default EquipmentList;
