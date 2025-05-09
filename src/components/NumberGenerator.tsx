
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import RangeSelector from './RangeSelector';
import NumberDisplay from './NumberDisplay';
import HistoryLog from './HistoryLog';
import AboutQuantum from './AboutQuantum';
import MultipleNumbersDisplay from './MultipleNumbersDisplay';
import { generateQuantumRandomNumbers, checkQuantumApiAvailability } from '@/services/quantumService';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoryItem {
  id: string;
  number: number;
  min: number;
  max: number;
  timestamp: Date;
}

const NumberGenerator: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [currentNumbers, setCurrentNumbers] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isQuantumAvailable, setIsQuantumAvailable] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<string>("single");
  const { toast } = useToast();

  // Check quantum API availability on component mount
  useEffect(() => {
    const checkApi = async () => {
      const available = await checkQuantumApiAvailability();
      setIsQuantumAvailable(available);
      
      if (!available) {
        toast({
          title: "Using Fallback Method",
          description: "Quantum API not available. Using pseudo-random generation as fallback.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };
    
    checkApi();
  }, [toast]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setCurrentNumber(null);
    setCurrentNumbers(null);
    
    try {
      const numbers = await generateQuantumRandomNumbers(minValue, maxValue, quantity);
      
      if (activeTab === "single") {
        setCurrentNumber(numbers[0]);
        
        // Add to history
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          number: numbers[0],
          min: minValue,
          max: maxValue,
          timestamp: new Date(),
        };
        
        setHistory(prev => [newHistoryItem, ...prev].slice(0, 20)); // Keep last 20 items
      } else {
        setCurrentNumbers(numbers);
      }
    } catch (error) {
      console.error('Error generating number:', error);
      toast({
        title: "Generation Error",
        description: "Failed to generate quantum random number. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentNumber(null);
    setCurrentNumbers(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <RangeSelector
            minValue={minValue}
            maxValue={maxValue}
            quantity={quantity}
            onMinChange={setMinValue}
            onMaxChange={setMaxValue}
            onQuantityChange={setQuantity}
          />
          <div className="flex flex-col items-center">
            <Button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all py-6 text-lg relative overflow-hidden quantum-container"
            >
              {/* Quantum particles for animation */}
              <div className="quantum-particle" style={{ left: '20%', top: '20%' }}></div>
              <div className="quantum-particle" style={{ left: '60%', top: '60%', animationDelay: '0.7s' }}></div>
              <div className="quantum-particle" style={{ left: '80%', top: '20%', animationDelay: '1.3s' }}></div>
              
              {isLoading ? 'Generating...' : `Generate ${quantity > 1 && activeTab === "multiple" ? quantity : ''} Quantum Random ${quantity > 1 && activeTab === "multiple" ? 'Numbers' : 'Number'}`}
            </Button>
            
            {isQuantumAvailable === false && (
              <div className="text-xs text-amber-500 mt-2">
                Using pseudo-random fallback (Quantum API unavailable)
              </div>
            )}
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Single Number</TabsTrigger>
              <TabsTrigger value="multiple">Multiple Numbers</TabsTrigger>
            </TabsList>
            <TabsContent value="single">
              <NumberDisplay number={currentNumber} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="multiple">
              <MultipleNumbersDisplay numbers={currentNumbers} isLoading={isLoading} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <HistoryLog history={history} onClearHistory={handleClearHistory} />
          <AboutQuantum />
        </div>
      </div>
    </div>
  );
};

export default NumberGenerator;
