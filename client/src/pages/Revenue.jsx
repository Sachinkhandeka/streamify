import React, { useEffect, useState } from "react";
import revenueData from "../api/revenue";
import LoadingFallback from "../utils/LoadingFallback";
import RevenueTable from "../components/dataTable/RevenueTable";

const Revenue = () => {
    const [ revenue, setRevenue ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        setTimeout(()=> {
            setRevenue(revenueData);
            setLoading(false);
        }, 500);
    },[]);
    return (
        <div className="p-1 bg-white dark:bg-gray-800 rounded-md h-screen">
            <h1 className="mb-4 p-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
                Total
                <span className="text-blue-600 dark:text-blue-500 ml-4">Revenue</span>
            </h1>
            {loading ? (
                <LoadingFallback />
            ) : revenue.length > 0 ? (
                <div className="w-full" >
                    <RevenueTable revenueData={revenue} />
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-300">No data available.</p>
            )}
        </div>
    )
}

export default Revenue