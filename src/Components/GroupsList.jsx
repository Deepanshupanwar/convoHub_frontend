import { Avatar } from "@mui/material";
import { useGroup } from "../Context/groupContext";
import { useUtility } from "../Context/utilityContext";
import { getSingleGroup } from "../Utils/groups";
import { ClipLoader } from "react-spinners";
import CreateGroupBox from "./CreateGroupBox"; 
import { createGroup } from "../Utils/groups"; 
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../Context/userContext";
export default function GroupList() {
  const { groups, setGroups, setSelectedGroup } = useGroup();
  const {setUser} = useUser();
  const { setSelected, loading, socket } = useUtility();
  const [open, setOpen] = useState(false);

  const sortedGroups = [...groups].sort((a, b) => {
  const aTime = new Date(a.lastMessage?.updatedAt || a.updatedAt);
  const bTime = new Date(b.lastMessage?.updatedAt || b.updatedAt);
  return bTime - aTime;
});

  const handleGroupCreate = async (groupData) => {
    await createGroup(groupData, setGroups, toast, socket, setUser);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-white font-semibold">Groups</h2>
        <button
          className="bg-[#0c7dab] p-2 rounded-sm text-white hover:bg-[#0c7eabd2] cursor-pointer"

          onClick={() => setOpen(true)}
        >
          + Create Group
        </button>
      </div>

      <CreateGroupBox
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleGroupCreate}
      />

      {loading ? (
        <div className="flex items-center justify-center">
          <ClipLoader color={"#ffffff"} loading={loading} size={100} />
        </div>
      ) : sortedGroups.length > 0 ? (
        sortedGroups.map((group, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-[#27587c] hover:bg-[#2f678e] p-4 rounded-xl shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              getSingleGroup(group._id, groups, setSelectedGroup, setSelected)
            }
          >
            <Avatar sx={{ width: 48, height: 48 }} src={group?.groupPic}/>
            <div className="flex flex-col">
              <p className="font-semibold text-white">{group.name}</p>
              {group.lastMessage ? (
                <p className="text-sm text-gray-300 mt-1">
                  {group.lastMessage.messageType === "text"
                    ? group.lastMessage.content
                    : "Media"}
                </p>
              ) : (
                <p className="text-sm text-gray-400 mt-1">No message yet</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-6">No groups found.</div>
      )}
    </div>
  );
}
