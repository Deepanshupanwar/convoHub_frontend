import { Avatar } from "@mui/material";
import { useUser } from "../Context/userContext";
import { useRef, useEffect, useState } from "react";
import { sendGroupMessage } from "../Utils/groups";
import { useGroup } from "../Context/groupContext";
import InputComp from "./Input";
import { useUtility } from "../Context/utilityContext"
import EditGroupBox from "./EditGroupBox";

export default function GroupChat() {
    const { user } = useUser();
    const { selectedGroup, setSelectedGroup, setGroups } = useGroup()
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState({ content: "", type: "text" });
    const { loading, setLoading, socket } = useUtility();
    const [open, setOpen] = useState(false);

    const handleKeyPress = async (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setLoading(true);
            await sendGroupMessage(selectedGroup, setSelectedGroup, message,setGroups,socket);
            setMessage({ content: "", type: "text" });
            setLoading(false);
            fileInputRef.current.value = ""
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        setLoading(true)
        await sendGroupMessage(selectedGroup, setSelectedGroup, message, setGroups, socket);
        setMessage({ content: "", type: "text" });
        setLoading(false);
        fileInputRef.current.value = ""
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const isValid =
            file.type.startsWith("image/") ||
            file.type === "application/pdf" ||
            file.type === "text/plain";

        if (isValid) {
            let type = file.type.startsWith("image/") ? "image" : "file";
            setMessage({ content: file, type: type });
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);

        return () => clearTimeout(timeout);
    }, [selectedGroup?.messages]);

    return (
        <div className="flex flex-col h-full bg-[#2f678e] font-[Poppins]">
            <EditGroupBox open={open}  onClose={() => setOpen(false)}/>
            <div className="flex items-center gap-3 p-4 bg-[#27587c] text-white shadow-sm border-b-1 cursor-pointer"
                onClick={()=>{setOpen(true)}}
            >
                <Avatar src={selectedGroup?.groupPic} />
                <div>
                    <p className="font-medium text-lg">{selectedGroup?.name}</p>
                    <p className="text-sm text-gray-200">{selectedGroup?.members.length} members</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {selectedGroup.messages.map((msg) => {
                    const isSender = msg.sender._id === user._id;
                    return (
                        <div key={msg._id} className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
                            {!isSender && (
                                <span className="text-xs text-white mb-1 ml-2">{msg.sender.name}</span>
                            )}
                            <div
                                className={`px-4 py-2 rounded-xl text-sm shadow-sm inline-block whitespace-pre-wrap break-words ${isSender ? "bg-[#27587c] text-white" : "bg-gray-200 text-gray-900"
                                    }`}
                                style={{ maxWidth: "75%" }}
                            >
                                {msg.messageType === "text" && msg.content}
                                {msg.messageType === "image" && (
                                    <img
                                        src={msg.content}
                                        alt="sent-img"
                                        className="rounded-md max-w-xs"
                                    />
                                )}
                                {msg.messageType === "file" && (
                                    <a
                                        href={msg.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        📎 Open File
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="px-4 py-3 border-t border-t-white bg-[#2f678e] flex flex-col gap-2">
                <InputComp message={message} fileInputRef={fileInputRef} handleFileChange={handleFileChange} handleSend={handleSend} handleKeyPress={handleKeyPress} loading={loading} setMessage={setMessage} />
            </div >
        </div>
    );
}
