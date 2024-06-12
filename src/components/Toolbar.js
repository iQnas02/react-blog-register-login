import React from 'react';
import {Link} from "react-router-dom";

const Toolbar = ({logged}) => {
    return (
        <div className="mb-5">
            <div className="p-2 border me-3 d-flex justify-content-between">
                <div className="d-flex gap-3">
                    <Link to="/">Blog</Link>

                    {!logged && <Link to="/login">Login</Link>}
                    {!logged && <Link to="/register">Registration</Link>}
                </div>

                {logged && `logged in as ${logged}`}
            </div>
        </div>
    );
};

export default Toolbar;