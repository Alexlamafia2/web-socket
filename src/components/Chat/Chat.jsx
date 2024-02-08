import classes from "./Chat.module.css";

/* eslint-disable react/prop-types */
export default function Chat({
  setChatroomTab,
  setNameTab,
  tab,
  privateChats,
}) {
  return (
    <div className={classes["member-list"]}>
      <ul>
        <li
          onClick={setChatroomTab}
          className={`${classes.member} ${
            tab === "CHATROOM" ? classes.active : ""
          }`}
        >
          Chatroom
        </li>
        {[...privateChats.keys()].map((name, index) => (
          <li
            onClick={() => {
              setNameTab(name);
            }}
            className={`${classes.member} ${
              tab === name ? classes.active : ""
            }`}
            key={index}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
