import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import ServerMemberAdd from "../ServerMemberAdd";
import { getServers, getServer, deleteServerMember } from "../../store/server";
import { getServerChannels } from "../../store/channels";
import "./ServerMemberSidebar.css";

const ServerMembersSidebar = () => {
    const dispatch = useDispatch();
    let user = useSelector(state => state.session.user);
    let server = useSelector(state => state.server.currentServer);
    let members = server.members;

    const [errors, setErrors] = useState([]);

    const handleDM = (e) => {
        e.preventDefault();
        window.alert('Private Messages Feature Coming Soon!');
    }

    const handleDelete = async (e, member) => {
        e.preventDefault();

        console.log("********", server);


        const data = await dispatch(deleteServerMember(server.id, member));

        if (data) {
            setErrors(data);
        } else {
            dispatch(getServers(user));
            dispatch(getServer(server.id));
            dispatch(getServerChannels(server.id));
        }
    }


    return (
        <div className="sidebar">
            <h1 className='create-server-header'>Members in {server.name}!</h1>
            {server.owner_id === user.id ?
                <div className='server-members-setting-btn'>
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-user-plus"></i>}
                        modalComponent={<ServerMemberAdd server={server} />}
                    />
                </div>
                :
                ""
            }
            {errors.length > 0 && (
                <ul className='modal-errors'>
                    {errors.map((error, idx) => <li key={idx} className='modal-error'>{error}</li>)}
                </ul>
            )}
            <p className='create-server-para'>Check out which cool cats are hanging out here!</p>
            <div className='server-members-list-container'>
                {members.map(member => (
                    <div className='server-member-list-card'>
                        <div className='friendslist-user-container' id="server-members-container" key={`member${member.id}`}>
                            <div className='friendslist-pic-username'>
                                <div> <img className='friendslist-profile-image' src={member.prof_pic} alt='profile_pic_user' /> </div>
                                <div className='friendslist-username'> {member.username.split("#")[0]} </div>
                                <div className='friendslist-tag'> #{member.username.split("#")[1]} </div>
                            </div>
                            <div className='friendslist-chat-icon'>
                                <div className='icon-hover' onClick={handleDM}> <i className="fa-solid fa-message" /> </div>
                                {server.owner_id === user.id && member.id !== server.owner_id ?
                                    <div className='icon-hover' onClick={(e) => handleDelete(e, member)}>  <i className="fa-solid fa-ban"></i></div>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );

}

export default ServerMembersSidebar; 