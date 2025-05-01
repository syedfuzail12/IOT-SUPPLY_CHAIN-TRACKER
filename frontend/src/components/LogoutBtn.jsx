import React from 'react'
import useAuthStore from '../store/authStore';


function LogoutBtn({
    className
}) {
    const { logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <button
            onClick={handleLogout}
            className={className}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
