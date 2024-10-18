"use client";

import Image from "next/image";
import { useState } from "react";

import { Button, Radio, Label, TextInput } from "flowbite-react";
import {
  customThemeMortgageAmount,
  customThemeTerm_Rate,
} from "@/components/CustomTheme.ts";

import useFormValidation from "@/hooks/useFormValidation.js";
import useFocus from "@/hooks/useFocus_Blur.js";

import icon_calculator from "@/public/assets/images/icon-calculator.svg";
import illustration_empty from "@/public/assets/images/illustration-empty.svg";

export default function Form() {
  const [isSubmittedWithRepayment, setSubmittedWithRepayment] = useState(false);
  const [isSubmittedWithInterest, setSubmittedWithInterest] = useState(false);

  const [selectedOption, setSelectedOption] = useState();

  const [monthly_repayment, setMonthlyRepayment] = useState("");
  const [interest_only, setInterestOnly] = useState("");

  const [totalTermInRepayment, setTotalTermInRepayment] = useState("");
  const [totalInterestOnly, setTotalInterestOnly] = useState("");

  const initialFormData = {
    mortgage_amount: "",
    mortgage_term: "",
    interest_rate: "",
    mortgage_type: "",
  };

  //hooks

  const {
    formData,
    handleFormChange,
    errorAmount,
    errorTerm,
    errorRate,
    errorType,
    validateForm,
    resetForm,
  } = useFormValidation(initialFormData);

  const { 
    isFocusedAmount, isFocusedYear, isFocusedRate, 
    handleFocusAmount, handleBlurAmount, handleFocusYear, handleBlurYear, handleFocusRate, handleBlurRate, 
  } = useFocus();



  function Repayment() {
    let monthlyRepayment, annual_interest_rate, loan_term_years;

    annual_interest_rate = formData.interest_rate / 100 / 12;

    loan_term_years = formData.mortgage_term * 12;

    monthlyRepayment =
      (formData.mortgage_amount *
        annual_interest_rate *
        (1 + annual_interest_rate) ** loan_term_years) /
      ((1 + annual_interest_rate) ** loan_term_years - 1);

    return monthlyRepayment;
  }

  function InterestOnly() {
    let Interest_Only, annual_interest_rate;

    annual_interest_rate = formData.interest_rate / 100 / 12;

    Interest_Only = formData.mortgage_amount * annual_interest_rate;

    return Interest_Only;
  }

  function TotalTermRepayment() {
    let totalAnnualRepayment = Repayment() * 12;

    let totalTermInRepayment = totalAnnualRepayment * formData.mortgage_term;

    return totalTermInRepayment;
  }

  function TotalInterestOnly() {
    let totalAnnualInterest = InterestOnly() * 12;

    let totalInterestOnly = totalAnnualInterest * formData.mortgage_term;

    return totalInterestOnly;
  }

  const handleReset = (e) => {
    e.preventDefault();

    // Use the reset form logic from the hook
    resetForm(setSelectedOption, setSubmittedWithRepayment, setSubmittedWithInterest);
  };
  

  const handlesubmit = (e) => {
    e.preventDefault();

    // Validation
    if(validateForm()){
      if (formData.mortgage_type === "repayment") {
        setMonthlyRepayment(
          Repayment().toLocaleString("en-UK", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        setTotalTermInRepayment(
          TotalTermRepayment().toLocaleString("en-UK", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        setSubmittedWithRepayment(true);
        setSubmittedWithInterest(false);
      } else if (formData.mortgage_type === "interest_only") {
        setInterestOnly(
          InterestOnly().toLocaleString("en-UK", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        setTotalInterestOnly(
          TotalInterestOnly().toLocaleString("en-UK", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        setSubmittedWithRepayment(false);
        setSubmittedWithInterest(true);
      }
    }
  };


  return (
    <div className=" lg:flex md:bg-white md:rounded-2xl text-sm ">
      <form className=" flex flex-col gap-6 px-5 py-7 lg:w-[448px] md:rounded-tl-2xl md:rounded-bl-2xl md:px-9">

        <div className=" md:flex justify-between items-center">
          <h1 className=" font-bold text-[hsl(202,55%,16%)] text-2xl mb-3">
            Mortgage Calculator
          </h1>
          <button
            onClick={handleReset}
            className=" underline mb-3 text-[hsl(200,26%,54%)]"
          >
            Clear All
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="mortgage_amount" className="text-[hsl(200,26%,54%)]">
            Mortgage Amount
          </Label>
          <div className="flex">
            <Button 
              className={` w-10 pointer-events-none rounded-e-none bg-[hsl(202,86%,94%)] border-2 border-r-0 border-gray-400 
                text-[hsl(200,26%,54%)] font-bold transition-none ${isFocusedAmount ? "bg-[hsl(61,70%,52%)] text-[hsl(202,56%,12%)] border-none" 
                : `${errorAmount && "bg-red-600 text-white border border-red-600"}`}
              `} 
            >
              &pound;
            </Button>
            <TextInput
              type="number"
              name="mortgage_amount"
              value={formData.mortgage_amount}
              onChange={handleFormChange}
              onFocus={handleFocusAmount}
              onBlur={handleBlurAmount}
              className={` w-full border-2 border-gray-400 border-l-0 rounded-r-lg 
                ${errorAmount && " border-2 border-red-600"} ${isFocusedAmount && " border-0"}`}
              theme={customThemeMortgageAmount}
            />
          </div>
          {errorAmount && (
            <div>
              <span className=" text-red-600 text-xs">This field is required</span>
            </div>
          )}
        </div>

        <div className=" flex flex-col gap-6 md:flex-row lg:gap-5">
          <div className=" flex flex-col gap-2 md:w-full">
            <Label htmlFor="mortgage_term" className="text-[hsl(200,26%,54%)]">
              Mortgage Term
            </Label>
            <div className=" flex">
              <TextInput
                type="number"
                name="mortgage_term"
                value={formData.mortgage_term}
                onChange={handleFormChange}
                onFocus={handleFocusYear}
                onBlur={handleBlurYear}
                className={` w-full border-2 border-gray-400 border-r-0 rounded-l-lg 
                  ${errorTerm && " border-2 border-red-600"} ${isFocusedYear && " border-0"}`}
                theme={customThemeTerm_Rate}
              />
              <Button 
                className={` w-16 pointer-events-none rounded-s-none bg-[hsl(202,86%,94%)] border-2 border-l-0 border-gray-400 
                  text-[hsl(200,26%,54%)] font-bold transition-none ${isFocusedYear ? "bg-[hsl(61,70%,52%)] text-[hsl(202,56%,12%)] border-none" 
                  : `${errorTerm && "bg-red-600 text-white border border-red-600"}`}
                `} 
              >
                years
              </Button>
            </div>
            {errorTerm && (
              <div>
                <span className=" text-red-600 text-xs">This field is required</span>
              </div>
            )}
          </div>

          <div className=" flex flex-col gap-2 md:w-full">
            <Label htmlFor="interest_rate" className="text-[hsl(200,26%,54%)]">
              Interest Rate
            </Label>
            <div className=" flex">
              <TextInput
                type="number"
                name="interest_rate"
                value={formData.interest_rate}
                onChange={handleFormChange}
                onFocus={handleFocusRate}
                onBlur={handleBlurRate}
                className={` w-full border-2 border-gray-400 border-r-0 rounded-l-lg 
                  ${errorRate && " border-2 border-red-600"} ${isFocusedRate && " border-0"}`}
                theme={customThemeTerm_Rate}
              />
              <Button 
                className={` w-10 pointer-events-none rounded-s-none bg-[hsl(202,86%,94%)] border-2 border-l-0 border-gray-400 
                  text-[hsl(200,26%,54%)] font-bold transition-none ${isFocusedRate ? "bg-[hsl(61,70%,52%)] text-[hsl(202,56%,12%)] border-none" 
                  : `${errorRate && "bg-red-600 text-white border border-red-600"}`}
                `}
              >
                &#37;
              </Button>
            </div>
            {errorRate && (
              <div>
                <span className=" text-red-600 text-xs">This field is required</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-[hsl(200,26%,54%)] mb-2">Mortgage Type</p>
          <div className=" flex flex-col gap-2">
            <div
              className={`flex items-center border-2 border-gray-400 h-10 rounded-md cursor-pointer hover:border-[hsl(61,75%,80%)] 
                ${formData.mortgage_type === "repayment" ? "bg-[hsl(61,74%,85%)] border-none outline outline-2 outline-[hsl(61,70%,52%)] ": ""}
              `}
            >
              <Radio
                type="radio"
                name="mortgage_type"
                id="repayment"
                value="repayment"
                checked={selectedOption}
                onChange={handleFormChange}
                className="hidden peer "
              />
              <span
                class="w-4 h-4 mx-4 rounded-full border-2 border-gray-300 peer-checked:w-3 peer-checked:h-3 peer-checked:ring peer-checked:ring-white 
                            peer-checked:border-none peer-checked:bg-[hsl(61,70%,52%)] peer-checked:outline peer-checked:outline-offset-2
                            peer-checked:outline-[hsl(61,70%,52%)] relative flex items-center justify-center"
              ></span>
              <Label htmlFor="repayment" className=" font-bold w-full">
                Repayment
              </Label>
            </div>

            <div
              className={`flex items-center border-2 border-gray-400 h-10 rounded-md cursor-pointer hover:border-[hsl(61,75%,80%)]
                ${formData.mortgage_type === "interest_only"? "bg-[hsl(61,74%,85%)] border-none outline outline-2 outline-[hsl(61,70%,52%)]": ""} 
              `}
            >
              <Radio
                type="radio"
                name="mortgage_type"
                id="interest_only"
                value="interest_only"
                checked={selectedOption}
                onChange={handleFormChange}
                className="hidden peer"
              />
              <span
                class="w-4 h-4 mx-4 rounded-full border-2 border-gray-300 peer-checked:w-3 peer-checked:h-3 peer-checked:ring peer-checked:ring-white 
                            peer-checked:border-none peer-checked:bg-[hsl(61,70%,52%)] peer-checked:outline peer-checked:outline-offset-2
                            peer-checked:outline-[hsl(61,70%,52%)] relative flex items-center justify-center"
              ></span>

              <Label htmlFor="interest_only" className=" font-bold w-full">
                Interest Only
              </Label>
            </div>

            {errorType && (
              <div>
                <span className=" text-red-600 text-xs">This field is required</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          onClick={handlesubmit}
          className={`inline-flex justify-center items-center gap-3 font-bold bg-[hsl(61,70%,52%)] h-10 rounded-full lg:w-[275px] hover:bg-[hsl(61,75%,80%)] `}
        >
          <Image src={icon_calculator} alt="calculator icon" />
          Calculate Repayments
        </button>
      </form>

      {/* Display the result of the calculation */}
      <div className=" flex bg-[hsl(202,55%,16%)] py-8 px-9 lg:w-[448px] lg:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-2xl lg:rounded-bl-[70px] ">
        {isSubmittedWithRepayment || isSubmittedWithInterest ? (
          <div className=" text-white ">
            <h1 className=" text-xl ">Your results</h1>
            <p className=" text-[hsl(200,26%,54%)] my-6">
              
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
            <div className=" py-5 px-5 lg:px-8 w-full bg-[hsl(202,56%,12%)] border-t-4 border-[hsl(61,70%,52%)] rounded-lg">
              <p className=" text-[hsl(200,26%,54%)]">
                Your monthly repayments
              </p>
              <p className=" mt-4 text-3xl text-[hsl(61,70%,52%)] lg:text-5xl font-bold">
                <span>&pound;</span>
                <span>
                  {isSubmittedWithRepayment ? (
                    <>{monthly_repayment}</>
                  ) : (
                    <>{interest_only}</>
                  )}
                </span>
              </p>
              {/* divider */}
              <div className=" my-4 lg:my-8 h-[1px] bg-slate-700"></div>
              <p className=" my-2 text-[hsl(200,26%,54%)]">
                Total you&apos;ll repay over the term
              </p>
              <p className=" text-xl">
                <span>&pound;</span>
                <span>
                  {isSubmittedWithRepayment ? (
                    <>{totalTermInRepayment}</>
                  ) : (
                    <>{totalInterestOnly}</>
                  )}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col items-center justify-center">
            {/* when the form is empty and in initial state, display this message. */}
            <Image src={illustration_empty} alt="empty illustration" />
            <h1 className="text-white text-xl lg:text-2xl font-bold my-5">
              Results shown here
            </h1>
            <p className=" text-[hsl(200,26%,54%)] text-center">
              Complete the form and click "calculate repayments" to see what
              your monthly repayments would be.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
