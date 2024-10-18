import { useState } from "react";

const useFocus = () => {
  const [isFocusedAmount, setIsFocusedAmount] = useState(false);
  const [isFocusedYear, setIsFocusedYear] = useState(false);
  const [isFocusedRate, setIsFocusedRate] = useState(false);

  const handleFocusAmount = (e) => {
    e.preventDefault();
    setIsFocusedAmount(true);
  };

  const handleBlurAmount = (e) => {
    e.preventDefault();
    setIsFocusedAmount(false);
  };
  
  const handleFocusYear = (e) => {
    e.preventDefault();
    setIsFocusedYear(true);
  };

  const handleBlurYear = (e) => {
    e.preventDefault();
    setIsFocusedYear(false);
  };

  const handleFocusRate = (e) => {
    e.preventDefault();
    setIsFocusedRate(true);
  };

  const handleBlurRate = (e) => {
    e.preventDefault();
    setIsFocusedRate(false);
  };

  return {
    isFocusedAmount, isFocusedYear, isFocusedRate, 
    handleFocusAmount, handleBlurAmount, handleFocusYear, handleBlurYear, handleFocusRate, handleBlurRate,

  };
};

export default useFocus;
