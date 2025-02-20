import { Link } from "react-router-dom";
import MetricCard from "./MetricCard";
import { FaUsers, FaPlayCircle, FaDollarSign, FaUserCheck, FaCrown } from "react-icons/fa";

const DashboardMetrics = ({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to={"/users"}>
                <MetricCard 
                    title="Total Users" 
                    value={new Intl.NumberFormat("en-IN").format(data?.totalUsers)} 
                    icon={<FaUsers size={24} />} 
                    color="bg-blue-500"
                    border="border-t-blue-500" 
                />
            </Link>
            <Link to={"/users"} >
                <MetricCard 
                    title="Active Users" 
                    value={new Intl.NumberFormat("en-IN").format(data?.activeUsers)} 
                    icon={<FaUserCheck size={24} />} 
                    color="bg-green-500"
                    border="border-t-green-500" 
                />
            </Link>
            <Link to={"/streams"}>
                <MetricCard 
                    title="Total Streams" 
                    value={new Intl.NumberFormat("en-IN").format(data?.totalStreams)} 
                    icon={<FaPlayCircle size={24} />} 
                    color="bg-purple-500"
                    border="border-t-purple-500" 
                />
            </Link>
            <Link to={"/revenue"}>
                <MetricCard 
                    title="Revenue" 
                    value={`${new Intl.NumberFormat(
                        "en-IN",
                        { style : "currency", currency : "INR" }
                    ).format(data?.revenue)}`} 
                    icon={<FaDollarSign size={24} />} 
                    color="bg-yellow-500"
                    border="border-t-yellow-500" 
                />
            </Link>
            <Link to={"/top-artists"}>
            <MetricCard 
                title="Top Artist" 
                value={data?.topArtist} 
                icon={<FaCrown size={24} />} 
                color="bg-red-500"
                border="border-t-red-500" 
            />
            </Link>
        </div>
    );
};

export default DashboardMetrics;
