
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clipboard } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from '@/components/ui/use-toast';

interface MultipleNumbersDisplayProps {
  numbers: number[] | null;
  isLoading: boolean;
}

const MultipleNumbersDisplay: React.FC<MultipleNumbersDisplayProps> = ({ numbers, isLoading }) => {
  const { toast } = useToast();

  const handleCopyAll = async () => {
    if (!numbers || numbers.length === 0) return;
    
    const numbersText = numbers.join(', ');
    const success = await copyToClipboard(numbersText);
    
    if (success) {
      toast({
        title: "Copied!",
        description: `All numbers copied to clipboard.`,
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

  const handleCopySingle = async (number: number) => {
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
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Generated Random Numbers</CardTitle>
        {numbers && numbers.length > 1 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopyAll} 
            className="text-xs flex items-center gap-1"
          >
            <Clipboard className="h-3 w-3" />
            Copy All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[150px]">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center animate-pulse">
              <div className="h-6 w-6 rounded-full bg-white/50 animate-pulse"></div>
            </div>
            <p className="text-muted-foreground mt-4">Generating quantum randomness...</p>
          </div>
        ) : (
          <ScrollArea className="h-[200px] w-full pr-4">
            {!numbers || numbers.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground italic">
                No numbers generated yet
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {numbers.map((number, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="py-3 px-3 flex justify-between items-center bg-background hover:bg-accent group cursor-pointer quantum-container"
                    onClick={() => handleCopySingle(number)}
                  >
                    <div className="quantum-particle opacity-30" style={{ left: '20%', top: '30%' }}></div>
                    <div className="quantum-particle opacity-30" style={{ left: '75%', top: '60%', animationDelay: '0.5s' }}></div>
                    <span className="text-sm font-medium">{number}</span>
                    <Clipboard className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Badge>
                ))}
              </div>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default MultipleNumbersDisplay;
