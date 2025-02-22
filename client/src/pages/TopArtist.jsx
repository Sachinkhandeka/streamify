import React, { useEffect, useState } from "react"
import ArtistsTable from "../components/dataTable/ArtistsTable"
import artistsData from "../api/artists"
import LoadingFallback from "../utils/LoadingFallback";

const TopArtist = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        setTimeout(()=> {
            setArtists(artistsData);
            setLoading(false);
        },500)
    },[]);
    return (
        <div className="p-1 bg-white dark:bg-gray-800 rounded-md w-full min-h-screen">
            <h1 className="mb-4 p-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
                Top
                <span className="text-blue-600 dark:text-blue-500 ml-4">Artists</span>
            </h1>
            {loading ? (
                <LoadingFallback />
            ) : artistsData.length > 0 ? (
                <div className="w-full" >
                    <ArtistsTable artistsData={artists} />
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-300">No data available.</p>
            )}
        </div>
    )
}

export default TopArtist