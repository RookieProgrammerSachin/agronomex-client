import { auth } from "@/utils/firebaseConfig";
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { router } from "expo-router";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  error: null,
});

export function AuthContextProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-credential" || error.code === "auth/invalid-email") {
        setError("Invalid email or password");
      } else if (error.code === "auth/user-disabled") {
        setError("Your account has been disabled");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many failed login attempts. Please try again later");
      } else {
        setError("Failed to login. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to logout. Please try again");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}