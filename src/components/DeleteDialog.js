import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React from "react";
import OverrideButton from "./OverrideButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ open, handleClose, handleConfirm, user }) => {
  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
      <DialogTitle>Confirmar a deleção?</DialogTitle>
      <DialogContent>
        {user ? (
          <DialogContentText>{`O usuário de email ${user.email} será deletado.`}</DialogContentText>
        ) : null}
      </DialogContent>
      <DialogActions>
        <OverrideButton onClick={handleClose} label="Cancelar" />
        <OverrideButton primary onClick={handleConfirm} label="Concordo" />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
