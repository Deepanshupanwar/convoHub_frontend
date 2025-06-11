import url from "./Url";

export async function  getGroups(setState) {
    try{
        setState.setLoading(true);
        const response  = await fetch(url+"/api/groupChat/getGroupChats",{
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        const sortedChats = [...data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setState.setGroups(sortedChats);
        setState.setLoading(false);
    }
    catch(err){
        console.log(err);
    }
}

export  function getSingleGroup(groupId, groups, setSelectedGroup, setSelected) {
    const group = groups.find((val) => val._id === groupId);
    setSelectedGroup(group);
    setSelected("GroupChat")
}


export async function sendGroupMessage(chat, setSelectedGroup, message, setGroups, socket) {
     try {
        if (message.type === "text") {
            let content = message.content;
            content = content.trim();
            if (!content) return;

            const response = await fetch(`${url}/api/groupChat/send/${chat._id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: content,
                    messageType: "text",
                }),
            });

            if (response.status === 201) {
                const data = await response.json();
                setSelectedGroup({ ...chat, messages: [...chat.messages, data], lastMessage: data });
                setGroups((prev)=> prev.map(group => group._id === chat._id ? {...chat,messages: [...chat.messages,data], lastMessage: data }: group));
                socket.emit("SendGroupMessage",{
                    members: chat.members,
                    message: data
                })
            }

        } else if (message.type === "file"|| message.type === "image") {
            const formData = new FormData();
            formData.append("media", message.content); 
            formData.append("messageType", message.type);

            const response = await fetch(`${url}/api/groupChat/send/${chat._id}`, {
                method: "POST",
                credentials: "include",
                body: formData 
            });

            if (response.status === 201) {
                const data = await response.json();
                setSelectedGroup({ ...chat, messages: [...chat.messages, data], lastMessage: data });
                setGroups((prev)=> prev.map(group => group._id === chat._id ? {...chat,messages: [...chat.messages,data], lastMessage: data }: group))
                socket.emit("SendGroupMessage",{
                    members: chat.members,
                    message: data
                })
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export async function createGroup(groupData,setGroups,toast,socket,setUser){
    try{
        const response = await fetch(url+"/api/groupChat/create",{
            method: "POST",
            credentials: "include",
            headers: {
                    'Content-Type': "application/json"
            },
            body: JSON.stringify(groupData),

        })
        if(response.status===200){
            const data = await response.json();
            setGroups((prev)=> [data,...prev]);
            socket.emit("SendGroup",{members: groupData.members, group: data});
            setUser((prev)=> {return {...prev, groups: [...prev.groups, data._id]}})
            toast.success("group created");
        }
        else{
            const message = await response.json();
            toast.error(message.message);
        }
    }
    catch(err){
        console.log(err);
    }
}

export async function addMember(memberId, groupId, setSelectedGroup, setGroups ,toast, socket){
    try{
        const response = await fetch(`${url}/api/groupChat/${groupId}/add`,{
            method: "POST",
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({memberId: memberId})
        })
        if(response.status === 200){
            const data = await response.json();
            setSelectedGroup(data)
            setGroups(prev => prev.map((group)=> group._id === data._id? data: group));
            socket.emit("addMember", {recieverId: memberId, group: data});
            const members = data.members.filter((member)=> member._id !== memberId);
            socket.emit("newMemberAdded", {members, group: data});
            toast.success("member added");
        }
        else{
            const message = await response.json();
            toast.error(message.message);
        }

    }
    catch(err){

    }
}

export async function UpdateIcon(groupId, file, setSelectedGroup ,toast){
    try{
        const formData = new FormData();
        formData.append("media", file);
        const response = await fetch(url+"/api/groupChat/updateIcon/"+groupId,{
            method: "PUT",
            credentials: 'include',
            body: formData
        }) 
        if(response.status==200){
            const data = await response.json();
            setSelectedGroup((prev)=> { return {...prev, groupPic: data.groupIcon}})
            toast.success("groupPic changed")
        }
        else{
            const message = await response.json();
            toast.error(message.message);
        }
    }
    catch(err){
        console.log(err);
    }
}

export const realTimeGroupChat = (message,setSelectedGroup,setGroups) => {

        setGroups(prev=> prev.map(group=>
            group._id === message.group
          ? {
            ...group,
            messages: [...group.messages, message],
            lastMessage: message,
          }
          : group
        ))    
      setSelectedGroup((prev)=> prev===null? null: prev._id===message.group? {...prev,  messages: [...prev.messages, message],
            lastMessage: message}: prev)
    }

export const removeMember = async (memberId, groupId,setSelectedGroup, setGroups, socket,toast)=>{
    try{
        const response = await fetch(`${url}/api/groupChat/${groupId}/remove`,{
            method: "POST",
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({memberId: memberId})
        });
        if(response.status === 200){
            const data = await response.json();
            setSelectedGroup(data);
            setGroups(prev => prev.map((group)=> group._id === data._id? data: group));
            toast.success("member removed");
            socket.emit("removeMember", {recieverId:memberId, groupId});
            const members = data.members.filter((member)=> member._id !== memberId);
            socket.emit("memberRemoved",{members, groupId, memberId});

        }
        else{
            const message = await response.json();
            toast.error(message.message)
        }
    }
    catch(err){
        console.log(err);
    }
} 