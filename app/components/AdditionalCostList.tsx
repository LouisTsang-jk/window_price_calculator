import { useState, useRef } from "react";
import {
  List,
  ListItem,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdditionalCostList({
  additionalCosts,
  setAdditionalCosts,
}) {
  const [newCostName, setNewCostName] = useState("");
  const [newCostValue, setNewCostValue] = useState("");
  const [error, setError] = useState({ name: false, value: false });
  const nameInputRef = useRef(null);
  const valueInputRef = useRef(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleCostChange = (index, field, value) => {
    setAdditionalCosts((prev) =>
      prev.map((cost, i) =>
        i === index
          ? {
              ...cost,
              [field]: field === "cost" ? parseFloat(value) || 0 : value,
            }
          : cost
      )
    );
  };

  const handleDeleteCost = (index) => {
    setAdditionalCosts((prev) => prev.filter((_, i) => i !== index));
    setDeleteConfirmation(null);
  };

  const openDeleteConfirmation = (index) => {
    setDeleteConfirmation(index);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const addNewCost = () => {
    const nameEmpty = !newCostName.trim();
    const valueEmpty = !newCostValue.trim();
    setError({ name: nameEmpty, value: valueEmpty });

    if (nameEmpty || valueEmpty) {
      if (nameEmpty) {
        nameInputRef.current.focus();
      } else if (valueEmpty) {
        valueInputRef.current.focus();
      }
      return;
    }

    setAdditionalCosts((prev) => [
      ...prev,
      { name: newCostName, cost: parseFloat(newCostValue) || 0 },
    ]);
    setNewCostName("");
    setNewCostValue("");
    setError({ name: false, value: false });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        额外费用
      </Typography>
      <List sx={{ "& .MuiListItem-root": { paddingLeft: 0, paddingRight: 0 } }}>
        {additionalCosts.map((cost, index) => (
          <ListItem key={index}>
            <TextField
              label="费用名称"
              value={cost.name}
              onChange={(e) => handleCostChange(index, "name", e.target.value)}
              size="small"
              style={{ marginRight: 8 }}
            />
            <TextField
              label="费用金额"
              type="number"
              value={cost.cost}
              onChange={(e) => handleCostChange(index, "cost", e.target.value)}
              size="small"
              style={{ marginRight: 8 }}
            />
            <IconButton
              onClick={() => openDeleteConfirmation(index)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box display="flex" alignItems="center" mt={2} flexWrap="nowrap">
        <TextField
          label="新费用名称"
          value={newCostName}
          onChange={(e) => setNewCostName(e.target.value)}
          size="small"
          style={{ marginRight: 8, flexGrow: 1 }}
          error={error.name}
          helperText={error.name ? "请填写费用名称" : ""}
          inputRef={nameInputRef}
        />
        <TextField
          label="新费用金额"
          type="number"
          value={newCostValue}
          onChange={(e) => setNewCostValue(e.target.value)}
          size="small"
          style={{ marginRight: 8, flexGrow: 1 }}
          error={error.value}
          helperText={error.value ? "请填写费用金额" : ""}
          inputRef={valueInputRef}
        />
        <Button
          onClick={addNewCost}
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
        >
          添加费用
        </Button>
      </Box>

      <Dialog
        open={deleteConfirmation !== null}
        onClose={closeDeleteConfirmation}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您确定要删除这项额外费用吗？此操作无法撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation}>取消</Button>
          <Button
            onClick={() => handleDeleteCost(deleteConfirmation)}
            color="error"
          >
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
