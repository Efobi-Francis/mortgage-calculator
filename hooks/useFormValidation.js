import { useState } from 'react';

function useFormValidation(initialFormData) {
  const [formData, setFormData] = useState(initialFormData);

  const [errorAmount, setErrorAmount] = useState(false);
  const [errorTerm, setErrorTerm] = useState(false);
  const [errorRate, setErrorRate] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;

    if (formData.mortgage_amount === "") {
      setErrorAmount(true);
      isValid = false;
    } else {
      setErrorAmount(false);
    }

    if (formData.mortgage_term === "") {
      setErrorTerm(true);
      isValid = false;
    } else {
      setErrorTerm(false);
    }

    if (formData.interest_rate === "") {
      setErrorRate(true);
      isValid = false;
    } else {
      setErrorRate(false);
    }

    if (formData.mortgage_type === "") {
      setErrorType(true);
      isValid = false;
    } else {
      setErrorType(false);
    }

    setIsValid(isValid); // Update overall form validity state
    return isValid;
  };

  const resetForm = (setSelectedOption, setSubmittedWithRepayment, setSubmittedWithInterest) => {
    //reset form data
    setFormData(initialFormData);

    //reset error state
    setErrorAmount(false);
    setErrorTerm(false);
    setErrorRate(false);
    setErrorType(false);

    //reset mortgage type
    setSelectedOption("");

    setTimeout(() => {
      setSelectedOption();
    }, 1000);

    setSubmittedWithRepayment(false);
    setSubmittedWithInterest(false);
  };

  return {
    formData,
    setFormData,
    handleFormChange,
    errorAmount,
    errorTerm,
    errorRate,
    errorType,
    isValid,
    validateForm,
    resetForm,
  };
}

export default useFormValidation;
