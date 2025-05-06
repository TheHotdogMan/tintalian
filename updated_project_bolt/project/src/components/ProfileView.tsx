import React from 'react';
import { User, Settings, MapPin, Calendar, Flag } from 'lucide-react';

const ProfileView: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <button className="p-2 rounded-full bg-gray-100 text-gray-700">
          <Settings size={20} />
        </button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-3">
          <User size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold">You</h3>
        <p className="text-gray-500">Swipe right to match with Italian stereotypes</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
        <h3 className="font-semibold mb-3 text-gray-800">About You</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin size={20} className="text-red-500 mr-3" />
            <div>
              <p className="text-gray-800">Location</p>
              <p className="text-gray-500 text-sm">Wherever Pizza is Served</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar size={20} className="text-blue-500 mr-3" />
            <div>
              <p className="text-gray-800">Member Since</p>
              <p className="text-gray-500 text-sm">Today</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Flag size={20} className="text-green-500 mr-3" />
            <div>
              <p className="text-gray-800">Italian Knowledge</p>
              <p className="text-gray-500 text-sm">Expert in pizza folding technique</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="font-semibold mb-3 text-gray-800">Preferences</h3>
        <p className="text-gray-600">You're currently set to discover Italian stereotypes and memes within 100km of your location.</p>
        
        <button className="mt-4 py-2 px-4 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors">
          Edit Preferences
        </button>
      </div>
    </div>
  );
};

export default ProfileView;