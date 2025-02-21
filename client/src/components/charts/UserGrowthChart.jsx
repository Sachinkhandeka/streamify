import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserGrowthChart = ({ userGrowth }) => {
    const { theme } = useSelector( state => state.theme );
    const labels = userGrowth.map((entry) => entry.month);
    const totalUsers = userGrowth.map((entry) => entry.totalUsers);
    const activeUsers = userGrowth.map((entry) => entry.activeUsers);

    const data = {
        labels,
        datasets: [
            {
                label: "Total Users",
                data: totalUsers,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
            {
                label: "Active Users",
                data: activeUsers,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: theme === "dark" ? "white" : "black", // Adapts to dark mode
                },
                position: "top",
            },
        },
        scales: {
            x: {
                ticks: { color: theme === "dark" ? "#D3D3D3" : "#4A4A4A" },
                grid: { color: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)" },
            },
            y: {
                ticks: { color: theme === "dark" ? "#D3D3D3" : "#4A4A4A" },
                grid: { color: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)" },
            },
        },
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
                📈 User Growth Over Time
            </h2>
            <div className="h-[300px]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default UserGrowthChart;
