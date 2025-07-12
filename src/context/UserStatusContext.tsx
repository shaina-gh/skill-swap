import { createContext, useContext, useState, ReactNode } from "react";

interface UserStatusContextType {
  userStatuses: Record<string, string>;
  updateUserStatus: (userId: string, status: string) => void;
}

const UserStatusContext = createContext<UserStatusContextType | null>(null);

export function UserStatusProvider({ children }: { children: ReactNode }) {
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>({});

  const updateUserStatus = (userId: string, status: string) => {
    setUserStatuses(prev => ({
      ...prev,
      [userId]: status
    }));
  };

  return (
    <UserStatusContext.Provider value={{ userStatuses, updateUserStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
}

export const useUserStatus = () => {
  const context = useContext(UserStatusContext);
  if (!context) {
    throw new Error('useUserStatus must be used within a UserStatusProvider');
  }
  return context;
};