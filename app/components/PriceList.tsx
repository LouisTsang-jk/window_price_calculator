import { List, ListItem, TextField, Typography, Box } from "@mui/material";

export default function PriceList({ prices, setPrices }) {
  const handlePriceChange = (field, value) => {
    setPrices((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        价格列表
      </Typography>
      <List>
        {Object.entries(prices).map(([field, value]) => (
          <ListItem key={field}>
            <TextField
              label={field}
              type="number"
              value={value}
              onChange={(e) => handlePriceChange(field, e.target.value)}
              size="small"
              fullWidth
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
