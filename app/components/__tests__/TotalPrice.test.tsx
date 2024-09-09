import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TotalPrice from "../TotalPrice";

describe("TotalPrice", () => {
  const mockWindows = [
    {
      name: "客厅",
      推拉窗平方数: 5,
      平开窗平方数: 3,
      推拉窗开扇个数: 2,
      平开窗开扇个数: 1,
      转方角米数: 2,
    },
    {
      name: "卧室",
      推拉窗平方数: 3,
      平开窗平方数: 2,
      推拉窗开扇个数: 1,
      平开窗开扇个数: 1,
      转方角米数: 1,
    },
  ];

  const mockPrices = {
    推拉窗每平方价格: 1000,
    平开窗每平方价格: 1500,
    推拉窗开扇价格: 200,
    平开窗开扇价格: 300,
    转方角每米价格: 100,
  };

  const mockAdditionalCosts = [
    { name: "安装费", cost: 1000 },
    { name: "运输费", cost: 500 },
  ];

  it("calculates the total price correctly", () => {
    render(
      <TotalPrice
        windows={mockWindows}
        prices={mockPrices}
        additionalCosts={mockAdditionalCosts}
      />
    );

    // 客厅价格计算
    // (5 * 1000) + (3 * 1500) + (2 * 200) + (1 * 300) + (2 * 100) = 10400

    // 卧室价格计算
    // (3 * 1000) + (2 * 1500) + (1 * 200) + (1 * 300) + (1 * 100) = 6600

    // 额外费用
    // 1000 + 500 = 1500

    // 总价 = 10400 + 6600 + 1500 = 18500

    const totalPriceElement = screen.getByText(/总价:/);
    expect(totalPriceElement).toHaveTextContent("总价: ¥18500.00");
  });

  it("displays all window prices and additional costs", () => {
    render(
      <TotalPrice
        windows={mockWindows}
        prices={mockPrices}
        additionalCosts={mockAdditionalCosts}
      />
    );

    expect(screen.getByText("客厅")).toBeInTheDocument();
    expect(screen.getByText("¥10400.00")).toBeInTheDocument();
    expect(screen.getByText("卧室")).toBeInTheDocument();
    expect(screen.getByText("¥6600.00")).toBeInTheDocument();
    expect(screen.getByText("安装费")).toBeInTheDocument();
    expect(screen.getByText("¥1000.00")).toBeInTheDocument();
    expect(screen.getByText("运输费")).toBeInTheDocument();
    expect(screen.getByText("¥500.00")).toBeInTheDocument();
  });
});
