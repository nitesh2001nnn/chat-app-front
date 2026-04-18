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
  onlineUsers: any[];
}

interface AuthProviderProps {
  children: ReactNode;
}

/* ---------- Context ---------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------- Provider ---------- */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
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

    const joinSession = () => {
      console.log("🚀 Joining session for user:", user);
      s.emit("join", user);
      s.emit("get_online_users");
    };

    console.log("🚀 socket.connect()");
    s.connect();

    // If the socket is already connected (e.g. from the login page session), 
    // the 'connect' event won't fire again. We must join manually.
    if (s.connected) {
      joinSession();
    }

    s.on("connect", () => {
      console.log("✅ connected:", s.id);
      joinSession();
    });

    s.on("online_users", (users: any[]) => {
      setOnlineUsers(users);
    });

    s.on("connect_error", (err) => {
      console.error("❌ connect error:", err.message);
    });

    return () => {
      s.off("connect");
      s.off("online_users");
      s.off("connect_error");
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, socket: socketRef.current, setUser, onlineUsers }}
    >
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
