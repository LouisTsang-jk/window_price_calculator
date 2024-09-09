import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function TotalPrice({ windows, prices, additionalCosts }) {
  const calculateWindowPrice = (params): number => {
    return Object.entries(params).reduce((total, [key, value]) => {
      const price =
        prices[key.replace("平方数", "每平方价格").replace("个数", "价格")];
      return total + (Number(value) || 0) * (Number(price) || 0);
    }, 0);
  };

  const calculateTotalPrice = () => {
    const windowsTotal = Object.values(windows).reduce(
      (total: number, params) =>
        total + calculateWindowPrice(params as Record<string, number>),
      0
    );

    const additionalTotal = additionalCosts.reduce(
      (sum, cost) => sum + (Number(cost.cost) || 0),
      0
    );

    return (windowsTotal + additionalTotal).toFixed(2);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        价格明细
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <List>
          {Object.entries(windows).map(([location, params]) => (
            <ListItem key={location}>
              <ListItemText
                primary={location}
                secondary={`¥${calculateWindowPrice(params).toFixed(2)}`}
              />
            </ListItem>
          ))}
          {additionalCosts.map((cost, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={cost.name}
                secondary={`¥${cost.cost.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Typography variant="h5" gutterBottom>
        总价: ¥{calculateTotalPrice()}
      </Typography>
    </Box>
  );
}
