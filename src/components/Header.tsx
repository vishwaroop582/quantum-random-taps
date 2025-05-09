
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Quantum Random
          </h1>
        </div>
        <div className="text-sm text-muted-foreground">
          True randomness through quantum mechanics
        </div>
      </div>
    </header>
  );
};

export default Header;
