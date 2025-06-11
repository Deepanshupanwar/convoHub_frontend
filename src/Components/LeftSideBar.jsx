import LeftSidebarItem from "../Components/LeftSideBarItem"
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import Groups2Icon from '@mui/icons-material/Groups2';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from "@mui/icons-material/Chat";


export default function LeftSideBar() {
 
    return (
        <div className="h-screen w-64 bg-[#133c55]shadow-md flex flex-col justify-between px-4 py-6 font-[Poppins]">

            <div className="flex items-center gap-2 px-2">
                <ChatIcon className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-white">ConvoHub</h1>
            </div>

            <div className="mt-10 space-y-4">
                <LeftSidebarItem icon={<SearchIcon />} label="Search"/>
                <LeftSidebarItem icon={<MessageIcon />} label="Chats"/>
                <LeftSidebarItem icon={<Groups2Icon />} label="Groups"/>
                <LeftSidebarItem icon={<PersonOutlineOutlinedIcon />} label="Connections" />
            </div>

            <div className="space-y-4">
                <LeftSidebarItem icon={<PersonIcon />} label="Profile" />
                <LeftSidebarItem icon={<LogoutIcon />} label="Logout"  />
            </div>

        </div>

    )
}