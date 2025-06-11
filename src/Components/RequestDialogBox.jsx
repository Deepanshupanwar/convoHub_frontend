import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useUser } from "../Context/userContext";
import { accpetRequest, rejectRequest } from "../Utils/requests";
import { useUtility } from "../Context/utilityContext";
import toast from "react-hot-toast";
import { Avatar } from "@mui/material";
import { useChat } from "../Context/chatContext";

export default function RequestDialogBox({ open, onClose }) {
  const { user, setUser } = useUser();
  const {setChats} = useChat();
  const { loading, setLoading, socket } = useUtility()

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: '#133c55', color: '#f0f0f0' } }}>
      <DialogTitle className="text-center font-semibold text-white text-lg border-b border-blue-700">
        Pending Requests
      </DialogTitle>

      <DialogContent dividers>
        {user?.requestsReceived.length > 0 ? (
          <div className="space-y-4 mt-2">
            {user.requestsReceived.map((val, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#1d4d70] rounded-lg p-3 shadow-md hover:bg-[#295e88] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={val.profilePic} alt={val.name} sx={{ width: 48, height: 48 }} />
                  <div>
                    <p className="font-semibold text-white">{val.name}</p>
                    <p className="text-sm text-blue-200">{val.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    className="capitalize"
                    disabled={loading}
                    onClick={() => rejectRequest(val._id, setUser, setLoading, toast,socket)}
                    sx={{
                      borderColor: '#f87171',
                      color: '#f87171',
                      '&:hover': {
                        backgroundColor: '#f87171',
                        color: '#fff',
                        borderColor: '#f87171',
                      },
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className="capitalize"
                    onClick={() => accpetRequest(val._id, setUser, setLoading, toast, setChats ,socket, user)}
                    sx={{
                      backgroundColor: '#0c7dab',
                      '&:hover': {
                        backgroundColor: '#0682b5',
                      },
                    }}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-blue-300 py-6">
            No pending requests at the moment.
          </p>
        )}
      </DialogContent>

      <DialogActions className="px-6 pb-4 border-t border-blue-700">
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
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
