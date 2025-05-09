
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RangeSelectorProps {
  minValue: number;
  maxValue: number;
  quantity: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  onQuantityChange: (value: number) => void;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({
  minValue,
  maxValue,
  quantity,
  onMinChange,
  onMaxChange,
  onQuantityChange,
}) => {
  // Handle direct input changes
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue < maxValue) {
      onMinChange(newValue);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue > minValue) {
      onMaxChange(newValue);
    }
  };

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 1;
    if (newValue >= 1 && newValue <= 100) {
      onQuantityChange(newValue);
    }
  };

  // Handle slider changes
  const handleMinSliderChange = (values: number[]) => {
    const newValue = values[0];
    if (newValue < maxValue) {
      onMinChange(newValue);
    }
  };

  const handleMaxSliderChange = (values: number[]) => {
    const newValue = values[0];
    if (newValue > minValue) {
      onMaxChange(newValue);
    }
  };

  const handleQuantitySliderChange = (values: number[]) => {
    const newValue = values[0];
    if (newValue >= 1 && newValue <= 100) {
      onQuantityChange(newValue);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Number Range</CardTitle>
        <CardDescription>Set your minimum and maximum values</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="minValue">Minimum Value</Label>
              <Input
                id="minValue"
                type="number"
                value={minValue}
                onChange={handleMinInputChange}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[minValue]}
              min={0}
              max={maxValue - 1}
              step={1}
              onValueChange={handleMinSliderChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="maxValue">Maximum Value</Label>
              <Input
                id="maxValue"
                type="number"
                value={maxValue}
                onChange={handleMaxInputChange}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[maxValue]}
              min={minValue + 1}
              max={999999}
              step={1}
              onValueChange={handleMaxSliderChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="quantity">Number of Random Numbers</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityInputChange}
                className="w-24 text-right"
              />
            </div>
            <Slider
              value={[quantity]}
              min={1}
              max={100}
              step={1}
              onValueChange={handleQuantitySliderChange}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RangeSelector;
