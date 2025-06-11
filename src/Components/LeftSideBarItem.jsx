import { useUtility } from "../Context/utilityContext"
import { useGroup } from "../Context/groupContext";
import { useChat } from "../Context/chatContext";


export default function LeftSidebarItem({ icon, label}) {
  const {setSelectedGroup} = useGroup();
  const { setSelected } = useUtility();
  const {setSelectedChat} = useChat();
  return (
    <div className="flex items-center gap-3 text-white hover:text-blue-600 cursor-pointer px-2 py-2 rounded-md hover:bg-gray-100 transition"
      onClick={() => {
        setSelected(label)
        setSelectedChat(null);
        setSelectedGroup(null)
      }}
    >
      <span className="">{icon}</span>
      <span className="text-base">{label}</span>
    </div>
  )
};
