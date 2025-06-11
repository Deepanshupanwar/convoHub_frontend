import LeftSideBar from "../Components/LeftSideBar";
import { useUser } from "../Context/userContext";
import { Navigate } from "react-router-dom";
import { useUtility } from "../Context/utilityContext";
import ChatList from "../Components/ChatsList";
import Connections from "../Components/Connections";
import GroupChat from "../Components/GroupChat";
import GroupList from "../Components/GroupsList";
import SingleChat from "../Components/SingleChat";
import Search from "../Components/Search";
import Profile from "../Components/Profile";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { getChats, realTimeChat } from "../Utils/Chats";
import { getGroups, realTimeGroupChat } from "../Utils/groups";
import { logout } from "../Utils/auth"
import { useGroup } from "../Context/groupContext";
import { useChat } from "../Context/chatContext";

function Default() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">Welcome to ConvoHub</h2>
      <p className="text-gray-300">
        Select an option from the sidebar to get started.
      </p>
    </>
  )
}

export default function MainPage() {
  const { user, setUser } = useUser()
  const { selected, socket, setSelected, setLoading } = useUtility();
  const { setGroups, setSelectedGroup, selectedGroup } = useGroup();
  const { setChats, setSelectedChat, selectedChat } = useChat();
  const selectedChatRef = useRef(selectedChat);
  const selectedGroupRef = useRef(selectedGroup);

  if (selected === "Logout") {
    logout({ setUser, setGroups, setChats, setSelected, setSelectedChat, setSelectedGroup, socket });
  }

  const display = [{ name: "Chats", Component: <ChatList /> },
  { name: "Connections", Component: <Connections /> },
  { name: "GroupChat", Component: <GroupChat /> },
  { name: "Groups", Component: <GroupList /> },
  { name: "SingleChat", Component: <SingleChat /> },
  { name: "Search", Component: <Search /> },
  { name: "Profile", Component: <Profile /> },
  { name: "default", Component: <Default /> }
  ].find((val) => val.name === selected);

  const getData = async () => {
    await getChats({ setChats, setLoading });
    await getGroups({ setGroups, setLoading });
  }

  useEffect(() => {

    if (!user) return;
  if (!socket) return;

  socket.connect();
    getData()


    socket.connect()

  

    console.log("Registering socket listeners...");

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("receive-message", (message) => {
      if (selectedChatRef.current=== null || !selectedChatRef.current.participants.some(p => p._id === message.sender)) {
        toast.success("new message received")
      }
      realTimeChat(message, setSelectedChat, setChats)
    });

    socket.on("receiveGroupMessage", (message) => {
      if (selectedGroupRef.current == null || selectedGroupRef.current._id!==message.group) {
        toast.success("new message received in Group")
      }
      realTimeGroupChat(message, setSelectedGroup, setGroups)
    })

    socket.on("getRequest",(sender)=>{
      console.log(sender)
      setUser((prev) => { return {...prev, requestsReceived: [...prev.requestsReceived, sender]}});
      toast.success("connection request received")
    })

    socket.on("getRejectRequest",(receiverId)=>{
      setUser(prev=> {return {...prev, requestsSent: prev.requestsSent.filter((id)=> id!==receiverId)}});
      toast.error("request rejected");
    })

    socket.on("getAcceptRequest", ({recevierId, chat, friend})=>{
      setChats(prev => [chat, ...prev]);
      setUser(prev=> {return {...prev, requestsSent: prev.requestsSent.filter((id)=> id!==recevierId), connections: [friend, ...prev.connections]}});
      toast.success("request accepted")
    })

    socket.on("receiveGroup", (data)=>{
      setGroups(prev => [data, ...prev]);
       setUser({...user, groups: [...user.groups, data._id]})
      toast.success("you have been added to group "+ data.name)
    })

    socket.on("addedToGroup", (group)=>{
      setGroups(prev => [group, ...prev]);
      setUser({...user, groups: [...user.groups, group._id]})
      toast.success("you have been added to group "+ group.name)
    })

    socket.on("receiveNewMember", (data)=>{
        if(selectedGroupRef.current!==null && selectedGroupRef.current._id === data._id){
          setSelectedGroup(data);
        }
        setGroups(prev => prev.map((group)=> group._id === data._id? data: group));
        toast.success("new member added to group "+data.name)
    })

    socket.on("removedFromGroup",(groupId)=>{
      setGroups(prev => prev.filter(group => group._id !== groupId));
      if(selectedGroupRef.current!==null && selectedGroupRef.current._id === groupId){
        toast.error("you have been removed from group "+selectedGroupRef.current.name);
        setSelectedGroup(null);
        setSelected("default");
      }
    })

    socket.on("memberRemovedFromGroup", ({groupId, memberId})=>{
        if(selectedGroupRef.current!==null && selectedGroupRef.current._id == groupId){
          setSelectedGroup(prev => prev._id === groupId?  {...prev, members: prev.members.filter(member => member._id !== memberId)}: prev)
          toast.error("member have been removed");
        }
        setGroups(prev => prev.map((group)=> group._id === groupId?  {...group, members: group.members.filter(member => member._id !== memberId)}: group));
        
    })

    socket.on("disconnect", () => {
      console.log("🔌 Disconnected from socket:", socket.id);
    });

    return () => {
      console.log("🧹 Cleaning up socket listeners...");
      socket.off("connect");
      socket.off("receive-message");
      socket.off("disconnect");
      socket.off("receiveGroupMessage");
      socket.off("getRequest");
      socket.off("getRejectRequest");
      socket.off("getAcceptRequest");
      socket.off("receiveGroup");
      socket.off("addedToGroup");
      socket.off("receiveNewMember");
      socket.off("removedFromGroup");
      socket.off("memberRemovedFromGroup")

    };
  }, [socket, user])

  useEffect(() => {
    selectedChatRef.current = selectedChat
  }, [selectedChat])

  useEffect(() => {
    selectedGroupRef.current = selectedGroup
  }, [selectedGroup])


  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex h-screen font-[Poppins]">
      <Toaster />
      <LeftSideBar />
      <div className="flex-1 bg-[#1d4d70] p-6 overflow-auto">
        {display?.Component}
      </div>
    </div>

  )
}