import { useState } from "react";
import { Dialog } from "@mui/material";
import { useUser } from "../Context/userContext";

export default function CreateGroupBox({ open, onClose, onCreate }) {
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { user } = useUser();
    const connections = user.connections;

    const toggleUser = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleCreate = () => {
        const name = groupName.trim();
        if (!name || selectedUsers.length === 0) return;
        onCreate({ name, members: [user._id, ...selectedUsers] });
        setGroupName("");
        setSelectedUsers([]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="bg-[#133c55] text-white p-6 rounded-xl w-full">
                <h2 className="text-2xl font-semibold mb-4">Create New Group</h2>

                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#1e4f70] text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                />

                <div className="max-h-60 overflow-y-auto space-y-2 mb-4 bg-[#1e4f70] p-3 rounded-md">
                    {connections.map((conn) => (
                        <div
                            key={conn._id}
                            className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-[#2a5a7a]"
                            onClick={() => toggleUser(conn._id)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(conn._id)}
                                onChange={() => toggleUser(conn._id)}
                            />
                            <div>
                                <p className="font-medium">{conn.name}</p>
                                <p className="text-sm text-gray-300">{conn.email}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                      
                        className="px-4 py-2 rounded-md bg-[#133c55] hover:bg-[#0682b5] cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-[#0c7dab] hover:bg-[#0682b5] rounded-md cursor-pointer"
                    >
                        Create
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
