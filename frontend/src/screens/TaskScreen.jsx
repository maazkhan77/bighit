import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TaskCard from "../components/TaskCard";
import DeleteModal from "../components/DeleteModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AlertSnackbar from "../components/AlertSnackbar";
import TaskTable from "../components/TaskTable";

let statusOptions = ["all", "active", "ongoing", "completed"];

function TaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([statusOptions[0]]);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const navigate = useNavigate();

  const matches = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [status]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `http://127.0.0.1:5000/api/task?statuses=${
          status.includes("all") ? "active,ongoing,completed" : status.join(",")
        }`
      );
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete("http://127.0.0.1:5000/api/task", {
        data: {
          id: taskId,
          key: "value",
        },
      });
      setOpen(false);
      handleSearch();
      if (response) {
        setShowSnackbar(true);
        setMessage("Task Deleted");
        setSeverity("success");
      }
    } catch (error) {
      console.error("Error deleting item with data:", error);
      setShowSnackbar(true);
      setMessage("Something went wrong");
      setSeverity("error");
    }
  };

  const handleDelete = (id) => {
    setOpen(true);
    setTaskId(id);
  };

  const handleCreate = () => {
    navigate("/api/task/create");
  };

  return (
    <Box>
      <AlertSnackbar
        open={showSnackbar}
        message={message}
        severity={severity}
        handleClose={() => setShowSnackbar(false)}
      />
      <DeleteModal open={open} setOpen={setOpen} deleteTask={deleteTask} />
      <Box mt={2}>
        <Typography variant="h4" textAlign={"center"}>
          Task List
        </Typography>
      </Box>
      <Container>
        <Box
          mt={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <Autocomplete
            sx={{ minWidth: 250 }}
            multiple
            size={matches ? "small" : "medium"}
            id="tags-outlined"
            options={statusOptions}
            getOptionLabel={(option) => option.toUpperCase()}
            onChange={(e, newValue) => setStatus(newValue)}
            value={status}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Filter By Status" />
            )}
          />
          <Tooltip title={!checked ? "Card View" : "Table View"}>
            <Switch
              sx={{ alignSelf: "center" }}
              checked={checked}
              onChange={() => setChecked(!checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Tooltip>
          <Box m={1}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size={matches ? "small" : "medium"}
              onClick={handleCreate}
            >
              Task
            </Button>
          </Box>
        </Box>
        {!checked ? (
          <Grid
            container
            spacing={{ xs: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {loading
              ? // Display Skeleton components when loading or when task list is empty
                [1, 2, 3].map((index) => <LoadingSkeleton key={index} />)
              : tasks.map((task) => (
                  <TaskCard task={task} handleDelete={handleDelete} />
                ))}
          </Grid>
        ) : (
          <Box height={"70vh"} width={"100%"}>
            <TaskTable
              tasks={tasks}
              loading={loading}
              handleDelete={handleDelete}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default TaskScreen;
