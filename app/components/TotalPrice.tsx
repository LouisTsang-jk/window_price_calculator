import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function TotalPrice({ windows, prices, additionalCosts }) {
  const calculateWindowPrice = (params) => {
    return (
      params["推拉窗平方数"] * prices["推拉窗每平方价格"] +
      params["平开窗平方数"] * prices["平开窗每平方价格"] +
      params["推拉窗开扇个数"] * prices["推拉窗开扇价格"] +
      params["平开窗开扇个数"] * prices["平开窗开扇价格"] +
      params["转方角米数"] * prices["转方角每米价格"]
    );
  };

  const calculateTotalPrice = () => {
    let total = 0;

    // 计算窗户费用
    for (const params of Object.values(windows)) {
      total += calculateWindowPrice(params);
    }

    // 添加额外费用
    total += additionalCosts.reduce((sum, cost) => sum + cost.cost, 0);

    return total.toFixed(2);
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
