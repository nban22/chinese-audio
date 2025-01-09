import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const useUser = () => useContext(UserContext);

if (!useUser) {
    throw new Error("useUser must be used within a UserProvider");
}

export default useUser;