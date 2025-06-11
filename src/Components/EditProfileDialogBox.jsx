import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useState } from "react";
import { editProfile } from "../Utils/Profile";
import {useUser}  from "../Context/userContext";
import toast from "react-hot-toast";

export default function EditProfileDialog({ open, onClose }) {
  const [name, setName] = useState(null);
  const [profilePic, setProfilePic] = useState(null)
  const {setUser} = useUser()

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth >
      <div className="p-6 font-[Poppins]  rounded-lg bg-[#1d4d70]">
        <h2 className="text-center text-2xl font-semibold text-white mb-6 border-blue-700">
          Edit Profile
        </h2>

        <div className="space-y-5 text-white">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={name ? name : ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4fa2] transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium  mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e)=> setProfilePic(e.target.files[0])}
              className="block w-full text-sm  file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0 file:text-sm file:font-medium
                file:bg-[#e1ecf9] file:text-[#2e4fa2] hover:file:bg-[#d0e1f9] transition"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="capitalize"
            sx={{
              color: '#0c7dab',
              '&:hover': {
                backgroundColor: '#0682b5',
                color: '#93c5fd',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={()=>{
              editProfile(name,profilePic,toast,setUser);
              setName(null);
              setProfilePic(null);
              onClose()
            }}
            className="capitalize text-white px-4 py-2 rounded-md shadow-md"
            sx={{
              color: '#0c7dab',
              '&:hover': {
                backgroundColor: '#0682b5',
                color: '#93c5fd',
              },
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
