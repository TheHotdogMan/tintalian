import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Profile, SwipeDirection } from '../types';

interface CardDeckProps {
  profiles: Profile[];
  onMatch: (profile: Profile) => void;
  onOutOfCards: () => void;
}

const CardDeck: React.FC<CardDeckProps> = ({ profiles, onMatch, onOutOfCards }) => {
  const [currentProfiles, setCurrentProfiles] = useState<Profile[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Initialize with the first few profiles
    setCurrentProfiles(profiles.slice(0, 3));
  }, [profiles]);

  const handleSwipe = (direction: SwipeDirection) => {
    if (direction === 'right') {
      // It's a match!
      onMatch(currentProfiles[0]);
    }

    // Remove the top card
    setTimeout(() => {
      const nextProfiles = [...currentProfiles];
      nextProfiles.shift();
      
      // Add a new card if available
      const nextCardIndex = currentProfiles.length - 1 + activeIndex + 1;
      if (nextCardIndex < profiles.length) {
        nextProfiles.push(profiles[nextCardIndex]);
      }
      
      setCurrentProfiles(nextProfiles);
      setActiveIndex(activeIndex + 1);
      
      // Check if we're out of cards
      if (nextProfiles.length === 0) {
        onOutOfCards();
      }
    }, 300);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[540px]">
      {currentProfiles.length === 0 ? (
        <div className="flex h-full items-center justify-center bg-gray-100 rounded-2xl">
          <p className="text-gray-500 text-xl">No more profiles to show!</p>
        </div>
      ) : (
        currentProfiles.map((profile, index) => (
          <Card
            key={profile.id}
            profile={profile}
            onSwipe={handleSwipe}
            isActive={index === 0}
          />
        ))
      )}
    </div>
  );
};

export default CardDeck;