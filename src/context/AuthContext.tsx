import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DemoUser, ExpeditionMission, UserRole } from '../types';
import { DEMO_USERS, PRIMARY_DEMO_EXPEDITION } from '../data/demoData';

interface AuthContextType {
  currentUser: DemoUser;
  currentExpedition: ExpeditionMission;
  isAuthenticated: boolean;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  loginWithRole: (role: UserRole) => string;
  logout: () => void;
  lastSyncTime: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('command-center');
  const [currentUser, setCurrentUser] = useState<DemoUser>(DEMO_USERS['command-center']);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  useEffect(() => {
    // Update active user when role changes
    if (DEMO_USERS[selectedRole]) {
      setCurrentUser(DEMO_USERS[selectedRole]);
    }
  }, [selectedRole]);

  // Determine route based on role
  const getRoleRoute = (role: UserRole): string => {
    switch (role) {
      case 'command-center':
      case 'expedition-officer':
        return '/command-center';
      case 'field-team':
        return '/field-mode';
      case 'researcher':
        return '/researcher';
      default:
        return '/command-center';
    }
  };

  const loginWithRole = (role: UserRole): string => {
    setSelectedRole(role);
    setCurrentUser(DEMO_USERS[role] || DEMO_USERS['command-center']);
    setIsAuthenticated(true);
    setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    return getRoleRoute(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentExpedition: PRIMARY_DEMO_EXPEDITION,
        isAuthenticated,
        selectedRole,
        setSelectedRole,
        loginWithRole,
        logout,
        lastSyncTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
