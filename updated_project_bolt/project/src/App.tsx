import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CardDeck from './components/CardDeck';
import MatchModal from './components/MatchModal';
import MatchesView from './components/MatchesView';
import ProfileView from './components/ProfileView';
import { profiles } from './data/profiles';
import { Profile, Match } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('swipe');
  const [currentMatch, setCurrentMatch] = useState<Profile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [shuffledProfiles, setShuffledProfiles] = useState<Profile[]>([]);

  // Shuffle profiles on first load
  useEffect(() => {
    setShuffledProfiles([...profiles].sort(() => Math.random() - 0.5));
  }, []);

  const handleMatch = (profile: Profile) => {
    // Create a new match
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      profileId: profile.id,
      timestamp: Date.now(),
    };
    
    setMatches(prevMatches => [...prevMatches, newMatch]);
    setCurrentMatch(profile);
  };

  const handleOutOfCards = () => {
    // Reshuffle when out of cards
    setShuffledProfiles([...profiles].sort(() => Math.random() - 0.5));
  };

  const closeMatchModal = () => {
    setCurrentMatch(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Header />
      
      <main className="max-w-md mx-auto p-4">
        {activeTab === 'swipe' && (
          <CardDeck 
            profiles={shuffledProfiles} 
            onMatch={handleMatch}
            onOutOfCards={handleOutOfCards}
          />
        )}
        
        {activeTab === 'matches' && (
          <MatchesView matches={matches} profiles={profiles} />
        )}
        
        {activeTab === 'profile' && (
          <ProfileView />
        )}
      </main>
      
      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Match Modal */}
      <MatchModal profile={currentMatch} onClose={closeMatchModal} />
    </div>
  );
}

export default App;