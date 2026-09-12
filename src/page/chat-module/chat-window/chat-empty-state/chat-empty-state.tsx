import React from "react";
import { useLocation } from "react-router-dom";
import "./chat-empty-state.scss";

interface ChatEmptyStateProps {
  customTitle?: string;
  customSubtitle?: string;
  fallbackImageSrc?: string;
}

const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({
  customTitle,
  customSubtitle,
  fallbackImageSrc,
}) => {
  const { pathname } = useLocation();

  const isContactPage = pathname.includes("/contact");
  const isChatsPage = pathname.includes("/chats");

  // Dynamic context-based titles and descriptions
  const title =
    customTitle ||
    (isContactPage
      ? "Connect with Contacts"
      : isChatsPage
        ? "Select a Conversation"
        : "Welcome to Chat App");

  const subtitle =
    customSubtitle ||
    (isContactPage
      ? "Select a contact from the list on the left to view profile details and start a conversation."
      : isChatsPage
        ? "Choose an existing chat from the left sidebar or start a new conversation with your contacts."
        : "Send and receive messages seamlessly with end-to-end encryption.");

  const tipText = isContactPage
    ? "Click on any contact to chat"
    : "Pick a chat to start messaging";

  return (
    <div className="chat-empty-state">
      <div className="empty-state-content">
        <div className="illustration-wrapper">
          {fallbackImageSrc ? (
            <img
              src={fallbackImageSrc}
              alt="No chat selected"
              className="illustration-img"
            />
          ) : (
            <svg
              className="illustration-svg"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft decorative background circles */}
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="url(#circleGradient)"
                opacity="0.5"
              />
              <circle
                cx="146"
                cy="58"
                r="6"
                fill="#38bdf8"
                opacity="0.6"
              />
              <circle
                cx="48"
                cy="132"
                r="4"
                fill="#135caf"
                opacity="0.4"
              />
              <circle
                cx="156"
                cy="138"
                r="5"
                fill="#6366f1"
                opacity="0.4"
              />

              {/* Main chat bubble (blue gradient) */}
              <g filter="url(#shadowMain)">
                <rect
                  x="45"
                  y="52"
                  width="92"
                  height="66"
                  rx="16"
                  fill="url(#mainBubbleGradient)"
                />
                <path
                  d="M58 118L44 128V118H58Z"
                  fill="#135caf"
                />
                {/* Chat lines placeholder inside main bubble */}
                <rect x="60" y="70" width="62" height="6" rx="3" fill="#ffffff" opacity="0.9" />
                <rect x="60" y="84" width="44" height="6" rx="3" fill="#ffffff" opacity="0.75" />
                <rect x="60" y="98" width="50" height="5" rx="2.5" fill="#ffffff" opacity="0.5" />
              </g>

              {/* Secondary overlapping chat bubble (cyan/teal gradient) */}
              <g filter="url(#shadowSecondary)">
                <rect
                  x="85"
                  y="86"
                  width="78"
                  height="54"
                  rx="14"
                  fill="url(#secondaryBubbleGradient)"
                />
                <path
                  d="M148 140L158 148V140H148Z"
                  fill="#0284c7"
                />
                {/* Typing indicator dots */}
                <circle cx="109" cy="113" r="3.5" fill="#ffffff" />
                <circle cx="124" cy="113" r="3.5" fill="#ffffff" opacity="0.85" />
                <circle cx="139" cy="113" r="3.5" fill="#ffffff" opacity="0.7" />
              </g>

              {/* Subtle spark / star icon */}
              <path
                d="M52 42L54 48L60 50L54 52L52 58L50 52L44 50L50 48L52 42Z"
                fill="#38bdf8"
              />
              <path
                d="M152 76L153.5 80.5L158 82L153.5 83.5L152 88L150.5 83.5L146 82L150.5 80.5L152 76Z"
                fill="#f59e0b"
                opacity="0.8"
              />

              <defs>
                <linearGradient
                  id="circleGradient"
                  x1="22"
                  y1="22"
                  x2="178"
                  y2="178"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#e0f2fe" />
                  <stop offset="1" stopColor="#ede9fe" stopOpacity="0.4" />
                </linearGradient>

                <linearGradient
                  id="mainBubbleGradient"
                  x1="45"
                  y1="52"
                  x2="137"
                  y2="118"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1e40af" />
                  <stop offset="1" stopColor="#135caf" />
                </linearGradient>

                <linearGradient
                  id="secondaryBubbleGradient"
                  x1="85"
                  y1="86"
                  x2="163"
                  y2="140"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0ea5e9" />
                  <stop offset="1" stopColor="#0284c7" />
                </linearGradient>

                <filter
                  id="shadowMain"
                  x="36"
                  y="48"
                  width="110"
                  height="90"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feDropShadow
                    dx="0"
                    dy="8"
                    stdDeviation="6"
                    floodColor="#0f172a"
                    floodOpacity="0.12"
                  />
                </filter>

                <filter
                  id="shadowSecondary"
                  x="77"
                  y="82"
                  width="92"
                  height="76"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feDropShadow
                    dx="0"
                    dy="6"
                    stdDeviation="5"
                    floodColor="#0284c7"
                    floodOpacity="0.2"
                  />
                </filter>
              </defs>
            </svg>
          )}
        </div>

        <h2 className="empty-state-title">{title}</h2>
        <p className="empty-state-description">{subtitle}</p>

        <div className="empty-state-badge">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
          </svg>
          <span>{tipText}</span>
        </div>
      </div>

      <div className="empty-state-footer">
        <svg viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
        <span>End-to-end encrypted</span>
      </div>
    </div>
  );
};

export default ChatEmptyState;
