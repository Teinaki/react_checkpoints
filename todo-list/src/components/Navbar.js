import React from 'react';
import { useUserContext } from "../Auth";

const Navbar = () => {
    const { user, logoutUser } = useUserContext();

    return (
        <nav class="navbar navbar-light bg-light">
            <p class="ms-3 navbar-text">Signed in as: {user.displayName}</p>
            <p class="ms-3 navbar-text">Signed in as: {user.email}</p>
            <button className="btn btn-primary me-3 navbar-right" onClick={logoutUser}>Log out</button>
        </nav>
    );
};

export default Navbar;
