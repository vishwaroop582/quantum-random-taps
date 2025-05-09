
import React from 'react';
import Header from '@/components/Header';
import NumberGenerator from '@/components/NumberGenerator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-accent/20">
      <Header />
      <main className="flex-1">
        <NumberGenerator />
      </main>
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Quantum Random Number Generator © {new Date().getFullYear()}</p>
          <p className="text-xs mt-1">
            Powered by quantum mechanics and the ANU Quantum Random Numbers API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
