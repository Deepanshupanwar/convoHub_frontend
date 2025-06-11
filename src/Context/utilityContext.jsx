import { createContext, useContext, useState } from "react";
import socket from "../Utils/socket";

const UtilityContext = createContext();

export const useUtility = () => useContext(UtilityContext);

export const UtilityProvider = ({children})=>{
    const [notification,setNotification] = useState('');
    const [selected, setSelected] = useState('default');
    const [loading ,setLoading] = useState(false);
    return (
        <UtilityContext.Provider value={{notification,setNotification, selected, setSelected, loading, setLoading, socket}}>
            {children}
        </UtilityContext.Provider>
    )
}