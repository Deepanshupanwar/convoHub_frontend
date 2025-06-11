import { useChat } from "../Context/chatContext";
import { useUser } from "../Context/userContext";
import Avatar from "@mui/material/Avatar";
import { getSingleChat } from "../Utils/Chats";
import { useUtility } from "../Context/utilityContext";


export default function Connections() {
    const { user } = useUser();
    const {chats, setSelectedChat} = useChat();
     const {setSelected} = useUtility();
    const connections = user.connections ?? [];

    return (
        <div className="p-6 max-w-3xl mx-auto text-white">
            <h2 className="text-2xl font-semibold mb-6">Your Connections</h2>

            {connections.length > 0 && chats.length>0 ? (
                <div className="flex flex-col gap-4">
                    {connections.map((val, index) => {
                        const chatId = chats.find((chat)=> chat.participants[0]._id === val._id||chat.participants[1]._id === val._id)._id
                        return (<div
                            key={index}
                            className="flex items-center justify-between bg-[#27587c] hover:bg-[#2f678e] transition rounded-xl px-4 py-3"
                        >
                            <div className="flex items-center gap-4">
                                <Avatar src={val?.profilePic} alt={val.name} />
                                <div>
                                    <p className="font-medium text-white">{val.name}</p>
                                    <p className="text-sm text-gray-300">{val.email}</p>
                                </div>
                            </div>
                            <button className="bg-[#0c7dab] hover:bg-[#0682b5] cursor-pointer  transition px-4 py-1 rounded-md text-sm"
                            onClick={()=>{getSingleChat(chatId,setSelectedChat,chats,setSelected)}}
                            >
                                Chat
                            </button>
                        </div>)}
                    )}
                </div>
            ) : (
                <div className="text-center text-gray-300 mt-10">
                    <p>No connections yet.</p>
                </div>
            )}
        </div>
    );
}
