import React, { useEffect, useState } from 'react';
import { Profile } from '../types';
import { X, MessageCircle } from 'lucide-react';
import confetti from '../utils/confetti';

interface MatchModalProps {
  profile: Profile | null;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ profile, onClose }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (profile) {
      setAnimationClass('scale-100 opacity-100');
      // Trigger confetti effect
      confetti();
    } else {
      setAnimationClass('scale-90 opacity-0');
    }
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300">
      <div 
        className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-500 ${animationClass}`}
      >
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-red-600 mb-2">It's a Match!</h2>
          <p className="text-gray-600">You and {profile.name} have liked each other</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className="italic text-gray-700">"{profile.bio}"</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button className="py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold flex items-center justify-center">
            <MessageCircle size={20} className="mr-2" />
            Send a Message
          </button>
          
          <button onClick={onClose} className="py-3 px-6 border border-gray-300 text-gray-700 rounded-full font-semibold">
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;