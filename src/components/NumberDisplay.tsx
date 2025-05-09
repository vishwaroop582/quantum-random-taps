
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from '@/components/ui/use-toast';

interface NumberDisplayProps {
  number: number | null;
  isLoading: boolean;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ number, isLoading }) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    if (number === null) return;
    
    const success = await copyToClipboard(number.toString());
    
    if (success) {
      toast({
        title: "Copied!",
        description: `Number ${number} copied to clipboard.`,
        duration: 2000,
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full quantum-container">
      {/* Quantum particles decorative elements */}
      <div className="quantum-particle" style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
      <div className="quantum-particle" style={{ left: '30%', top: '60%', animationDelay: '0.5s' }}></div>
      <div className="quantum-particle" style={{ left: '65%', top: '30%', animationDelay: '1s' }}></div>
      <div className="quantum-particle" style={{ left: '80%', top: '70%', animationDelay: '1.5s' }}></div>
      <div className="quantum-particle" style={{ left: '50%', top: '40%', animationDelay: '2s' }}></div>
      
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[180px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center animate-pulse">
              <div className="h-8 w-8 rounded-full bg-white/50 animate-pulse"></div>
            </div>
            <p className="text-muted-foreground">Generating quantum randomness...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 w-full">
            <div className="text-5xl font-bold animate-float bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-blue-600">
              {number === null ? '?' : number}
            </div>
            <Button 
              variant="outline" 
              onClick={handleCopy}
              disabled={number === null}
              className="mt-4 transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Copy to Clipboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NumberDisplay;
