/* eslint-disable react/prop-types */
import classes from "./SendMessageArea.module.css";

export default function SendMessageArea({ userData, onChange, onClick }) {
  return (
    <div className={classes["send-message"]}>
      <input
        type="text"
        className={classes["input-message"]}
        placeholder="Enter Message..."
        value={userData.message}
        onChange={onChange}
      />
      <button
        type="button"
        className={classes["send-button"]}
        onClick={onClick}
      >
        Send
      </button>
    </div>
  );
}
