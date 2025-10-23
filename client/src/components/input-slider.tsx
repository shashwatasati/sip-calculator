import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useState, useEffect, type ChangeEvent } from "react";

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  testId?: string;
}

export function InputSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  testId,
}: InputSliderProps) {
  const [localValue, setLocalValue] = useState(value.toString());

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9.]/g, "");
    setLocalValue(inputValue);
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(localValue) || min;
    const clampedValue = Math.min(Math.max(numValue, min), max);
    onChange(clampedValue);
    setLocalValue(clampedValue.toString());
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium" data-testid={`label-${testId}`}>
          {label}
        </Label>
        <div className="flex items-center gap-2">
          {prefix && <span className="text-sm text-muted-foreground">{prefix}</span>}
          <Input
            type="text"
            value={localValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-28 text-right"
            data-testid={`input-${testId}`}
          />
          {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
        data-testid={`slider-${testId}`}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{prefix}{formatNumber(min)}{suffix}</span>
        <span>{prefix}{formatNumber(max)}{suffix}</span>
      </div>
    </div>
  );
}

function formatNumber(value: number): string {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(0)}Cr`;
  }
  if (value >= 100000) {
    return `${(value / 100000).toFixed(0)}L`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
}
