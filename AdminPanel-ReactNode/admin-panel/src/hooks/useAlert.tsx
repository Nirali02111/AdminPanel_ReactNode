import React, { useEffect, useState } from "react";
export type MessageType = "success" | "error" | "warning";
export interface IMessage {
  message: string;
  type: MessageType;
}

const useAlert = () => {
  const [messageData, setMessageData] = useState<IMessage>({
    message: "",
    type: "success",
  });
  const logMessage = (message: string, type?: MessageType) => {
    const messageData = type
      ? { message: message, type: type }
      : { message: message, type: "success" as MessageType };
    setMessageData(messageData);
    setTimeout(() => {
      setMessageData({
        message: "",
        type: "success",
      });
    }, 5000);
  };
  return {
    logMessage,
    ...messageData,
  };
};

export default useAlert;
