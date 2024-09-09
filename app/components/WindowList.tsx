import { useState } from "react";
import {
  List,
  ListItem,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

export default function WindowList({ windows, setWindows }) {
  const [newWindow, setNewWindow] = useState("");

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

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        窗户列表
      </Typography>
      <List>
        {Object.entries(windows).map(([location, params]) => (
          <ListItem key={location}>
            <Typography variant="subtitle1">{location}</Typography>
            {Object.entries(params).map(([field, value]) => (
              <TextField
                key={field}
                label={field}
                type="number"
                value={value}
                onChange={(e) =>
                  handleWindowChange(location, field, e.target.value)
                }
                size="small"
                style={{ margin: "0 8px" }}
              />
            ))}
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
