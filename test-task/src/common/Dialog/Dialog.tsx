import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { store } from "react-notifications-component";
import { copyUser, deleteUser } from "common/Notification/NotificationTypes";

interface IUserDialogProps {
  onOpen: boolean;
  handleClose: () => void;
  userAction: (arg: any) => void;
  userId: string;
  notificationType: string;
}

const UserDialog: React.FC<IUserDialogProps> = ({
  onOpen,
  handleClose,
  userAction,
  userId,
  notificationType,
}) => {
  const dispatch = useDispatch();

  const notificationConfig =
    notificationType === "delete" ? deleteUser : copyUser;

  return (
    <Dialog
      open={onOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want delete user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button
          onClick={() => {
            dispatch(userAction(userId));
            store.addNotification(notificationConfig);
            handleClose();
          }}
          color="primary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
