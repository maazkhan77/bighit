import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TaskScreen from "./screens/TaskScreen";
import { Box } from "@mui/material";
import EditScreen from "./screens/EditScreen";

function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route path="/api/task" element={<TaskScreen />} />
        <Route path="/api/task/:id" element={<EditScreen />} />
        <Route path="/api/task/create" element={<EditScreen />} />
        <Route path="*" element={<Navigate to="/api/task" replace />} />
      </Routes>
    </Box>
  );
}

export default App;
