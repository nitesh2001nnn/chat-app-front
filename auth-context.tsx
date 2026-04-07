import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import type { Socket } from "socket.io-client";
import { socket } from "./socket";
import { getLocalStorageObjDetails } from "./src/page/shared/helper/helper";

/* ---------- Types ---------- */

interface AuthContextType {
  user: string | null;
  socket: Socket | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

/* ---------- Context ---------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------- Provider ---------- */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  console.log("called", user, socketRef);

  // 1️⃣ Initialize socket ONCE
  useEffect(() => {
    socketRef.current = socket;
  }, []);

  // 2️⃣ Load user ONCE
  useEffect(() => {
    const raw = getLocalStorageObjDetails("userData");

    const parsed = raw && typeof raw === "string" ? JSON.parse(raw) : raw;

    const userId = parsed?.userID ?? null;

    setUser(userId); // 🔥 always runs
  }, []);

  // 3️⃣ Connect socket when user is available
  useEffect(() => {
    if (!user || !socketRef.current) return;

    const s = socketRef.current;
    console.log("User is here or nto", user);

    console.log("🚀 socket.connect()");
    s.connect();

    s.on("connect", () => {
      console.log("✅ connected:", s.id);
      s.emit("join", user);
    });

    s.on("connect_error", (err) => {
      console.error("❌ connect error:", err.message);
    });

    return () => {
      s.off("connect");
      s.off("connect_error");
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, socket: socketRef.current, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ---------- Hook ---------- */

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
