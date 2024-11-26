import React, { useState } from 'react';

const MultiStepBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [formData, setFormData] = useState({
    student: null,
    reservation: null,
    booking: null,
    equipment: null,
    payment: null,
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    setProgress(progress + 20);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setProgress(progress - 20);
  };

  const handleFormSubmit = (step, data) => {
    setFormData(prev => ({ ...prev, [step]: data }));
    handleNext();
  };

  const isStepComplete = step => formData[step] !== null;

  return (
    <div>
      <h1>Multi-Step Booking Process</h1>
      <ProgressBar progress={progress} />
      {currentStep === 1 && (
        <StudentForm
          onSubmit={data => handleFormSubmit('student', data)}
          disabled={isStepComplete('student')}
        />
      )}
      {currentStep === 2 && (
        <ReservationForm
          onSubmit={data => handleFormSubmit('reservation', data)}
          disabled={isStepComplete('reservation')}
        />
      )}
      {currentStep === 3 && (
        <BookingForm
          onSubmit={data => handleFormSubmit('booking', data)}
          disabled={isStepComplete('booking')}
        />
      )}
      {currentStep === 4 && (
        <EquipmentForm
          onSubmit={data => handleFormSubmit('equipment', data)}
          disabled={isStepComplete('equipment')}
        />
      )}
      {currentStep === 5 && (
        <PaymentForm
          onSubmit={data => handleFormSubmit('payment', data)}
          disabled={isStepComplete('payment')}
        />
      )}
      {currentStep === 6 && <SummaryPage data={formData} />}
      <div className="button-group">
        {currentStep > 1 && currentStep <= 5 && (
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        )}
      </div>
    </div>
  );
};

// ProgressBar Component
const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }} />
    </div>
  );
};

// StudentForm Component
const StudentForm = ({ onSubmit, disabled }) => {
  const [student, setStudent] = useState({ name: '', program: '', year: '' });
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!student.name || !student.program || !student.year) {
      setError('All fields are required.');
      return;
    }
    onSubmit(student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Management</h2>
      <input
        type="text"
        placeholder="Name"
        value={student.name}
        onChange={e => setStudent({ ...student, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Program"
        value={student.program}
        onChange={e => setStudent({ ...student, program: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year"
        value={student.year}
        onChange={e => setStudent({ ...student, year: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={disabled}>
        Next
      </button>
    </form>
  );
};

// ReservationForm Component
const ReservationForm = ({ onSubmit, disabled }) => {
  const [reservation, setReservation] = useState({ date: '', time: '', location: '' });
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!reservation.date || !reservation.time || !reservation.location) {
      setError('All fields are required.');
      return;
    }
    onSubmit(reservation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reservation Management</h2>
      <input
        type="date"
        value={reservation.date}
        onChange={e => setReservation({ ...reservation, date: e.target.value })}
      />
      <input
        type="time"
        value={reservation.time}
        onChange={e => setReservation({ ...reservation, time: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={reservation.location}
        onChange={e => setReservation({ ...reservation, location: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={disabled}>
        Next
      </button>
    </form>
  );
};

// BookingForm Component
const BookingForm = ({ onSubmit, disabled }) => {
  const [booking, setBooking] = useState({ room: '', duration: '' });
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!booking.room || !booking.duration) {
      setError('All fields are required.');
      return;
    }
    onSubmit(booking);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Booking Management</h2>
      <input
        type="text"
        placeholder="Room"
        value={booking.room}
        onChange={e => setBooking({ ...booking, room: e.target.value })}
      />
      <input
        type="text"
        placeholder="Duration"
        value={booking.duration}
        onChange={e => setBooking({ ...booking, duration: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={disabled}>
        Next
      </button>
    </form>
  );
};

// EquipmentForm Component
const EquipmentForm = ({ onSubmit, disabled }) => {
  const [equipment, setEquipment] = useState({ type: '', quantity: '' });
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!equipment.type || !equipment.quantity) {
      setError('All fields are required.');
      return;
    }
    onSubmit(equipment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Equipment Management</h2>
      <input
        type="text"
        placeholder="Type"
        value={equipment.type}
        onChange={e => setEquipment({ ...equipment, type: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={equipment.quantity}
        onChange={e => setEquipment({ ...equipment, quantity: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={disabled}>
        Next
      </button>
    </form>
  );
};

// PaymentForm Component
const PaymentForm = ({ onSubmit, disabled }) => {
  const [payment, setPayment] = useState({ amount: '', method: '' });
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!payment.amount || !payment.method) {
      setError('All fields are required.');
      return;
    }
    onSubmit(payment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Method Management</h2>
      <input
        type="number"
        placeholder="Amount"
        value={payment.amount}
        onChange={e => setPayment({ ...payment, amount: e.target.value })}
      />
      <input
        type="text"
        placeholder="Method"
        value={payment.method}
        onChange={e => setPayment({ ...payment, method: e.target.value })}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={disabled}>
        Next
      </button>
    </form>
  );
};

// SummaryPage Component
const SummaryPage = ({ data }) => {
  return (
    <div>
      <h2>Summary Page</h2>
      <div>
        <h3>Student Information</h3>
        <pre>{JSON.stringify(data.student, null, 2)}</pre>
      </div>
      <div>
        <h3>Reservation Information</h3>
        <pre>{JSON.stringify(data.reservation, null, 2)}</pre>
      </div>
      <div>
        <h3>Booking Information</h3>
        <pre>{JSON.stringify(data.booking, null, 2)}</pre>
      </div>
      <div>
        <h3>Equipment Information</h3>
        <pre>{JSON.stringify(data.equipment, null, 2)}</pre>
      </div>
      <div>
        <h3>Payment Information</h3>
        <pre>{JSON.stringify(data.payment, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MultiStepBooking;
