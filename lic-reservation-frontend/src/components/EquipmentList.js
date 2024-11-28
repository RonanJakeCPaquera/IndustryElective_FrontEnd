import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EquipmentList = () => {
    // State to store the list of equipment
    const [equipment, setEquipment] = useState([]);

    // State to track the counters for equipment items (for quantity updates)
    const [counters, setCounters] = useState({});

    // State for the form to edit the equipment details
    const [editing, setEditing] = useState(null);
    const [updatedEquipment, setUpdatedEquipment] = useState({
        name: '',
        quantity: 0,
        type: ''
    });

    // Fetch the equipment data when the component mounts
    useEffect(() => {
        fetchEquipment();
    }, []);

    // Function to fetch equipment data from the server
    const fetchEquipment = async () => {
        try {
            // Making a GET request to fetch equipment data
            const response = await axios.get('/equipments/getAllEquipments');
            const equipmentData = response.data;

            // Setting the fetched equipment data into state
            setEquipment(equipmentData);

            // Initialize counters with unique IDs for each piece of equipment
            const initialCounters = {};
            equipmentData.forEach((item, index) => {
                initialCounters[item.equipmentId] = index + 1; // Start counters from 1
            });
            setCounters(initialCounters);
        } catch (error) {
            console.error('Error fetching equipment:', error); // Handle errors
        }
    };

    // Function to update the details of a specific equipment item
    const updateEquipment = async (id, updatedDetails) => {
        try {
            // Sending PUT request to update equipment data
            await axios.put(`/equipments/updateEquipment/${id}`, updatedDetails);
            fetchEquipment(); // Refresh the equipment list after updating
            setEditing(null); // Close the edit form after update
        } catch (error) {
            console.error('Error updating equipment:', error); // Handle errors
        }
    };

    // Function to delete a specific equipment item
    const deleteEquipment = async (id) => {
        try {
            // Sending DELETE request to remove the equipment
            await axios.delete(`/equipments/deleteEquipment/${id}`);
            fetchEquipment(); // Refresh the equipment list after deletion
        } catch (error) {
            console.error('Error deleting equipment:', error); // Handle errors
        }
    };

    // Handle change in the edit form input fields
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

            {/* Show equipment list */}
            <ul>
                {equipment.map((item) => (
                    <li key={item.equipmentId}>
                        <p><strong>({counters[item.equipmentId] || 1}) Name:</strong> {item.name}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Type:</strong> {item.type}</p>

                        {/* Edit button */}
                        <button onClick={() => {
                            // Set the equipment to be edited
                            setEditing(item.equipmentId);
                            setUpdatedEquipment({
                                name: item.name,
                                quantity: item.quantity,
                                type: item.type
                            });
                        }}>
                            Edit
                        </button>

                        {/* Delete button */}
                        <button onClick={() => deleteEquipment(item.equipmentId)}>
                            Delete Equipment
                        </button>
                    </li>
                ))}
            </ul>

            {/* Edit Equipment Form */}
            {editing && (
                <div>
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
        </div>
    );
};

export default EquipmentList;
