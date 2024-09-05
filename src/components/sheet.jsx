import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Assuming you're using this for the close icon
import { cn, useOnClickOutside } from "../lib/utils";
import { Button } from "./ui/button";

// Main Sheet Component
const Sheet = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSheet = () => setIsOpen(!isOpen);

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { toggleSheet, isOpen }),
      )}
    </>
  );
};

// Overlay Component
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <div
    className={cn(
      "fixed inset-0 z-40 bg-black/80 transition-opacity duration-300",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = "SheetOverlay";

// Content Component with Framer Motion
const SheetContent = ({ children, isOpen, toggleSheet, side = "right" }) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => isOpen && toggleSheet());

  const variants = {
    open: { x: 0, opacity: 1 },
    closed: {
      x: side === "left" ? "-100%" : "100%",
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SheetOverlay />
          <motion.div
            ref={ref}
            className={`fixed inset-y-0 ${side}-0 z-50 h-full w-full border-l border-zinc-900/40 bg-background p-6 shadow-lg transition-transform sm:max-w-md`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.04, ease: "linear" }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSheet}
              className="absolute right-6 top-6 rounded-md bg-black/5 p-2 opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Trigger Component
const SheetTrigger = ({ children, toggleSheet }) => (
  <button onClick={toggleSheet} className="">
    {children}
  </button>
);

// Header Component
const SheetHeader = ({ children }) => (
  <div className="mb-4 flex flex-col space-y-2 text-center sm:text-left">
    {children}
  </div>
);

// Title Component
const SheetTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-foreground">{children}</h2>
);

// Description Component
const SheetDescription = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Title = SheetTitle;
Sheet.Description = SheetDescription;

export default Sheet;
