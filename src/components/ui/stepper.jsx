// import React from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { Button } from "./button";

// const Stepper = ({ steps, currentStep, setCurrentStep }) => {
//   return (
//     <div className="flex w-full items-center">
//       {steps.map((step, index) => (
//         <React.Fragment key={index}>
//           <li
//             className={`flex w-full items-center ${
//               index < steps.length - 1
//                 ? "after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-gray-100 after:content-[''] dark:after:border-gray-700"
//                 : ""
//             } ${
//               index === currentStep
//                 ? "text-blue-600 dark:text-blue-500"
//                 : "text-gray-500 dark:text-gray-100"
//             }`}
//           >
//             <span
//               className={`flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12 ${
//                 index === currentStep
//                   ? "bg-blue-100 dark:bg-blue-800"
//                   : "bg-gray-100 dark:bg-gray-700"
//               } shrink-0`}
//             >
//               {/* Replace with the appropriate SVG for each step if needed */}
//               <svg
//                 className={`h-4 w-4 lg:h-5 lg:w-5 ${
//                   index === currentStep
//                     ? "text-blue-600 dark:text-blue-300"
//                     : "text-gray-500 dark:text-gray-100"
//                 }`}
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 16"
//               >
//                 {/* Replace with the appropriate path data for each step */}
//                 <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
//               </svg>
//             </span>
//           </li>
//           {index < steps.length - 1 && (
//             <span
//               className={`flex-grow border-t ${
//                 index < currentStep
//                   ? "border-blue-600 dark:border-blue-500"
//                   : "border-gray-200 dark:border-gray-700"
//               }`}
//             ></span>
//           )}
//         </React.Fragment>
//       ))}
//       <Button
//         onClick={() => setCurrentStep(currentStep - 1)}
//         disabled={currentStep === 0}
//         className="rounded-md bg-gray-200 p-2 disabled:opacity-50"
//       >
//         <FaArrowLeft className="text-gray-700" />
//       </Button>
//       <Button
//         onClick={() => setCurrentStep(currentStep + 1)}
//         disabled={currentStep === steps.length - 1}
//         className="rounded-md bg-gray-200 p-2 disabled:opacity-50"
//       >
//         <FaArrowRight className="text-gray-700" />
//       </Button>
//     </div>
//   );
// };

// export default Stepper;

import React from "react";
import { cn } from "@/lib/utils";

const Stepper = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={index} >
          <button
            onClick={() => setCurrentStep(index)}
            className={cn(
              "flex flex-col items-center text-center",
              index <= currentStep ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300",
                index === currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : index < currentStep
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-muted-foreground bg-background text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-xs font-medium">{step}</span>
          </button>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-[2px] flex-1  transition-colors duration-300",
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
