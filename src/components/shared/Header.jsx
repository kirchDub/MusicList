import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    const { username } = props;
    return (
            <header>
                <h1>MusicList</h1>
  
            <div className="user-menu">
                <h2> Wecome   { username }  </h2>
                <nav>
                    <ul>
                        <li><Link to="/">Home Page</Link></li>
                        <li><Link to="/account/profile/llaskows">Profile</Link></li>                        
                    </ul>
                </nav>        
            </div>
            </header>           
    );
}