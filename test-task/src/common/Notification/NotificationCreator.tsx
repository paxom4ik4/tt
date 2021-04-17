import * as React from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.scss";

export const createNotification = (type: string) => {
  return () => {
    switch (type) {
      case "info":
        NotificationManager.info("User copied");
        break;
      case "success":
        NotificationManager.success("Success message", "User Added");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error("User Deleted", "Click me!", 5000, () => {
          alert("callback");
        });
        break;
    }
  };
};
