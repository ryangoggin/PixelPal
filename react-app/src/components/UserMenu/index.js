import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import './UserMenu.css';

function UserMenu() {
    let currUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = async (e) => {
		e.preventDefault();
		await dispatch(logout())
        .then(() => {
            history.push('/');
        });
	};

    if (!currUser) return null;

    return (
    <div className='user-menu-container'>
        <div className='user-menu-left-side'>
            <div className='user-menu-profile-pic-container'>
                <img className='user-menu-profile-pic' src={`${currUser.prof_pic}`} alt={`${currUser.username.slice(0, -5)} Profile Pic`} />
            </div>
            <div className='user-info'>
                <p className='user-menu-username'>{currUser.username.slice(0, -5)}</p>
                <p className='user-tag'>{currUser.username.slice(-5)}</p>
            </div>
        </div>
        <div className='user-menu-right-side'>
            <form onSubmit={handleLogout}>
                <button className='logout-button' type='submit'>Log Out <i class="fa-solid fa-right-from-bracket"></i> </button>
            </form>
        </div>
    </div>
    );
};

export default UserMenu;
