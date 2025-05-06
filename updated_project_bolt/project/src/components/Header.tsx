import React from 'react';
import { Pizza } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-20 p-4 flex items-center justify-center">
      <div className="flex items-center">
        <Pizza size={32} className="text-red-600 mr-2" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-white to-red-600 bg-clip-text text-transparent">
          BramorItalia
        </h1>
      </div>
    </header>
  );
};

export default Header;