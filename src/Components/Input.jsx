import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

export default function InputComp({message,fileInputRef,handleFileChange,handleSend,handleKeyPress,loading,setMessage}){
    return (
         < >

                {message.type !== "text" && message.content && (
                    <div className="flex items-center gap-3 bg-white border p-2 rounded-md">
                        {message.type === "image" ? (
                            <img
                                src={URL.createObjectURL(message.content)}
                                alt="preview"
                                className="h-16 w-16 object-cover rounded-md"
                            />
                        ) : (
                            <div className="flex items-center gap-2 text-sm text-gray-800">
                                📎 <span>{message.content.name}</span>
                            </div>
                        )}
                        <button
                            onClick={(e) => {
                                setMessage({ content: "", type: "text" });
                                fileInputRef.current.value = ""
                        }}
                            className="ml-auto text-red-500 font-semibold cursor-pointer"
                        >
                            cancel <CancelIcon />
                        </button>
                    </div>
                )}
                <div className="flex items-center gap 3">
                    <IconButton onClick={() => fileInputRef.current.click()}>
                        <AttachFileIcon />
                    </IconButton>
                    <input
                        ref={fileInputRef}
                        
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*,.pdf,.txt"
                        hidden
                    />
                    <textarea
                        rows={1}
                        value={message.type === "text" ? message.content : ""}
                        onChange={(e) => setMessage({ content: e.target.value, type: "text" })}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 resize-none border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#27587c]"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="bg-[#214f6f] text-white px-4 py-2 rounded-lg hover:bg-[#1f3f5e] transition cursor-pointer ml-1"
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </div>
            </>
    )
}