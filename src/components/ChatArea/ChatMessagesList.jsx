import classes from "./ChatArea.module.css";

/* eslint-disable react/prop-types */
// ChatMessagesList.js
export default function ChatMessagesList({ chat, index, userData }) {
  <li
    className={`${classes.message} ${
      chat.senderName === userData.username ? classes.self : ""
    }`}
    key={index}
  >
    {chat.senderName !== userData.username && (
      <div className={classes.avatar}>{chat.senderName.trim().charAt(0)}</div>
    )}
    <div className={classes["message-data"]}>{chat.message}</div>
    {chat.senderName === userData.username && (
      <div className={`${classes.avatar} ${classes.self}`}>
        {chat.senderName.trim().charAt(0)}
      </div>
    )}
  </li>;
}
