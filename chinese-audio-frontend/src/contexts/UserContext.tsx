import { createContext, useState } from "react";
import { getMe } from "../services/authServices";


const UserContext = createContext({
    user: null as any,
    loading: true,
    role: null,
    login: (token?: string) => {},
    logout: () => {}
});

interface UserContextProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('role') || 'null'));

    const setGuest = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }

    const getUser = async (token?: string) => {
        if (token) {
            localStorage.setItem('token', token);
        }
        try {
            const responseData = await getMe();
            setUser(responseData.user);
            setRole(responseData.user.role);
            localStorage.setItem('user', JSON.stringify(responseData.user));
            localStorage.setItem('role', JSON.stringify(responseData.user.role));
        } catch (error) {
            setGuest();
        } finally {
            setLoading(false);
        }
    }

    const login = (token?: string) => getUser(token);
    const logout = () => setGuest();
    
    return (
        <UserContext.Provider value={{user, loading, role, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;