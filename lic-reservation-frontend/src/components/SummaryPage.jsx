import React, { useState } from 'react';
import BookingList from './BookingList';
import EquipmentList from './EquipmentList';
import PaymentMethodList from './PaymentMethodList';
import ReservationList from './ReservationList';
import StudentList from './StudentList';
import './SummaryPage.css';

const SummaryPage = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [tabCounts, setTabCounts] = useState({
        bookings: 0,
        equipment: 0,
        payments: 0,
        reservations: 0,
        students: 0,
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setTabCounts((prevCounts) => ({
            ...prevCounts,
            [tab]: prevCounts[tab] + 1,
        }));
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'bookings':
                return <BookingList />;
            case 'equipment':
                return <EquipmentList />;
            case 'payments':
                return <PaymentMethodList />;
            case 'reservations':
                return <ReservationList />;
            case 'students':
                return <StudentList />;
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
                    Bookings ({tabCounts.bookings})
                </button>
                <button
                    className={`nav-button ${activeTab === 'equipment' ? 'active' : ''}`}
                    onClick={() => handleTabChange('equipment')}
                >
                    Equipment ({tabCounts.equipment})
                </button>
                <button
                    className={`nav-button ${activeTab === 'payments' ? 'active' : ''}`}
                    onClick={() => handleTabChange('payments')}
                >
                    Payments ({tabCounts.payments})
                </button>
                <button
                    className={`nav-button ${activeTab === 'reservations' ? 'active' : ''}`}
                    onClick={() => handleTabChange('reservations')}
                >
                    Reservations ({tabCounts.reservations})
                </button>
                <button
                    className={`nav-button ${activeTab === 'students' ? 'active' : ''}`}
                    onClick={() => handleTabChange('students')}
                >
                    Students ({tabCounts.students})
                </button>
            </nav>
            <main className="summary-content">{renderActiveTab()}</main>
        </div>
    );
};

export default SummaryPage;
