import { useState, useRef } from "react";
import {
  List,
  ListItem,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WindowList({ windows, setWindows }) {
  const [newWindow, setNewWindow] = useState("");
  const [error, setError] = useState(false);
  const newWindowInputRef = useRef(null);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedWindowName, setEditedWindowName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleWindowChange = (index, field, value) => {
    setWindows((prev) =>
      prev.map((window, i) =>
        i === index ? { ...window, [field]: parseFloat(value) || 0 } : window
      )
    );
  };

  const addNewWindow = () => {
    if (!newWindow.trim()) {
      setError(true);
      newWindowInputRef.current.focus();
      return;
    }

    setWindows((prev) => [
      ...prev,
      {
        name: newWindow,
        推拉窗平方数: 0,
        平开窗平方数: 0,
        推拉窗开扇个数: 0,
        平开窗开扇个数: 0,
        转方角米数: 0,
      },
    ]);
    setNewWindow("");
    setError(false);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedWindowName(windows[index].name);
  };

  const saveEditedWindow = () => {
    if (editedWindowName && editingIndex !== null) {
      setWindows((prev) =>
        prev.map((window, index) =>
          index === editingIndex
            ? { ...window, name: editedWindowName }
            : window
        )
      );
    }
    setEditingIndex(null);
  };

  const deleteWindow = (index) => {
    setWindows((prev) => prev.filter((_, i) => i !== index));
  };

  const openDeleteConfirmation = (index) => {
    setDeleteConfirmation(index);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const confirmDelete = () => {
    if (deleteConfirmation !== null) {
      deleteWindow(deleteConfirmation);
      closeDeleteConfirmation();
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        窗户列表
      </Typography>
      {windows.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          暂无窗户，请添加新窗户
        </Typography>
      ) : (
        <List>
          {windows.map((window, index) => (
            <ListItem
              key={index}
              component={Paper}
              elevation={3}
              sx={{ mb: 2, p: 2 }}
            >
              <Box width="100%">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  {editingIndex === index ? (
                    <>
                      <Box display="flex" alignItems="center">
                        <TextField
                          value={editedWindowName}
                          onChange={(e) => setEditedWindowName(e.target.value)}
                          size="small"
                        />
                        <IconButton onClick={saveEditedWindow}>
                          <SaveIcon />
                        </IconButton>
                      </Box>
                      <IconButton
                        onClick={() => openDeleteConfirmation(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle1">
                          {window.name}
                        </Typography>
                        <IconButton onClick={() => startEditing(index)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                      <IconButton
                        onClick={() => openDeleteConfirmation(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
                <Grid container spacing={2}>
                  {Object.entries(window)
                    .filter(([key]) => key !== "name")
                    .map(([field, value]) => (
                      <Grid item xs={12} sm={6} md={4} key={field}>
                        <TextField
                          label={field}
                          type="number"
                          value={value}
                          onChange={(e) =>
                            handleWindowChange(index, field, e.target.value)
                          }
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          label="新窗户名称"
          value={newWindow}
          onChange={(e) => setNewWindow(e.target.value)}
          size="small"
          error={error}
          helperText={error ? "请填写窗户名称" : ""}
          inputRef={newWindowInputRef}
        />
        <Button
          onClick={addNewWindow}
          variant="contained"
          style={{ marginLeft: 8 }}
        >
          添加窗户
        </Button>
      </Box>

      <Dialog open={!!deleteConfirmation} onClose={closeDeleteConfirmation}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您确定要删除"{deleteConfirmation}"窗户吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation}>取消</Button>
          <Button onClick={confirmDelete} color="error">
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
