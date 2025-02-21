import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueBreakdownChart = ({ revenueBreakdown }) => {
    const { theme } = useSelector( state => state.theme );
    const labels = revenueBreakdown.map((entry) => entry.source);
    const dataValues = revenueBreakdown.map((entry) => entry.amount);

    const data = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data: dataValues,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                hoverBackgroundColor: ["#E45772", "#2A85D3", "#E4B500", "#3AAFA9", "#8057E4"],
                borderWidth: 2,
                borderColor: "#fff",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: theme === "dark" ? "white" : "black", 
                },
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        let value = tooltipItem.raw.toLocaleString("en-IN", { style: "currency", currency: "INR" });
                        return `${tooltipItem.label}: ${value}`;
                    },
                },
            },
            datalabels: {
                color: theme === "dark" ? "white" : "black",
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
        <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
                💰 Revenue Breakdown
            </h2>
            <div className="h-[300px]">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default RevenueBreakdownChart;
