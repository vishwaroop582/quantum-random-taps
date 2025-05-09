
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { List } from 'lucide-react';

interface HistoryLogProps {
  history: Array<{
    id: string;
    number?: number;
    numbers?: number[];
    min: number;
    max: number;
    timestamp: Date;
  }>;
  onClearHistory: () => void;
}

const HistoryLog: React.FC<HistoryLogProps> = ({ history, onClearHistory }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">History</CardTitle>
        {history.length > 0 && (
          <button 
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={onClearHistory}
          >
            Clear
          </button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] rounded-md border p-2">
          {history.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground italic">
              No history yet
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="p-2 rounded-md border flex items-center justify-between bg-background/50"
                >
                  <div className="flex items-center gap-2">
                    {item.number !== undefined ? (
                      <Badge variant="outline" className="bg-primary/10">
                        {item.number}
                      </Badge>
                    ) : item.numbers && item.numbers.length > 0 ? (
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="bg-primary/10 flex items-center gap-1">
                          <List className="h-3 w-3" /> 
                          {item.numbers.length}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                          [{item.numbers.slice(0, 3).join(', ')}{item.numbers.length > 3 ? '...' : ''}]
                        </span>
                      </div>
                    ) : null}
                    <span className="text-xs text-muted-foreground">
                      Range: {item.min}-{item.max}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HistoryLog;
