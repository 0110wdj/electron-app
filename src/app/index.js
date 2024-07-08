import React from "react";
import Echarts from "../components/echarts";
import './index.css';

const MainApp = () => {
  return (
    <div className="main-app">
      <h2>趋势</h2>
      <Echarts />
    </div>
  )
}

export default MainApp