import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDate = (date) => {
  return new Date(date).toLocaleString("en-in");
};

const TaskTable = ({ tasks, loading, handleDelete }) => {
  const navigate = useNavigate();
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.6,
      minWidth: 110,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box display={"flex"} gap={"10px"}>
          <IconButton
            color="primary"
            onClick={() => navigate("/api/task/" + params.row._id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      width={"100%"}
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: "#94e2cd",
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: "none",
          backgroundColor: "#a4a9fc",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#f2f0f0",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "#a4a9fc",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `rgb(20, 20, 20) !important`,
        },
      }}
    >
      <DataGrid
        autoHeight
        rows={tasks}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              _id: false,
            },
          },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
};

export default TaskTable;
