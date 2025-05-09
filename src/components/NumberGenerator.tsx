
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import RangeSelector from './RangeSelector';
import NumberDisplay from './NumberDisplay';
import HistoryLog from './HistoryLog';
import AboutQuantum from './AboutQuantum';
import { generateQuantumRandomNumbers, checkQuantumApiAvailability } from '@/services/quantumService';
import { useToast } from '@/components/ui/use-toast';

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
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isQuantumAvailable, setIsQuantumAvailable] = useState<boolean | null>(null);
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
    
    try {
      const numbers = await generateQuantumRandomNumbers(minValue, maxValue, 1);
      const generatedNumber = numbers[0];
      
      setCurrentNumber(generatedNumber);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        number: generatedNumber,
        min: minValue,
        max: maxValue,
        timestamp: new Date(),
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 20)); // Keep last 20 items
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

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <RangeSelector
            minValue={minValue}
            maxValue={maxValue}
            onMinChange={setMinValue}
            onMaxChange={setMaxValue}
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
              
              {isLoading ? 'Generating...' : 'Generate Quantum Random Number'}
            </Button>
            
            {isQuantumAvailable === false && (
              <div className="text-xs text-amber-500 mt-2">
                Using pseudo-random fallback (Quantum API unavailable)
              </div>
            )}
          </div>
          <NumberDisplay number={currentNumber} isLoading={isLoading} />
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
