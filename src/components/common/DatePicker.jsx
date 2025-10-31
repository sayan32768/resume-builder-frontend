"use client";

import * as React from "react";
import { ChevronDownIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ field }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="justify-between font-normal hover:cursor-pointer"
        >
          {field.value
            ? new Date(field.value).toLocaleDateString()
            : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto overflow-hidden p-0 bg-white border rounded-lg shadow-md"
        align="start"
      >
        <div className="flex flex-col">
          <Calendar
            endMonth={new Date(2050, 12)}
            key={field.value ? field.value.toString() : "no-date"}
            mode="single"
            selected={field.value}
            captionLayout="dropdown"
            onSelect={(date) => {
              field.onChange(date);
              setOpen(false);
            }}
          />

          <Button
            variant="outline"
            className="m-3"
            onClick={() => {
              field.onChange(null);
              setOpen(false);
            }}
          >
            Reset
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
