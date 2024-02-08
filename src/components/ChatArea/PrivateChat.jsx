import classes from "./ChatArea.module.css";
import SendMessageArea from "./SendMessageArea/SendMessageArea";
/* eslint-disable react/prop-types */
export default function PrivateChat({
  privateChats,
  userData,
  onChange,
  onClick,
  tab,
}) {
  return (
    <div className={classes["chat-content"]}>
      <ul className={classes["chat-messages"]}>
        {[...privateChats.get(tab)].map((chat, index) => (
          <li
            className={`${classes.message} ${
              chat.senderName === userData.username ? classes.self : ""
            }`}
            key={index}
          >
            {chat.senderName !== userData.username && (
              <div className={classes.avatar}>
                {chat.senderName.trim().charAt(0)}
              </div>
            )}
            <div className={classes["message-data"]}>{chat.message}</div>
            {chat.senderName === userData.username && (
              <div className={`${classes.avatar} ${classes.self}`}>
                {chat.senderName.trim().charAt(0)}
              </div>
            )}
          </li>
        ))}
      </ul>
      <SendMessageArea
        userData={userData}
        onClick={onClick}
        onChange={onChange}
      />
    </div>
  );
}
