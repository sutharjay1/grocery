import React from "react";
import { cn } from "@/lib/utils";

const Stepper = ({ steps, currentStep, setCurrentStep }) => {
  const getStepColor = (index) => {
    switch (index) {
      case 0:
        return "border-purple-500 bg-purple-500 text-white"; // Color for the 1st step
      case 1:
        return "border-green-500 bg-green-500 text-white"; // Color for the 2nd step
      case 2:
        return "border-sky-500 bg-sky-500 text-white"; // Color for the 3rd step
      default:
        return "border-muted-foreground bg-background text-muted-foreground"; // Default color
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <button
            onClick={() => setCurrentStep(index)}
            className={cn(
              "flex flex-col items-center text-center",
              index <= currentStep ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-colors duration-300",
                index === currentStep
                  ? getStepColor(index)
                  : index < currentStep
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-muted-foreground bg-background text-muted-foreground",
              )}
            ></div>
            <span className="mt-2 text-xs font-medium">{step}</span>
          </button>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "mb-5 h-[2px] flex-1 transition-colors duration-300",
                index < currentStep ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
