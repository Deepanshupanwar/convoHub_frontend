import { useChat } from "../Context/chatContext";
import { useUser } from "../Context/userContext";
import { useUtility } from "../Context/utilityContext";
import { getSingleChat } from "../Utils/Chats";
import { ClipLoader } from "react-spinners";

export default function ChatList() {
  const { chats, setSelectedChat } = useChat();
  const { setSelected, loading } = useUtility();
  const { user } = useUser();
  const sortedChats = [...chats].sort((a, b) => {
    const aTime = new Date(a.lastMessage?.updatedAt || a.updatedAt);
    const bTime = new Date(b.lastMessage?.updatedAt || b.updatedAt);
    return bTime - aTime;
  });
  return (
    <div className="flex justify-center p-8 text-white">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Chats</h2>
        {loading === true ? <div className="flex items-center justify-center">
          <ClipLoader
            color={"#ffffff"}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader" /></div> :
          sortedChats.length > 0 ? (
            <div className="space-y-4">
              {sortedChats.map((chat, index) => {
                const otherParticipant = chat.participants?.find(
                  (p) => p._id !== user._id
                );

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#27587c] hover:bg-[#2f678e] transition-colors duration-200 px-5 py-4 rounded-xl cursor-pointer"
                    onClick={() => { getSingleChat(chat._id, setSelectedChat, chats, setSelected) }}
                  >
                    <div>
                      <p className="text-lg font-medium">{otherParticipant?.name}</p>
                      <p className="text-sm text-gray-300">{otherParticipant?.email}</p>
                    </div>
                    <div className="text-right max-w-[50%]">
                      {chat.lastMessage ? (
                        chat.lastMessage.messageType === "text" ? (
                          <p className="text-sm text-gray-200 truncate">
                            {chat.lastMessage.content.slice(0, 60)}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400 italic">📎 Media</p>
                        )
                      ) : (
                        <p className="text-sm text-gray-400 italic">No messages yet</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-300">No chats available.</p>
          )}
      </div>
    </div>
  );
}
