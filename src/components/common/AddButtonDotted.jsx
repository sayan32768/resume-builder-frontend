import React from "react";
import { Button } from "../ui/button";

const AddButtonDotted = ({ onClick, text }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className="w-full h-24 border-2 border-dashed border-gray-400 
                       flex items-center justify-center text-gray-500 
                       hover:border-gray-600 hover:text-gray-700 
                       rounded-m"
    >
      {text}
    </Button>
  );
};

export default AddButtonDotted;
