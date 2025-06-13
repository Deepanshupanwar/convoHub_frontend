import url from "./Url";

export async function LoginHandler(setUser, useremailRef, passwordRef, toast) {
    try {
        const useremail = useremailRef.current.value;
        const password = passwordRef.current.value;
        if (useremail.length > 0 && password.length > 0) {
            const response =  await fetch(url+"/api/auth/login",{
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({email: useremail,password: password}),
                credentials: 'include'
            })
            if(response.status === 201){
                const data = await response.json();
                setUser(data);
                toast.success("logged in succesfully");
            }
            else{
                const message = await response.json();
                toast.error(message.message);
            }
        }
        else{
            toast.error("fill all details");
        }
    }
    catch (err) {
        console.log(err)
    }
}


export function googleLoginHandler(){
    window.open(url+"/api/auth/google","_self");
}


export async function logout(setState) {
    try{
        const response = await fetch(url+"/api/auth/logout",{
            method: "POST",
            credentials: "include"
        })
        if(response.status ===200){
            setState.setUser(null);
            setState.setSelected("default");
            setState.setChats([]);
            setState.setSelectedChat(null);
            setState.setGroups([]);
            setState.setSelectedGroup(null);
            setState.socket.disconnect();
        }
    }
    catch(err){
        console.log(err);
    }
}

export async function RegisterHandler(setUser,confirmpasswordRef,passwordRef,useremailRef,usernameRef,toast) {
    try {
        const useremail = useremailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmpasswordRef.current.value;
        const username = usernameRef.current.value;
        if(confirmPassword!==password){
            alert("password doesnt't match")
        }
        else if (username.length > 0 && password.length > 0 && confirmPassword.length>0 && useremail.length>0) {
            const response =  await fetch(url+"/api/auth/register",{
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({email: useremail,password: password, name:username}),
                credentials: 'include'
            })
            if(response.status === 201){
                const data = await response.json();
                setUser(data);
                toast.success("user registered succesfully");
            }
            else{
                const message = await response.json();
                toast.error(message.message);
            }
        }
        else{
            toast.error("fill all fields")
        }
    }
    catch (err) {
        console.log(err)
    }
}


export async function getUser(setUser, toast) {
    try{
        const response = await fetch(url+"/api/auth/checklogin",{
            method: "GET",
            credentials: "include"
        });
        if(response.status===200){
            const data = await response.json();
            setUser(data);
            toast.success("logged in successfully")
        }
        else{
            const message = await response.json();
            toast.error(message.message)
        }
    }
    catch(err){
        console.log(err)
    }
}

export async function getOauthUser(setUser, toast, token) {
    try{
        const response = await fetch(url+"/api/auth/checklogin",{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            },
            credentials: "include"
        });
        if(response.status===200){
            const data = await response.json();
            setUser(data);
            toast.success("logged in successfully")
        }
        else{
            const message = await response.json();
            toast.error(message.message)
        }
    }
    catch(err){
        console.log(err)
    }
}

