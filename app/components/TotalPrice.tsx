import { Typography, Box } from "@mui/material";

export default function TotalPrice({ windows, prices, additionalCosts }) {
  const calculateTotalPrice = () => {
    let total = 0;

    // 计算窗户费用
    for (const params of Object.values(windows)) {
      total +=
        params["推拉窗平方数"] * prices["推拉窗每平方价格"] +
        params["平开窗平方数"] * prices["平开窗每平方价格"] +
        params["推拉窗开扇个数"] * prices["推拉窗开扇价格"] +
        params["平开窗开扇个数"] * prices["平开窗开扇价格"] +
        params["转方角米数"] * prices["转方角每米价格"];
    }

    // 添加额外费用
    total += additionalCosts.reduce((sum, cost) => sum + cost.cost, 0);

    return total.toFixed(2);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        总价: ¥{calculateTotalPrice()}
      </Typography>
    </Box>
  );
}
