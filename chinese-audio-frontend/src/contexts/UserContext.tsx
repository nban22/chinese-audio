import { createContext, useState } from "react";


const UserContext = createContext({});

interface UserContextProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    
    
    
    return (
        <UserContext.Provider value={{user, loading, role}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;