"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as React from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  label,
  disabled,
  minDate,
  maxDate,
  className,
}: Omit<DatePickerProps, "withTime">) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <label className="text-sm font-medium mb-1">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            {value ? format(value, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            disabled={disabled}
            fromDate={minDate}
            toDate={maxDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DatePickerField({
  field,
  ...props
}: Omit<DatePickerProps, "value" | "onChange" | "withTime"> & {
  field: {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
  };
}) {
  return (
    <DatePicker value={field.value} onChange={field.onChange} {...props} />
  );
}

// TimePicker: Only time selection
export interface TimePickerProps {
  value: string | undefined;
  onChange: (time: string | undefined) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
  label,
  disabled,
  className,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <label className="text-sm font-medium mb-1">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            {value || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Input
            type="time"
            value={value || ""}
            onChange={(e) => {
              onChange(e.target.value || undefined);
              setOpen(false);
            }}
            autoFocus
            className="w-32"
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function TimePickerField({
  field,
  ...props
}: Omit<TimePickerProps, "value" | "onChange"> & {
  field: {
    value: string | undefined;
    onChange: (time: string | undefined) => void;
  };
}) {
  return (
    <TimePicker value={field.value} onChange={field.onChange} {...props} />
  );
}
