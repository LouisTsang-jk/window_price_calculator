import { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default function WindowList({ windows, setWindows }) {
  const [newWindow, setNewWindow] = useState("");
  const [editingWindow, setEditingWindow] = useState(null);
  const [editedWindowName, setEditedWindowName] = useState("");

  const handleWindowChange = (location, field, value) => {
    setWindows((prev) => ({
      ...prev,
      [location]: { ...prev[location], [field]: parseFloat(value) || 0 },
    }));
  };

  const addNewWindow = () => {
    if (newWindow) {
      setWindows((prev) => ({
        ...prev,
        [newWindow]: {
          推拉窗平方数: 0,
          平开窗平方数: 0,
          推拉窗开扇个数: 0,
          平开窗开扇个数: 0,
          转方角米数: 0,
        },
      }));
      setNewWindow("");
    }
  };

  const startEditing = (location) => {
    setEditingWindow(location);
    setEditedWindowName(location);
  };

  const saveEditedWindow = () => {
    if (editedWindowName && editedWindowName !== editingWindow) {
      setWindows((prev) => {
        const newWindows = { ...prev };
        newWindows[editedWindowName] = newWindows[editingWindow];
        delete newWindows[editingWindow];
        return newWindows;
      });
    }
    setEditingWindow(null);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        窗户列表
      </Typography>
      <List>
        {Object.entries(windows).map(([location, params]) => (
          <ListItem
            key={location}
            component={Paper}
            elevation={3}
            sx={{ mb: 2, p: 2 }}
          >
            <Box width="100%">
              {editingWindow === location ? (
                <Box display="flex" alignItems="center" mb={2}>
                  <TextField
                    value={editedWindowName}
                    onChange={(e) => setEditedWindowName(e.target.value)}
                    size="small"
                  />
                  <IconButton onClick={saveEditedWindow}>
                    <SaveIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="subtitle1">{location}</Typography>
                  <IconButton onClick={() => startEditing(location)}>
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
              <Grid container spacing={2}>
                {Object.entries(params).map(([field, value]) => (
                  <Grid item xs={12} sm={6} md={4} key={field}>
                    <TextField
                      label={field}
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleWindowChange(location, field, e.target.value)
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
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          label="新窗户名称"
          value={newWindow}
          onChange={(e) => setNewWindow(e.target.value)}
          size="small"
        />
        <Button
          onClick={addNewWindow}
          variant="contained"
          style={{ marginLeft: 8 }}
        >
          添加窗户
        </Button>
      </Box>
    </Box>
  );
}
