import { Typography, Box, Paper, Grid, TextField } from "@mui/material";

export default function PriceList({ prices, setPrices }) {
  const handlePriceChange = (field, value) => {
    setPrices((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const priceFields = [
    { key: "推拉窗每平方价格", label: "推拉窗（每平方米）" },
    { key: "平开窗每平方价格", label: "平开窗（每平方米）" },
    { key: "推拉窗开扇价格", label: "推拉窗开扇（每个）" },
    { key: "平开窗开扇价格", label: "平开窗开扇（每个）" },
    { key: "转方角每米价格", label: "转方角（每米）" },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        价格设置
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          {priceFields.map(({ key, label }) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                label={label}
                type="number"
                value={prices[key] || 0} // 添加默认值 0
                onChange={(e) => handlePriceChange(key, e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <span style={{ marginRight: 8 }}>¥</span>,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
