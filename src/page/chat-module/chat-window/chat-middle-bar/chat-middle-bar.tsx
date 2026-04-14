import { forwardRef, use, useEffect, useRef, useState } from "react";
import { getLocalStorageObjDetails } from "../../../shared/helper/helper";
import "./chat-middle-bar.scss";
import React from "react";

type chatMiddleBar = {
  id: number;
  message_text: string;
  incoming_msg: string;
  sender_id: number;
};
interface chatMiddleBarProps {
  value: chatMiddleBar[];
  chatId: number;
}

const ChatMiddleBar = ({ value, chatId }: chatMiddleBarProps) => {
  const userID = JSON.parse(getLocalStorageObjDetails("userData")).userID;
  const bottomRef = useRef<any>(null);
  const initialRef = useRef(null);

  useEffect(() => {
    if (!bottomRef.current) return;

    if (initialRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
      initialRef.current = false;
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [value]);

  useEffect(() => {
    if (chatId) {
      initialRef.current = true;
    }
  }, [chatId]);

  console.log("userId", userID);

  const getTickStatus = (msg) => {
    if (msg.sender_id !== userID) return null;
    if (msg.status === "sent")
      return (
        <img
          className="double-tick-small"
          src="../../../../../public/assets/icons/single-tick.png"
        />
      );

    return (
      <img
        src="/assets/icons/double-tick.svg"
        className={`double-tick ${msg.status === "seen" ? "active" : ""}`}
      />
    );
  };

  return (
    <div className="chat-space-container">
      {value?.map((itx, index: number) => {
        const isOutgoing = itx.sender_id !== userID;

        return (
          <React.Fragment key={index}>
            {isOutgoing ? (
              <div className="incoming-msg">{itx.message_text}</div>
            ) : (
              <div className="outcoming-msg ">
                <div className="text-cont">
                  {itx.message_text}
                  {getTickStatus(itx)}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatMiddleBar;
