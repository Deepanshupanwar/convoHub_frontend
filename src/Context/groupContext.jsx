import { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <GroupContext.Provider value={{ groups, setGroups, selectedGroup, setSelectedGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
