import React from 'react';
import { Profile, SwipeDirection } from '../types';
import { useSwipe } from '../hooks/useSwipe';
import { Heart, X } from 'lucide-react';

interface CardProps {
  profile: Profile;
  onSwipe: (direction: SwipeDirection) => void;
  isActive: boolean;
}

const Card: React.FC<CardProps> = ({ profile, onSwipe, isActive }) => {
  const { cardRef, cardStyle, eventHandlers, isDragging } = useSwipe({
    onSwipe,
    swipeThreshold: 100,
  });

  // Calculate if we're swiping right or left to show appropriate indicator
  const swipeDirection = cardStyle.transform
    ? (cardStyle.transform as string).includes('translate(') 
      ? parseFloat((cardStyle.transform as string).split('translate(')[1]) > 0
        ? 'right'
        : 'left'
      : null
    : null;

  return (
    <div
      ref={cardRef}
      className={`absolute w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl bg-white 
        ${isActive ? 'z-10' : 'z-0'} 
        ${!isActive && 'pointer-events-none'}`}
      style={isActive ? cardStyle : {}}
      {...(isActive ? eventHandlers : {})}
    >
      <div className="relative">
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="w-full h-96 object-cover"
        />
        
        {/* Swipe indicators */}
        {isDragging && swipeDirection === 'right' && (
          <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full p-3 transform rotate-[-15deg]">
            <Heart size={32} />
          </div>
        )}
        
        {isDragging && swipeDirection === 'left' && (
          <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 transform rotate-[15deg]">
            <X size={32} />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h2 className="text-3xl font-bold">{profile.name}, {profile.age}</h2>
          <p className="text-sm opacity-75">{profile.distance} km away</p>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <p className="text-gray-700">{profile.bio}</p>
      </div>
      
      <div className="flex justify-between p-4 bg-gray-50 border-t border-gray-200">
        <button 
          onClick={() => onSwipe('left')}
          className="p-3 rounded-full bg-white text-red-500 shadow-md hover:bg-red-50 transition-colors"
        >
          <X size={28} />
        </button>
        
        <button 
          onClick={() => onSwipe('right')}
          className="p-3 rounded-full bg-white text-green-500 shadow-md hover:bg-green-50 transition-colors"
        >
          <Heart size={28} />
        </button>
      </div>
    </div>
  );
};

export default Card;