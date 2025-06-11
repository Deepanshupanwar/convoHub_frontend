import url from "./Url";

export async function getChats(setState) {
    try {
        setState.setLoading(true);
        const response = await fetch(url+"/api/chat/getChats", {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        const sortedChats = [...data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setState.setChats(sortedChats)
        setState.setLoading(false);
    }
    catch (err) {
        console.log(err);
    }
}


export function getSingleChat(chatId, setSelectedChat, chats, setSelected) {
    try {
        const singleChat = chats.find((chat) => chat._id === chatId);
        setSelectedChat(singleChat);
        setSelected("SingleChat");
    }
    catch (err) {
        console.log(err);
    }
}

export async function sendMessage(selectedChat, setChat, message, receiver, setChats, socket) {
    try {
        if (message.type === "text") {
            let content = message.content;
            content = content.trim();
            if (!content) return;

            const response = await fetch(`${url}/api/chat/send/${selectedChat._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: content,
                    messageType: "text",
                    receiverId: receiver._id,
                }),
            });

            if (response.status === 201) {
                const data = await response.json();
                setChat({ ...selectedChat, messages: [...selectedChat.messages, data], lastMessage: data });
                setChats((prev) => prev.map(chat => chat._id == selectedChat._id ? { ...chat, messages: [...chat.messages, data], lastMessage: data } : chat));
                socket.emit("SendChatMessage", {
                    receiverId: data.receiver,
                    message: data
                })
            }

        } else if (message.type === "file" || message.type === "image") {
            const formData = new FormData();
            formData.append("media", message.content);
            formData.append("messageType", message.type);
            formData.append("receiverId", receiver._id);

            const response = await fetch(`${url}/api/chat/send/${selectedChat._id}`, {
                method: "PUT",
                credentials: "include",
                body: formData
            });

            if (response.status === 201) {
                const data = await response.json();
                setChat({ ...selectedChat, messages: [...selectedChat.messages, data], lastMessage: data });
                setChats((prev) => prev.map(chat => chat._id == selectedChat._id ? { ...chat, messages: [...chat.messages, data], lastMessage: data } : chat));
                socket.emit("SendChatMessage", {
                    receiverId: data.receiver,
                    message: data
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
}


export const realTimeChat = (message, setSelectedChat, setChats) => {

    setChats(prev => prev.map(chat =>
        chat.participants.some(p => p._id === message.sender)
            ? {
                ...chat,
                messages: [...chat.messages, message],
                lastMessage: message,
            }
            : chat
    ))

    setSelectedChat((prev) => prev === null ? null : prev.participants.some(p => p._id === message.sender) ? {
        ...prev, messages: [...prev.messages, message],
        lastMessage: message,
    } : prev)
}
