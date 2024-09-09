"use client";
import { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import WindowList from "./components/WindowList";
import PriceList from "./components/PriceList";
import AdditionalCostList from "./components/AdditionalCostList";
import TotalPrice from "./components/TotalPrice";

export default function Page() {
  const [windows, setWindows] = useState([]);
  const [prices, setPrices] = useState({});
  const [additionalCosts, setAdditionalCosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("windowCalculatorData");
    if (savedData) {
      const { windows, prices, additionalCosts } = JSON.parse(savedData);
      setWindows(windows);
      setPrices(prices);
      setAdditionalCosts(additionalCosts);
    } else {
      // 设置默认值
      setWindows([
        {
          name: "客厅阳台",
          推拉窗平方数: 0,
          平开窗平方数: 10,
          推拉窗开扇个数: 0,
          平开窗开扇个数: 2,
          转方角米数: 0,
        },
      ]);
      setPrices({
        推拉窗每平方价格: 1680,
        平开窗每平方价格: 799,
        推拉窗开扇价格: 0,
        平开窗开扇价格: 1380,
        转方角每米价格: 300,
      });
      setAdditionalCosts([
        { name: "吊装费", cost: 2500 },
        { name: "其他费用", cost: 450 },
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "windowCalculatorData",
        JSON.stringify({ windows, prices, additionalCosts })
      );
    }
  }, [windows, prices, additionalCosts, isLoaded]);

  const clearAllData = () => {
    setWindows([]);
    setPrices({});
    setAdditionalCosts([]);
    localStorage.removeItem("windowCalculatorData");
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        🪟 窗户价格计算器
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
      <Box mt={4}>
        <Button variant="contained" color="secondary" onClick={clearAllData}>
          清空所有数据
        </Button>
      </Box>
    </Container>
  );
}
