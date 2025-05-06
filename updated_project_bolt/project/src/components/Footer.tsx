import React from 'react';
import { User, Heart, MessageCircle } from 'lucide-react';

interface FooterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeTab, onTabChange }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-20">
      <div className="flex justify-around items-center p-4">
        <button 
          onClick={() => onTabChange('swipe')}
          className={`p-2 rounded-full ${activeTab === 'swipe' ? 'bg-red-100 text-red-600' : 'text-gray-500'}`}
        >
          <Heart size={24} />
        </button>
        
        <button 
          onClick={() => onTabChange('matches')}
          className={`p-2 rounded-full ${activeTab === 'matches' ? 'bg-red-100 text-red-600' : 'text-gray-500'}`}
        >
          <MessageCircle size={24} />
        </button>
        
        <button 
          onClick={() => onTabChange('profile')}
          className={`p-2 rounded-full ${activeTab === 'profile' ? 'bg-red-100 text-red-600' : 'text-gray-500'}`}
        >
          <User size={24} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;