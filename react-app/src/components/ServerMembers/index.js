// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getServer } from '../../store/server';
// import { useEffect } from 'react';


// import './ServerMembers.css'

export default function ServerMembers() {

  // let currentServer = useSelector(state => state.server.currentServer);
  // const dispatch = useDispatch()
  // let { serverId } = useParams();

  // let currentServer = useSelector(state => state.server.currentServer);

  // useEffect(() => {
  //   dispatch(getServer(serverId))
  // }, [dispatch, serverId])

  // const currentServerMembers = currentServer.members

  // console.log('current server members ', currentServerMembers)


  // ADD LOGIC FOR SERVER OWNER
  return (
    <div>
      <div> SERVER MEMBERS</div>

      {/* <div className='servermembers-container'>
        {currentServerMembers.map((member) => {
          return (
            <div key={`servermember${member.id}`} >
              <div>
                <img src={member.prof_pic} className='' alt='member prof pic'/>
                <div className=''> {member.username.split("#")[0]} </div>
              </div>
            </div>
          )
        })
      }

      </div> */}

    </div>
  )
}
