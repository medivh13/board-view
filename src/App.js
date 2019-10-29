import React from 'react';
import Dashboard from "./features/dashboard/Dashboard";
import SignIn from './features/user/SignIn';
import Error404 from "./features/error-pages/Error404";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import credentialStore from './services/StateReducers/Credentials/CredentialStore';

class App extends React.Component {

    componentDidMount(){
        window.credentialStore = credentialStore;

        // TODO: handle session cookie
    }

    render() {
        const cred = credentialStore.getState();

        const authenticate = () => {
            return cred.isAuthenticated ? <Redirect from="*" to="/dashboard" /> : <Redirect from="*" to="/signin" />;
        };

        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" render={authenticate} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/dashboard/*" component={Dashboard} />
                        <Route exact path="/signin" component={SignIn} />
                        <Route component={Error404} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
