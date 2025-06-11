import EditIcon from "@mui/icons-material/Edit";
import Groups2Icon from '@mui/icons-material/Groups2';
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import { useUser } from "../Context/userContext";
import RequestDialogBox from "./RequestDialogBox";
import EditProfileDialog from "./EditProfileDialogBox";
import { useState } from "react";
import { useUtility } from "../Context/utilityContext";

export default function Profile() {
    const [editOpen, setEditOpen] = useState(false);
    const [requestsOpen, setRequestsOpen] = useState(false);
    const { user } = useUser();
    const { setSelected } = useUtility();

    return (
        <div className="max-w-2xl mx-auto bg-[#27587c] text-white rounded-xl shadow-lg px-6 py-8 font-[Poppins]">
            <div className="flex flex-col items-center mb-6">
                <Avatar
                    alt={user.name}
                    src={user?.profilePic}
                    sx={{ width: 100, height: 100 }}
                    className="border-4 border-blue-600"
                />
                <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
                <p className="text-sm text-gray-300">{user.email}</p>
            </div>
            <div className="flex justify-center mb-6">
                <button
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c7dab] cursor-pointer hover:bg-[#0682b5] transition rounded-md text-sm"
                    onClick={() => setEditOpen(true)}
                >
                    <EditIcon fontSize="small" />
                    Edit Profile
                </button>
            </div>

            <hr className="border-white-600 mb-6" />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div
                    className="hover:bg-[#2f678e] rounded-lg p-3 transition cursor-pointer"
                    onClick={() => setRequestsOpen(true)}
                >
                    <PersonAddIcon fontSize="small" className="text-blue-400" />
                    <p className="font-semibold text-lg">{user.requestsReceived.length}</p>
                    <p className="text-xs text-gray-300">Requests</p>
                </div>
                <div className="hover:bg-[#2f678e] rounded-lg p-3 transition cursor-pointer"
                    onClick={() => { setSelected("Connections") }}
                >
                    <PeopleIcon fontSize="small" className="text-blue-400" />
                    <p className="font-semibold text-lg">{user.connections.length}</p>
                    <p className="text-xs text-gray-300">Connections</p>
                </div>
                <div className="hover:bg-[#2f678e] rounded-lg p-3 transition cursor-pointer"
                    onClick={() => {
                        setSelected("Groups");
                    }}
                >
                    <Groups2Icon fontSize="small" className="text-blue-400" />
                    <p className="font-semibold text-lg">{user.groups.length}</p>
                    <p className="text-xs text-gray-300">Groups</p>
                </div>
            </div>
            <EditProfileDialog open={editOpen} onClose={() => setEditOpen(false)} />
            <RequestDialogBox open={requestsOpen} onClose={() => setRequestsOpen(false)} />
        </div>
    );
}
