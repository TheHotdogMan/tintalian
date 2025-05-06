import React from 'react';
import { Match, Profile } from '../types';

interface MatchesViewProps {
  matches: Match[];
  profiles: Profile[];
}

const MatchesView: React.FC<MatchesViewProps> = ({ matches, profiles }) => {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] p-6 text-center">
        <div className="text-gray-400 text-9xl mb-4">🍝</div>
        <h3 className="text-2xl font-bold text-gray-700">No Matches Yet</h3>
        <p className="text-gray-500 mt-2">Keep swiping to find your Italian passion!</p>
      </div>
    );
  }

  // Sort matches by timestamp (newest first)
  const sortedMatches = [...matches].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {sortedMatches.map(match => {
          const profile = profiles.find(p => p.id === match.profileId);
          if (!profile) return null;
          
          return (
            <div 
              key={match.id} 
              className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-gray-500 text-sm">
                  Matched {new Date(match.timestamp).toLocaleDateString()}
                </p>
              </div>
              
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium hover:bg-red-100 transition-colors">
                Chat
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchesView;