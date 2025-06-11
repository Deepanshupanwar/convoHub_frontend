import { Avatar, Dialog } from "@mui/material";
import { useGroup } from "../Context/groupContext";
import { useUser } from "../Context/userContext";
import { useRef, useState } from "react";
import { addMember, UpdateIcon, removeMember } from "../Utils/groups";
import toast from "react-hot-toast";
import { useUtility } from "../Context/utilityContext";

export default function EditGroupBox({ open, onClose }) {
    const { selectedGroup, setSelectedGroup, setGroups } = useGroup();
    const {socket} = useUtility();
    const { user } = useUser();
    const [toggle, setToggle] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef();

    if (!selectedGroup) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUpdateIcon = async () => {
        if (!selectedFile) return;
        setUploading(true);
        await UpdateIcon(selectedGroup._id,selectedFile,setSelectedGroup,toast,setSelectedFile);
        setSelectedFile(null);
        setUploading(false)
        fileRef.current.value = null        
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="bg-[#1b3a4b] text-white p-6 rounded-md font-[Poppins] space-y-6">

               
                <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                    <Avatar
                        src={selectedGroup.groupPic}
                        sx={{ width: 56, height: 56 }}
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
                        <p className="text-sm text-gray-300">{selectedGroup.members.length} members</p>
                    </div>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                        <label className="text-sm text-gray-300 whitespace-nowrap">Group Icon:</label>

                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="text-sm text-gray-200 file:bg-[#27587c] cursor-pointer file:border-0 file:px-3 file:py-1 file:rounded-md file:text-white file:cursor-pointer"
                        />

                        {selectedFile && (
                            <button
                                disabled={uploading}
                                onClick={handleUpdateIcon}
                                className="bg-green-600 text-white px-3 py-1 text-sm rounded-md hover:bg-green-700 transition cursor-pointer"
                            >
                                Update
                            </button>
                        )}
                    </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setToggle(true)}
                        className={`px-4 py-2 rounded-md ${toggle ? 'bg-[#27587c]' : 'bg-gray-600'} transition cursor-pointer`}
                    >
                        Members
                    </button>
                    <button
                        onClick={() => setToggle(false)}
                        className={`px-4 py-2 rounded-md ${!toggle ? 'bg-[#27587c]' : 'bg-gray-600'} transition cursor-pointer`}
                    >
                        Add Members
                    </button>
                </div>

             
                <div className="max-h-64 overflow-y-auto scrollbar-hide space-y-3">
                    {toggle ? (
                        selectedGroup.members.map((member) => (
                            <div
                                key={member._id}
                                className="flex items-center justify-between bg-[#2f678e] p-3 rounded-md"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar sx={{ width: 40, height: 40 }} src={member?.profilePic} />
                                    <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-sm text-gray-300">{member.email}</p>
                                    </div>
                                </div>
                                {member._id !== user._id &&
                                    <button
                                    className="px-3 py-1 bg-[#27597cee] text-sm rounded-md hover:bg-[#27597c] transition cursor-pointer"
                                    onClick={()=>{removeMember(member._id, selectedGroup._id,setSelectedGroup, setGroups, socket, toast)}}>
                                        Remove
                                    </button>
                                }    
                            </div>
                        ))
                    ) : (
                        user.connections.map((friend) => {
                            const alreadyMember = selectedGroup.members.some(m => m._id === friend._id);
                            return (
                                <div
                                    key={friend._id}
                                    className="flex items-center justify-between bg-[#2f678e] p-3 rounded-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar sx={{ width: 40, height: 40 }} src={friend?.profilePic}/>
                                        <div>
                                            <p className="font-medium">{friend.name}</p>
                                            <p className="text-sm text-gray-300">{friend.email}</p>
                                        </div>
                                    </div>
                                    {!alreadyMember && (
                                        <button className="px-3 py-1 bg-[#27597cee] text-sm rounded-md hover:bg-[#27597c] transition cursor-pointer"
                                            onClick={()=>{addMember(friend._id, selectedGroup._id, setSelectedGroup, setGroups ,toast, socket)}}
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </Dialog>
    );
}
