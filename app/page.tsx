"use client";
import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import WindowList from "./components/WindowList";
import PriceList from "./components/PriceList";
import AdditionalCostList from "./components/AdditionalCostList";
import TotalPrice from "./components/TotalPrice";

export default function Page() {
  const [windows, setWindows] = useState({
    "5楼阳台": {
      推拉窗平方数: 0,
      平开窗平方数: 11,
      推拉窗开扇个数: 0,
      平开窗开扇个数: 2,
      转方角米数: 0,
    },
    // ... 其他窗户数据 ...
  });

  const [prices, setPrices] = useState({
    推拉窗每平方价格: 1680,
    平开窗每平方价格: 799,
    推拉窗开扇价格: 0,
    平开窗开扇价格: 1380,
    转方角每米价格: 300,
  });

  const [additionalCosts, setAdditionalCosts] = useState([
    { name: "吊装费", cost: 2500 },
    { name: "其他费用", cost: 450 },
  ]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        窗户价格计算器
      </Typography>
      <Box mb={4}>
        <WindowList windows={windows} setWindows={setWindows} />
      </Box>
      <Box mb={4}>
        <PriceList prices={prices} setPrices={setPrices} />
      </Box>
      <Box mb={4}>
        <AdditionalCostList
          additionalCosts={additionalCosts}
          setAdditionalCosts={setAdditionalCosts}
        />
      </Box>
      <TotalPrice
        windows={windows}
        prices={prices}
        additionalCosts={additionalCosts}
      />
    </Container>
  );
}
