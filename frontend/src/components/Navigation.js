import React from 'react';
import './Navigation.css';

function Navigation() {
    return (
        <nav className = "Navigation">
            <ul className = "Navigation-list">
                <li className="Navigation-item">Home</li>
                <li className="Navigation-item">Genres</li>
                <li className="Navigation-item">Favorites</li>
                <li className="Navigation-item">Profile</li>
            </ul>
        </nav>
    );
}

export default Navigation;