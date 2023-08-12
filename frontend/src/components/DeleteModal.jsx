import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, useMediaQuery } from "@mui/material";

export default function DeleteModal({ open, setOpen, taskId, deleteTask }) {
  const handleClose = () => setOpen(false);
  const matches = useMediaQuery("(max-width:600px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches ? "80%" : 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 1,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Task
          </Typography>
          <Divider />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            textAlign={"center"}
            fontWeight={"semi-bold"}
          >
            Are You Sure ?
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <Box display={"flex"} gap={"10px"} justifyContent={"end"} mt={2}>
            <Button
              variant="contained"
              size="small"
              onClick={() => deleteTask(taskId)}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
