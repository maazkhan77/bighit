import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Grid,
  CardHeader,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  return new Date(date).toLocaleString("en-in");
};

const truncateText = (text, length) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }

  return text;
};

const TaskCard = ({ task, handleDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate("/api/task/" + id);
  };

  return (
    <>
      <Grid item xs={4} sm={4} md={4}>
        <Card
          sx={{
            maxWidth: 450,
            minHeight: 200,
            maxHeight: 250,
            margin: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.02)",
            },
            borderTop: "3.3px solid",
            borderTopColor:
              task.status === "completed"
                ? "green"
                : task.status === "ongoing"
                ? "orange"
                : "blue",
          }}
        >
          <CardHeader
            action={
              <>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(task._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(task._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
            title={truncateText(task.title, 22)}
          />
          <CardContent
            sx={{
              mt: -3,
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Box height={50}>
              <Typography variant="body1" color="textSecondary">
                {truncateText(task.description, 70)}
              </Typography>
            </Box>
            <Box display={"flex"} gap={"10px"} mb={1}>
              <Chip
                label={`Priority: ${task.priority.toUpperCase()}`}
                color={
                  task.priority === "low"
                    ? "success"
                    : task.priority === "medium"
                    ? "warning"
                    : "error"
                }
                size="medium"
                variant="outlined"
              />
              <Chip
                label={`Status: ${task.status.toUpperCase()}`}
                color={
                  task.status === "active"
                    ? "primary"
                    : task.status === "ongoing"
                    ? "warning"
                    : "success"
                }
                size="medium"
                variant="outlined"
              />
            </Box>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ display: "block" }}
            >
              Created at: {formatDate(task.createdAt)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Updated at: {formatDate(task.updatedAt)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default TaskCard;
