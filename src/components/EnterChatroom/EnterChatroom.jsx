import classes from "./EnterChatroom.module.css";
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function EnterChatroom({ userData, onChange, onClick }) {
  return (
    <div className={classes.register}>
      <h1 style={{ color: "#09005E" }}>Enter Chatroom</h1>
      <div className={classes["register-form"]}>
        <input
          id="user-name"
          placeholder="Enter your name"
          name="userName"
          className={classes["register-form__input"]}
          value={userData.username}
          onChange={onChange}
        />
        <button type="button" onClick={onClick}>
          Connect
        </button>
      </div>
    </div>
  );
}
