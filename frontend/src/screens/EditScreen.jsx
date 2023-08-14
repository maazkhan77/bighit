import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CardContent,
  CardHeader,
  Card,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("active");
  const { id } = useParams();
  const navigate = useNavigate();

  const getTaskById = async (id) => {
    try {
      let { data } = await axios.get("https://bighittaskmanager.onrender.com/api/task/" + id);
      setTitle(data.title);
      setDescription(data.description);
      setPriority(data.priority);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getTaskById(id);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handleCancel = () => {
    // Handle form cancellation here
    setTitle("");
    setDescription("");
    setPriority("low");
    setStatus("active");
    navigate("/api/task");
  };

  const updateTask = async () => {
    let formData = {
      id: id ? id : undefined,
      title,
      description,
      priority,
      status,
    };
    try {
      if (id) {
         await axios.put(
          "https://bighittaskmanager.onrender.com/api/task",
          formData
        );
      } else {
         await axios.post(
          "https://bighittaskmanager.onrender.com/api/task",
          formData
        );
      }
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width={"99vw"}
      height={"80vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card
        sx={{
          maxWidth: 450,
          margin: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardHeader title={`${id ? "Edit" : "Create New"} Task`} />
        <CardContent
          sx={{
            mt: -3,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              label="Title"
              variant="outlined"
              required
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Description"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <Box
              display={"flex"}
              justifyContent={"end"}
              mt={2}
              mb={-2}
              gap={"10px"}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={updateTask}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditScreen;
