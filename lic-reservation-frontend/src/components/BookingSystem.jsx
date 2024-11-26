import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const BookingSystem = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    student: null,
    reservation: null,
    booking: null,
    equipment: null,
    payment: null,
  });
  const [errors, setErrors] = useState("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (stepKey, data) => {
    setFormData({ ...formData, [stepKey]: data });
    setErrors("");
    handleNext();
  };

  const validateForm = (stepKey, data) => {
    switch (stepKey) {
      case "student":
        return data.name && data.program && data.year;
      case "reservation":
        return data.date && data.time;
      case "booking":
        return (
          data.userName &&
          data.contactNumber &&
          /\S+@cit\.edu$/.test(data.email) &&
          data.paymentAmount !== "" &&
          data.bookingDate &&
          data.startTime &&
          data.endTime &&
          data.bookingType
        );
      case "equipment":
        return data.equipmentName && data.quantity && data.type;
      case "payment":
        return data.amount !== "" && data.date;
      default:
        return false;
    }
  };

  const currentStepComponent = () => {
    switch (step) {
      case 1:
        return (
          <StudentForm
            onSubmit={(data) =>
              validateForm("student", data)
                ? handleSubmit("student", data)
                : setErrors("Please fill out all fields correctly.")
            }
          />
        );
      case 2:
        return (
          <ReservationForm
            onSubmit={(data) =>
              validateForm("reservation", data)
                ? handleSubmit("reservation", data)
                : setErrors("Please fill out all fields correctly.")
            }
          />
        );
      case 3:
        return (
          <BookingForm
            onSubmit={(data) =>
              validateForm("booking", data)
                ? handleSubmit("booking", data)
                : setErrors("Please fill out all fields correctly.")
            }
          />
        );
      case 4:
        return (
          <EquipmentForm
            onSubmit={(data) =>
              validateForm("equipment", data)
                ? handleSubmit("equipment", data)
                : setErrors("Please fill out all fields correctly.")
            }
          />
        );
      case 5:
        return (
          <PaymentForm
            onSubmit={(data) =>
              validateForm("payment", data)
                ? handleSubmit("payment", data)
                : setErrors("Please fill out all fields correctly.")
            }
          />
        );
      case 6:
        return <SummaryPage data={formData} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div>
      <h1>Booking System</h1>
      <ProgressBar step={step} />
      {currentStepComponent()}
      {errors && <p className="error">{errors}</p>}
      <div className="button-group">
        {step > 1 && step <= 5 && (
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        )}
      </div>
    </div>
  );
};

// Individual form components for each step (omitted for brevity; reuse StudentForm, ReservationForm, etc.)
// ProgressBar Component
// SummaryPage Component

export default BookingSystem;
