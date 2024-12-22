import React, { useContext } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);
import { FeeContext } from "../context/FeeContext";
import { text } from "@fortawesome/fontawesome-svg-core";

const HomeChart = () => {
  const { staticData } = useContext(FeeContext);
  const topMonth = staticData?.topMonthlyFees.slice(0, 5);
  const data = {
    labels: topMonth.map((fee) => fee.name), // Names of the fees (x-axis)
    datasets: [
      {
        label: "Payment Count", // Label for the dataset
        data: topMonth.map((fee) => fee.paymentCount), // Payment counts (y-axis)
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Color of the bars
        borderColor: "rgba(54, 162, 235, 1)", // Border color of the bars
        borderWidth: 1, // Border width
      },
    ],
  };
  const options4 = {
    responsive: true, // Make the chart responsive
    plugins: {
      title: {
        display: true, // Display the title
        text: "Top 5 Khoản thu đã hoàn thành trong tháng", // Title text
        font: {size: 22},
      },
      legend: {
        position: "top", // Position of the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure y-axis starts at 0
      },
    },
  };
  // Options for the chart
  const options1 = {
    responsive: true, // Make the chart responsive
    plugins: {
      title: {
        display: true, // Display the title
        text: "Toàn bộ khoản thu đã tạo", // Title text
        font: {
          size: 20, // Title font size
        },
        padding: {
          top: 10, // Padding on top of the title
          bottom: 30, // Padding at the bottom
        },
      },
      legend: {
        position: "top", // Position of the legend
        labels: {
          font: {
            size: 14, // Font size for legend labels
          },
        },
      },
    },
  };
  const options2 = {
    responsive: true, // Make the chart responsive
    plugins: {
      title: {
        display: true, // Display the title
        text: "Toàn bộ khoản thu trong năm", // Title text
        font: {
          size: 20, // Title font size
        },
        padding: {
          top: 10, // Padding on top of the title
          bottom: 30, // Padding at the bottom
        },
      },
      legend: {
        position: "top", // Position of the legend
        labels: {
          font: {
            size: 14, // Font size for legend labels
          },
        },
      },
    },
  };
  const options3 = {
    responsive: true, // Make the chart responsive
    plugins: {
      title: {
        display: true, // Display the title
        text: "Toàn bộ khoản thu trong tháng", // Title text
        font: {
          size: 20, // Title font size
        },
        padding: {
          top: 10, // Padding on top of the title
          bottom: 30, // Padding at the bottom
        },
      },
      legend: {
        position: "top", // Position of the legend
        labels: {
          font: {
            size: 14, // Font size for legend labels
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-6 flex flex-col gap-12">
      <div className="flex justify-between">
        <div className="w-1/4">
          <Pie
            data={{
              labels: ["Đã xong", "Chưa xong"],
              datasets: [
                {
                  label: "Toàn bộ",
                  data: [
                    staticData?.monthlyFeeFinished,
                    staticData?.monthlyFeeCount -
                      staticData?.monthlyFeeFinished,
                  ],
                  backgroundColor: ["#86A788", "#FFCFCF"],
                  borderColor: ["#D5E7B5", "#FFE2E2"],
                  borderWidth: 1,
                },
              ],
            }}
            options={options3}
          />
          {""}
          {/* Render the Pie chart */}
        </div>

        <div className="w-1/4">
          <Pie
            data={{
              labels: ["Đã xong", "Chưa xong"],
              datasets: [
                {
                  label: "Toàn bộ",
                  data: [
                    staticData?.yearlyFeeFinished,
                    staticData?.yearlyFeeCount - staticData?.yearlyFeeFinished,
                  ],
                  backgroundColor: ["#86A788", "#FFCFCF"],
                  borderColor: ["#D5E7B5", "#FFE2E2"],
                  borderWidth: 1,
                },
              ],
            }}
            options={options2}
          />{" "}
          {/* Render the Pie chart */}
        </div>
        <div className="w-1/4">
          <Pie
            data={{
              labels: ["Đã xong", "Chưa xong"],
              datasets: [
                {
                  label: "Toàn bộ",
                  data: [
                    staticData?.totalFeeFinished,
                    staticData?.totalFeeCount - staticData?.totalFeeFinished,
                  ],
                  backgroundColor: ["#86A788", "#FFCFCF"],
                  borderColor: ["#D5E7B5", "#FFE2E2"],
                  borderWidth: 1,
                },
              ],
            }}
            options={options1}
          />{" "}
          {/* Render the Pie chart */}
        </div>
      </div>
      <div className="flex justify-between  h-[50%]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xl font-medium text-gray-600">
              Tháng này{" "}
              <span className="text-base">(hoàn thành / tổng số): </span>
              <span className="text-secondary font-semibold">
                {staticData.monthlyFeeFinished}/
              </span>{" "}
              <span>{staticData.monthlyFeeCount}</span>
            </p>
            <p className="text-xl font-medium text-gray-600">
              Trong năm nay{" "}
              <span className="text-base">(hoàn thành / tổng số): </span>
              <span className="text-secondary font-semibold">
                {staticData.yearlyFeeFinished}/
              </span>{" "}
              <span>{staticData.yearlyFeeCount}</span>
            </p>
            <p className="text-xl font-medium text-gray-600">
              Toàn bộ phí{" "}
              <span className="text-base">(hoàn thành / tổng số): </span>
              <span className="text-secondary font-semibold">
                {staticData.totalFeeFinished}/
              </span>{" "}
              <span>{staticData.totalFeeCount}</span>
            </p>
          </div>
          <div>
            <p className="text-xl font-medium text-gray-600">
              Tổng số cư dân:{" "}
              <span className="text-violet-300 font-semibold">
                {staticData.residentCount}
              </span>
            </p>
            <p className="text-xl font-medium text-gray-600">
              Số phòng hoàn thiện phí:{" "}
              <span className="text-secondary font-semibold">
                {staticData.finishedRoomCount}
              </span>
            </p>
            <p className="text-xl font-medium text-gray-600">
              Số phòng chưa hoàn thiện phí:{" "}
              <span className="text-red-300 font-semibold">
                {staticData.nonFinishedRoomCount}
              </span>
            </p>
          </div>
        </div>
        <div className="w-[60%]">
          <Bar data={data} options={options4} /> {/* Render the bar chart */}
        </div>
      </div>
    </div>
  );
};

export default HomeChart;
