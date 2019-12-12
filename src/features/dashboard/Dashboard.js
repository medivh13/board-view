import React from 'react';
import Wallboard from './wallboard/Wallboard';
import AdminLTE, { Sidebar, Navbar } from 'adminlte-2-react';

import { Redirect } from 'react-router';
import {logout} from "../../services/StateReducers/Credentials/CredentialActions";
import Footer from "../../components/Footer";

import AppEnvironment from "../../AppEnvironment";
import httpService from '../../services/HttpService';
import credentialStore from '../../services/StateReducers/Credentials/CredentialStore';

const { Item, Header } = Sidebar;
const { Entry } = Navbar;
const { app, refreshTimeMilliSeconds } = AppEnvironment;

class Dashboard extends React.Component {

	constructor(){
        super();
		this.state = {
			dashboardData: {},
            isFull: false
		};

		this.handleLogout = this.handleLogout.bind(this);
		this.loadDashboardData = this.loadDashboardData.bind(this);
		this.reload = this.reload.bind(this);
	}

	handleLogout(){
	    console.log("Logging out...");
	    credentialStore.dispatch(logout());
        this.props.history.push('/');
    }

    reload(){
	    setTimeout(this.loadDashboardData, refreshTimeMilliSeconds);
    }


    loadDashboardData() {
        const url = "/finesse/api/Users";
        console.log("Fetching dashboard data from server...");

        const cred = credentialStore.getState();
        const auth = cred.credentials;
        if (cred.isAuthenticated) {
            httpService.get(url, auth, 'json')
                .then((response) => {
                    this.setState({
                        dashboardData: response
                    });
                    this.reload();
                })
                .catch((err) => {
                    console.log(err);
                    this.reload();
                });
        }
        else
            this.reload();
    }

    componentDidMount(){
        this.loadDashboardData();
    }

    setFullscreen = () => {
        this.setState({ isFull: true });
    }

    changeStateFullscreen = (fullState) => {
        this.setState({ isFull: fullState });
    }

    render(){
        const { dashboardData, isFull } = this.state;
        const cred = credentialStore.getState();
        const fullscreenData = {
            isFull,
            changeStateFullscreen: this.changeStateFullscreen
        };

        if (!cred.isAuthenticated){
            return <Redirect to="/signin" />
        }

        return (
            <AdminLTE
                browserTitle={app.title}
                title={["Menu"]}
                titleShort={["M"]}
                theme="blue"
                footer={<Footer enabled={true}/>}
            >

                <Navbar.Core title="Wallboard">
                    <Entry
                        icon="fa-expand"
                        onClick={this.setFullscreen}
                    >
                    </Entry>
                    <Entry
                        icon="fas-power-off"
                        onClick={this.handleLogout}
                        tooltip="Sign Out"
                    />
                </Navbar.Core>
                <Sidebar.Core>
                    <Header text="MAIN NAVIGATION" />
                    <Item text="Wallboard" to="/dashboard/wallboard" icon="fa-clipboard" />
                </Sidebar.Core>
                <Wallboard
                    path="/dashboard/wallboard/" exact
                    fullscreenData={fullscreenData}
                    dashboardData={dashboardData}/>
            </AdminLTE>
        );
    }
}

export default Dashboard;