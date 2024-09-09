import { useState } from "react";
import {
  List,
  ListItem,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

export default function AdditionalCostList({
  additionalCosts,
  setAdditionalCosts,
}) {
  const [newCostName, setNewCostName] = useState("");
  const [newCostValue, setNewCostValue] = useState("");

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

  const addNewCost = () => {
    if (newCostName && newCostValue) {
      setAdditionalCosts((prev) => [
        ...prev,
        { name: newCostName, cost: parseFloat(newCostValue) || 0 },
      ]);
      setNewCostName("");
      setNewCostValue("");
    }
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
            />
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
        />
        <TextField
          label="新费用金额"
          type="number"
          value={newCostValue}
          onChange={(e) => setNewCostValue(e.target.value)}
          size="small"
          style={{ marginRight: 8, flexGrow: 1 }}
        />
        <Button
          onClick={addNewCost}
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
        >
          添加费用
        </Button>
      </Box>
    </Box>
  );
}
