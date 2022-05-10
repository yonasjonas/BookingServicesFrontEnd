import React from 'react';
import { Link } from 'react-router-dom';

function Details({ match }) {
    const { path } = match;
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div>
            <h1>My Profile</h1>
            <p>
                <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}<br />
                <strong>Email: </strong> {user.email}
            </p>
            <p><Link to={`${path}/update`}>Update Profile</Link></p>
        </div>
    );
}

export default Details;