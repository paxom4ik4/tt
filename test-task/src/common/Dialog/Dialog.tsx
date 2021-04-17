import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { createNotification } from "common/Notification/NotificationCreator";

interface IUserDialogProps {
  onOpen: boolean;
  handleClose: () => void;
  userAction: (arg: any) => void;
  userId: string;
}

const UserDialog: React.FC<IUserDialogProps> = ({
  onOpen,
  handleClose,
  userAction,
  userId,
}) => {
  const dispatch = useDispatch();
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
            createNotification("error");
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
