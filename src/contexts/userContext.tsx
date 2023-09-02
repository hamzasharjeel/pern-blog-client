import React, { useState, useEffect, useContext } from "react";

interface userInterFace {
  
    token: String | null;
    msg: String;
    user: {
      name: String;
      password: String;
      email: String;
      id: Number;
      isAdmin: boolean;
    };

}
interface UserContextType {
  user: userInterFace | null;
  setUser: (user: userInterFace | null) => void;
}
interface userProviderInterFace {
  children: React.ReactNode;
}

const userContext = React.createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<userProviderInterFace> = ({
  children,
}) => {
  const [user, setUser] = useState<userInterFace | null>(() => {
    const storedUser = localStorage.getItem("newUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("newUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("newUsers");
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("iam error");
  }
  return context;
};
