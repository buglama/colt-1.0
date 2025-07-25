import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy: string | null;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string, phone: string) => Promise<void>;
  updateReferralCode: (referralCode: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUser: User = {
  id: '123',
  fullName: 'Fərid Hümbətov',
  email: 'thefeerid@proton.net',
  phone: '+994 (70) 814-5414',
  referralCode: 'FOOD123',
  referredBy: null,
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    if (isAuthenticated) return; // artıq login-disə, ikinci dəfə işə düşməsin
    await new Promise(resolve => setTimeout(resolve, 1000));

    setUser(initialUser);
    setIsAuthenticated(true);
  };

  const signup = async (fullName: string, email: string, password: string, phone: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const referralCode = `FOOD${Math.floor(1000 + Math.random() * 9000)}`;

    setUser({
      id: String(Date.now()),
      fullName,
      email,
      phone,
      referralCode,
      referredBy: null,
    });

    setIsAuthenticated(true);
  };

  const updateReferralCode = async (referralCode: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (user) {
      setUser({ ...user, referredBy: referralCode });
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        updateReferralCode,
        updateUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
