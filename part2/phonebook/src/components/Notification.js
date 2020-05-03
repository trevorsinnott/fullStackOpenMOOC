import React from "react";

const Notification = ({ message }) => {
  let notificationStyle =
    message.text === ""
      ? {}
      : {
          color: "green",
          background: "lightgrey",
          fontSize: 20,
          borderStyle: "solid",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        };

  if (message.error) {
    notificationStyle = { ...notificationStyle, color: "red" };
  }

  return <div style={notificationStyle}>{message.text}</div>;
};

export default Notification;
