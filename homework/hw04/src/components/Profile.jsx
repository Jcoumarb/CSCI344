import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Profile({ token }) {
    
    const [user,setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const data = await getDataFromServer(token, "/api/profile/");
            console.log(data);
            setUser(data);
        }

        getUser();
    }, [token]);

    if (!user) return null;

    return (
        <header className="flex gap-4 items-center">
            <img src={user.image_url} alt={user.image_url} className= "w-20 h-20 object-cover rounded-full" />
            <h2 className="font-Comfortaa font-bold text-2xl">{user.username}</h2>
        </header>
    );
}
