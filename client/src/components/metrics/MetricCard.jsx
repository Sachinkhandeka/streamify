
const MetricCard = ({ title, value, icon, color='', border='' }) => {
    return (
        <div className={`bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 flex items-center gap-4 transition hover:shadow-xl border-t-2 ${ border ? border : '' }`}>
            <div className={`p-4 rounded-full ${color} text-white`}>
                {icon}
            </div>
            <div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm uppercase font-semibold">{title}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
};

export default MetricCard;
