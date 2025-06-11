import { useRef, useState } from "react";
import { useUser } from "../Context/userContext";
import { handelSearch } from "../Utils/Search";
import { sendRequest } from "../Utils/requests";
import Avatar from "@mui/material/Avatar";
import { useUtility } from "../Context/utilityContext";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function Search() {
    const SearchEmailRef = useRef();
    const [searchResult, setSearchResult] = useState([]);
    const { user, setUser } = useUser();
    const { loading, setLoading, socket } = useUtility()
    return (
        <div className="text-white px-6 py-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Search Users</h2>

            <input
                type="text"
                placeholder="Search by email"
                ref={SearchEmailRef}
                onKeyDown={(e) => handelSearch(e, setSearchResult, SearchEmailRef, setLoading)}
                className="w-full px-4 py-2 rounded-lg mb-6 bg-white text-gray-800 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {loading === true ? <div className="flex items-center justify-center">
                <ClipLoader
                    color={"#ffffff"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader" /></div> :
                <div className="flex flex-col gap-4">
                    {searchResult.length > 0 ? (
                        searchResult.map((val, index) => (
                            <div
                                key={index}
                                className="bg-[#27587c] hover:bg-[#2f678e] transition rounded-xl px-4 py-3 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar src={val?.profilePic} alt={val.name} />
                                    <div>
                                        <p className="text-white font-medium">{val.name}</p>
                                        <p className="text-sm text-gray-300">{val.email}</p>
                                    </div>
                                </div>

                                {!(user.connections.find((connection)=> connection._id===val._id) ||
                                    user.requestsSent.includes(val._id) ||
                                    user.requestsReceived.some((p)=> p._id === val._id)) && (
                                        <button
                                            onClick={() => sendRequest(val._id, setUser,setLoading, toast, user,socket)}
                                            className="text-white px-3 py-1 rounded-md text-sm bg-[#0c7dab] hover:bg-[#0682b5] transition cursor-pointer"
                                            disabled={loading}
                                        >
                                            Connect
                                        </button>
                                    )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-300 mt-10">
                            No users found.
                        </div>
                    )}
                </div>
}
        </div>
    );
}
