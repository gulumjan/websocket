"use client";
import React, { useEffect, useState } from "react";
import scss from "./ChatWebSocket.module.scss";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface IMessages {
  username: string;
  message: string;
  photo: string;
}

const ChatWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [messageInp, setMessageInp] = useState<string>("");
  const { data } = useSession();
  console.log("🚀 ~ ChatWebSocket ~ data:", data);

  const initialWebSocket = () => {
    const ws = new WebSocket("wss://api.elchocrud.pro");
    ws.onopen = () => {
      console.log("WebSocket opened successfully");
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "error") {
          console.error("WebSocket error:", data.message);
          return;
        }

        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Received data is not an array:", data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.onclose = () => {
      console.log("WebSocket closed. Reconnecting...");
      setTimeout(() => {
        initialWebSocket();
      }, 500);
    };
    setSocket(ws);
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const newMessage = {
        event: "message",
        username: "Gulumzhan",
        photo:
          "https://lh3.googleusercontent.com/a/ACg8ocJV2d2CjS0b8cMC878IbN4HDtalr9imCzSzOLSDmNo2wDq798A=s432-c-no",
        message: messageInp,
      };

      if (newMessage.photo && newMessage.message) {
        socket.send(JSON.stringify(newMessage));
        setMessageInp("");
      } else {
        console.error("Message is missing required fields.");
      }
    }
  };

  const deleteMessage = (username: string, messageToDelete: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const deleteRequest = {
        event: "delete",
        username,
        message: messageToDelete,
      };
      socket.send(JSON.stringify(deleteRequest));
    }

    setMessages((prevMessages) =>
      prevMessages.filter(
        (message) =>
          message.username !== username || message.message !== messageToDelete
      )
    );
  };

  useEffect(() => {
    initialWebSocket();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className={scss.ChatWebSocket}>
      <div className="container">
        <div className={scss.content}>
          <h1>ChatWebSocket</h1>
          {data ? (
            <div>
              {
                <div className={scss.user}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    src={data.user?.image || "/default-profile.png"}
                    alt={data.user?.name || "User profile picture"}
                    width={50}
                    height={50}
                  />
                  <p>{data.user?.name}</p>
                  <button onClick={() => signOut()}>log out</button>
                </div>
              }
            </div>
          ) : (
            <>
              <h4>You are not authentificated</h4>
              <a href="/auth/sign-in">signIn</a>
            </>
          )}
          <div>
            <div className={scss.messageBlock}>
              {Array.isArray(messages) &&
                messages.map((el, index) =>
                  el.username === "Gulumzhan" ? (
                    <div className={`${scss.message} ${scss.my}`} key={index}>
                      <img
                        src={el.photo}
                        alt={el.username}
                        width={50}
                        height={50}
                      />
                      <p>{el.username}:</p>
                      <p>{el.message}</p>
                      <button
                        onClick={() => deleteMessage(el.username, el.message)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className={scss.message} key={index}>
                      <img
                        src={el.photo}
                        alt={el.username}
                        width={50}
                        height={50}
                      />
                      <p>{el.username}:</p>
                      <p>{el.message}</p>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      <div className={scss.sendMessage}>
        <input
          value={messageInp}
          onChange={(e) => setMessageInp(e.target.value)}
          placeholder="Message"
          type="text"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWebSocket;
