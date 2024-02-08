import "./init";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useState } from "react";
import { useEffect } from "react";
import EnterChatroom from "./EnterChatroom/EnterChatroom";

import Chat from "./Chat/Chat";
import classes from "./Chatroom.module.css";
import PublicChat from "./ChatArea/PublicChat";
import PrivateChat from "./ChatArea/PrivateChat";

var stompClient = null;
const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    console.log(userData);
    console.log(privateChats);
  }, [userData, privateChats]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log("========================HERE==========================");
    console.log(payloadData);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      default:
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  function handleChatroomTab() {
    setTab("CHATROOM");
  }

  function handleTabName(name) {
    setTab(name);
  }

  return (
    // ========================================== CHATROOM =============================================
    <div className={classes.container}>
      {userData.connected ? (
        <div className={classes["chat-box"]}>
          <Chat
            setChatroomTab={handleChatroomTab}
            setNameTab={handleTabName}
            tab={tab}
            privateChats={privateChats}
          />
          {/* ===================CURRENT TAB IS CHATROOM ======================================== */}
          {tab === "CHATROOM" && (
            <PublicChat
              publicChats={publicChats}
              userData={userData}
              onChange={handleMessage}
              onClick={sendValue}
            />
          )}
          {/* ===================CURRENT TAB IS NOT CHATROOM ======================================== */}
          {tab !== "CHATROOM" && (
            <PrivateChat
              privateChats={privateChats}
              userData={userData}
              onChange={handleMessage}
              onClick={sendPrivateValue}
              tab={tab}
            />
          )}
        </div>
      ) : (
        <EnterChatroom
          userData={userData}
          onChange={handleUsername}
          onClick={registerUser}
        />
      )}
    </div>
  );
};

export default ChatRoom;
