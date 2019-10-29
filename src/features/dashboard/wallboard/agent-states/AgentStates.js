import React from 'react';
import { ProfileCard } from 'adminlte-reactjs';
import { Box } from 'adminlte-2-react';
import userHelper from '../../../../helpers/UserHelper';

class AgentStates extends React.Component {

    constructor(){
        super();
        this.state = {
          data: [
              {
                  key: 'agent_01',
                  name: 'Erica Aprilyan',
                  username: 'erica.aprilyan',
                  status: 'TALKING',
                  statusName: 'Talking',
                  statusInfo: '-',
                  image: 'https://bittaxer.com/wp-content/uploads/2018/03/danielle-profile-bittaxer.jpg'
              },
              {
                  key: 'agent_02',
                  name: 'Putri Paramitrasari',
                  username: 'putri.paramitrasari',
                  status: 'READY',
                  statusName: 'Ready',
                  statusInfo: '-',
                  image: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg'
              },
              {
                  key: 'agent_03',
                  name: 'Hasreth Linda',
                  username: 'hasreth.linda',
                  status: 'NOT_READY',
                  statusName: 'Not Ready',
                  statusInfo: 'Lunch Break',
                  image: 'https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-all-about-face.jpg'
              },
              {
                  key: 'agent_04',
                  name: 'Donnie Darko',
                  username: 'donnie.darko',
                  status: 'TALKING',
                  statusName: 'Talking',
                  statusInfo: '-',
                  image: 'https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg'
              },
              {
                  key: 'agent_05',
                  name: 'Michelle April',
                  username: 'michelle.april',
                  status: 'NOT_READY',
                  statusName: 'Not Ready',
                  statusInfo: "Toilet Break",
                  image: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg'
              },
              {
                  key: 'agent_06',
                  name: 'John White',
                  username: 'john.white',
                  status: 'NOT_READY',
                  statusName: 'Not Ready',
                  statusInfo: 'Sick Leave',
                  image: 'https://thegreenprogram.com/uploads/attachments/cisc7g4v50042gzgzfe1a15j9-charles-white1.100.0.399.399.full.jpg'
              }
          ]
        };
    }

    componentDidMount(){
        // this.loadData();
    }

    render(){
        let users;
        if (this.props.agentStatesData && this.props.agentStatesData.Users){
            const userList = this.props.agentStatesData.Users.User;
            users = userList.map((user) => {
                // set user data
                return userHelper.parseUser(user);
            });
        }
        else {
            users = this.state.data;
        }

        // TODO: set theme color depending on status
        const statusColor = {
            READY: 'bg-green',
            NOT_READY: 'bg-red',
            TALKING: 'bg-yellow',
        };

        let agentStates = users.map(item => {
            return (
                <ProfileCard
                    key={item.username}
                    width={4}
                    theme={statusColor[item.status]}
                    displayName={item.name}
                    description={item.statusName}
                    displayPicture={item.image}
                    pictureAlignment='left'
                />
            );
        });

        return (
          <Box as="div" title="Agent States" className="AgentStates">
              {agentStates}
          </Box>
        );
    }
}

export default AgentStates;