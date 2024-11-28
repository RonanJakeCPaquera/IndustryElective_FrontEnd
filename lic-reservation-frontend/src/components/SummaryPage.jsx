import React, { useState } from 'react';
import BookingList from './BookingList';
import EquipmentList from './EquipmentList';
import PaymentMethodList from './PaymentMethodList';
import ReservationList from './ReservationList';
import StudentList from './StudentList';
import './SummaryPage.css';
import { useNavigate } from 'react-router-dom';

const SummaryPage = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    // const [tabCounts, setTabCounts] = useState({
    //     bookings: 0,
    //     equipment: 0,
    //     payments: 0,
    //     reservations: 0,
    //     students: 0,
    // });

    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // setTabCounts((prevCounts) => ({
        //     ...prevCounts,
        //     [tab]: prevCounts[tab] + 1,
        // }));
    };

    const handleEdit = (item) => {
        console.log('Editing:', item);
        // Implement your edit functionality here
    };

    const handleDelete = (item) => {
        console.log('Deleting:', item);
        // Implement your delete functionality here
    };

    const handleUpdate = (item) => {
        console.log('Updating:', item);
        // Implement your update functionality here
    };

    const handleStartAgain = () => {
        // Redirect to the initial page, for example the student management page
        navigate('/student-management'); 
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'bookings':
                return <BookingList handleEdit={handleEdit} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
            case 'equipment':
                return <EquipmentList handleEdit={handleEdit} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
            case 'payments':
                return <PaymentMethodList handleEdit={handleEdit} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
            case 'reservations':
                return <ReservationList handleEdit={handleEdit} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
            case 'students':
                return <StudentList handleEdit={handleEdit} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
            default:
                return <BookingList />;
        }
    };

    return (
        <div className="summary-page-container">
            <nav className="summary-navigation">
                <button
                    className={`nav-button ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => handleTabChange('bookings')}
                >
                    Bookings 
                </button>
                <button
                    className={`nav-button ${activeTab === 'equipment' ? 'active' : ''}`}
                    onClick={() => handleTabChange('equipment')}
                >
                    Equipment 
                </button>
                <button
                    className={`nav-button ${activeTab === 'payments' ? 'active' : ''}`}
                    onClick={() => handleTabChange('payments')}
                >
                    Payments 
                </button>
                <button
                    className={`nav-button ${activeTab === 'reservations' ? 'active' : ''}`}
                    onClick={() => handleTabChange('reservations')}
                >
                    Reservations 
                </button>
                <button
                    className={`nav-button ${activeTab === 'students' ? 'active' : ''}`}
                    onClick={() => handleTabChange('students')}
                >
                    Students 
                </button>
            </nav>
            <main className="summary-content">
                {renderActiveTab()}
            </main>

            {/* Start Again Button */}
            <div className="start-again-container">
                <button
                    onClick={handleStartAgain}
                    className="start-again-button"
                >
                    Book  Again
                </button>
            </div>
        </div>
    );
};

export default SummaryPage;
