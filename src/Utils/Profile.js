import url from "./Url";

export async function editProfile(name, profilePic,toast,setUser){
    try{
        const formData = new FormData();
        if(!name && !profilePic){
            toast.error("fill the form");
            return
        }
        if(name){
            formData.append("name",name);
        }
        if(profilePic){
            formData.append("media",profilePic)
        }
        const response = await fetch(url+"/api/profile/editProfile",{
            method: "PUT",
            credentials: 'include',
            body: formData
        })
        if(response.status===201){
            const data = await response.json();
            setUser(data);
            toast.success("profile edited")
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