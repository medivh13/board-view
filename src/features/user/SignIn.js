import React from 'react';
import Container from 'react-bootstrap/Container';
import { Box, Inputs, Button, Row, Col, Alert, LoadingSpinner } from "adminlte-2-react";

import { Redirect } from 'react-router';
import credentialStore from '../../services/StateReducers/Credentials/CredentialStore';
import {login} from "../../services/StateReducers/Credentials/CredentialActions";
import AppEnvironment from "../../AppEnvironment";
import httpService from '../../services/HttpService';

const { Text } = Inputs;

const { app } = AppEnvironment;

class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            fieldUsername: {
                isEmpty: true
            },
            fieldPassword: {
                isEmpty: true
            },
            alertLoginFailed: false,
            isLoading: false,
            isValidating: false
        };
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillUnmount(){
        // this.handleSignIn.unbind();
        // this.handleInputChange.unbind();
    }

    checkCredentials(){
        const url = "/fiboard/login";
        const { username, password } = this.state;
        const body = { username, password };
        const config = {};

        return new Promise((resolve, reject) => {
            httpService.post(url, body, config).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    checkFormValidation(state){
        const { username, password } = state;

        const fieldUsernameIsEmpty = username === '';
        const fieldPasswordIsEmpty = password === '';

        this.setState({
            fieldUsername: {
               isEmpty: fieldUsernameIsEmpty
            },
            fieldPassword: {
               isEmpty: fieldPasswordIsEmpty
            },
            isValidating: true
        });

        return (!fieldUsernameIsEmpty &&
                !fieldPasswordIsEmpty);
    }

    handleSignIn(e){
        e.preventDefault();

        if (this.checkFormValidation(this.state)) {
            // show loading
            this.setState({
                isLoading: true
            });

            this.checkCredentials(this.state)
                .then((result) => {
                    if (result.code === 'success') {
                        credentialStore.dispatch(login(
                            {
                                username: this.state.username,
                                password: this.state.password
                            }
                        ));
                        this.props.history.push("/");
                    }
                    else {
                        this.setState({
                            alertLoginFailed: true,
                            alertLoginFailedMessage: "Login Failed. Please check your credentials and try again"
                        });
                    }

                    this.setState({
                        isLoading: false
                    })
                })
                .catch((result) => {
                    console.log("Login Failed... ");
                    console.log(result);
                    this.setState({
                        isLoading: false,
                        alertLoginFailed: true,
                        alertLoginFailedMessage: "Network Error, please contact our support to fix this problem."
                    })
                });
        }
    }

    handleInputChange(e){
        const attr = e.target.name;
        const value = e.target.value;
        this.setState({
            [attr]: value
        });

        // handle to avoid async on set state above
        const state = this.state;
        state[attr] = value;

        // check error on changing info.
        if (state.isValidating){
            this.checkFormValidation(state);
        }

    }

    render(){
        const cred = credentialStore.getState();
        const {
            alertLoginFailed,
            alertLoginFailedMessage,
            isLoading,
            isValidating,
            fieldUsername,
            fieldPassword
        } = this.state;

        if (cred.isAuthenticated){
            return <Redirect to="/dashboard/wallboard" />
        }

        return (
            <Container as="div" style={{top:"25%", left:"50%", position:"fixed", transform:"translate(-25%, -25%)"}}>
                <Row>
                    <Col md={6}>
                        <Box
                            type="info"
                            title={"Welcome to " + app.title + "!"}
                            bodyClassName="form-horizontal"
                            footer={(
                                <React.Fragment>
                                    <Button text="Sign in"
                                            type="primary"
                                            onClick={this.handleSignIn}
                                            disabled={isLoading}
                                            form="frmSignIn"
                                            pullRight />
                                </React.Fragment>
                            )}
                            border
                        >
                            {
                                // If login failed, show something...
                                alertLoginFailed ?
                                    <Alert closable="true"
                                           type="danger"
                                           children={
                                               <p>
                                                   {alertLoginFailedMessage}
                                               </p>
                                           } /> : ''
                            }
                            {
                                // Spinner, spawn when loading...
                                isLoading ?
                                    <LoadingSpinner  /> : ''
                            }
                            {/*TODO: Add form checker here...*/}
                            <form name="frmSignIn">
                                <Text  inputType="text"
                                       name="username"
                                       placeholder="Input Username..."
                                       label="Username"
                                       help={ isValidating && fieldUsername.isEmpty ? 'Username cannot be empty' : '' }
                                       type={ isValidating && fieldUsername.isEmpty ? 'error' : ''}
                                       value={this.state.username}
                                       onChange={this.handleInputChange}
                                       disabled={isLoading}
                                       required={true} />
                                <Text  name="password"
                                       placeholder="Input Password..."
                                       label="Password"
                                       inputType="password"
                                       help={ isValidating && fieldPassword.isEmpty ? 'Password cannot be empty' : '' }
                                       type={ isValidating && fieldPassword.isEmpty ? 'error' : ''}
                                       class="form-control"
                                       value={this.state.password}
                                       onChange={this.handleInputChange}
                                       disabled={isLoading}
                                       required={true} />
                            </form>
                        </Box>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SignIn;