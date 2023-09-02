import { createContext, useState, useEffect, useContext } from "react";

interface Profile {
  status: Number,
  statusText: any,
  data: {
    profile: {
        status: String;
        age: String;
        profesion: String;
      };
  }
}

interface profileContextType {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

interface ProfileContextProviderInterface {
  children: React.ReactNode;
}
const profileContext = createContext<profileContextType | null>(null);

export const ProfileContextProvider: React.FC<
  ProfileContextProviderInterface
> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);
  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("profile");
    }
  }, [profile]);
  return (
    <profileContext.Provider value={{ profile, setProfile }}>
      {children}
    </profileContext.Provider>
  );
};
export const useProfile = (): profileContextType => {
  const context = useContext(profileContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
