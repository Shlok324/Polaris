'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from './types';

interface AuthContextType {
  user: UserProfile;
  setRole: (role: UserProfile['role']) => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addPoints: (points: number, badgeName?: string) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isAIModalOpen: boolean;
  setIsAIModalOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: "usr-demo-01",
  email: "scientist@ncpor.res.in",
  full_name: "Dr. Ananya Roy",
  role: "researcher",
  institution: "National Centre for Polar and Ocean Research (NCPOR), Goa",
  knowledge_points: 650,
  badges: ["Antarctic Apprentice", "Ice Core Specialist", "Polaris Contributor"],
  bookmarked_ids: ["pub-01", "ds-01", "exp-isea-43"]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  const setRole = (role: UserProfile['role']) => {
    let name = "Dr. Ananya Roy";
    let institution = "National Centre for Polar and Ocean Research (NCPOR)";
    if (role === 'student') {
      name = "Aarav Sharma";
      institution = "School of Earth & Planetary Sciences, IIT Bombay";
    } else if (role === 'admin') {
      name = "Chief Portal Administrator";
      institution = "Ministry of Earth Sciences (MoES), New Delhi";
    } else if (role === 'educator') {
      name = "Prof. Meera Deshmukh";
      institution = "Polar Science Outreach Network";
    } else if (role === 'public') {
      name = "Public Explorer";
      institution = "Citizen Science Participant";
    }

    setUser(prev => ({
      ...prev,
      role,
      full_name: name,
      institution
    }));
  };

  const toggleBookmark = (id: string) => {
    setUser(prev => {
      const exists = prev.bookmarked_ids.includes(id);
      return {
        ...prev,
        bookmarked_ids: exists 
          ? prev.bookmarked_ids.filter(b => b !== id)
          : [...prev.bookmarked_ids, id]
      };
    });
  };

  const isBookmarked = (id: string) => user.bookmarked_ids.includes(id);

  const addPoints = (points: number, badgeName?: string) => {
    setUser(prev => {
      const newBadges = [...prev.badges];
      if (badgeName && !newBadges.includes(badgeName)) {
        newBadges.push(badgeName);
      }
      return {
        ...prev,
        knowledge_points: prev.knowledge_points + points,
        badges: newBadges
      };
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      setRole,
      toggleBookmark,
      isBookmarked,
      addPoints,
      isLoginModalOpen,
      setIsLoginModalOpen,
      isAIModalOpen,
      setIsAIModalOpen,
      globalSearchQuery,
      setGlobalSearchQuery
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
