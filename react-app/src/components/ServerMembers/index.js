// import './ServerMembers.css'

import { useSelector } from "react-redux";


export default function ServerMembers() {

  // let currServer = useSelector(state => state.server.currentServer);

  // let arr = Object.values(currServer)
  // let membersArr = arr[0].members
  // console.log('members arr from server members', membersArr)

  // ADD LOGIC FOR SERVER OWNER
  return (
    <div>
      <div> SERVER MEMBERS</div>
      {/* <div className='servermembers-container'>
        {membersArr.map((member) => {
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
