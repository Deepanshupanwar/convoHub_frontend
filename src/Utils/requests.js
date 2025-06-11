import url from "./Url";

export async function sendRequest(receiverId, setUser, setLoading, toast, user, socket) {
    try {
        setLoading(true);
        const response = await fetch(url+"/api/connect/send-request/" + receiverId, {
            method: 'POST',
            credentials: 'include'
        })
        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            setUser((prev)=> {return {...prev,requestsSent:[... prev.requestsSent, receiverId]}});
            socket.emit("sendRequest", {receiverId, sender: {name: user.name, _id: user._id, profilePic: user.profilePic, email: user.email}});
            toast.success("request sent")
        }
        else{
            const message = await response.json();
            toast.error(message.message)
        }
        setLoading(false);
    }
    catch (err) {
        console.log(err)
        setLoading(false);
    }
}

export async function accpetRequest(senderId,setUser,setLoading, toast, setChats, socket, user) {
    try {
        setLoading(true);
        const response = await fetch(url+"/api/connect/accept-request/" + senderId, {
            method: "POST",
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            setUser(data.user)
            setChats(prev => [data.chat, ...prev]);
            socket.emit("sendAcceptRequest",{senderId, chat: data.chat, connection: {name: user.name, _id: user._id, profilePic: user.profilePic, email: user.email}});
            toast.success("request accepted")
        }
        else{
            const message = await response.json();
            toast.error(message.message);
        }
        setLoading(false);

    }
    catch (err) {
        console.log(err)
        setLoading(false);
    }
}

export async function rejectRequest(senderId,setUser, setLoading, toast, socket) {
    try {
        setLoading(true);
        const response = await fetch(url+"/api/connect/reject-request/" + senderId, {
            method: "POST",
            credentials: 'include'
        });
        if (response.status === 200) {
            const data = await response.json();
            socket.emit("sendRejectRequest", {senderId})
            setUser(data.user)
            toast.success("request rejected")
        }
        else{
            const message = await response.json();
            toast.error(message.message);
        }
        setLoading(false);
    }
    catch (err) {
        console.log(err)
        setLoading(false);
    }
}