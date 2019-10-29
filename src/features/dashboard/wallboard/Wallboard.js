import React from 'react';
import CallActivity from "./call-activity/CallActivity";
import CallActivityDiagram from './call-activity-diagram/CallActivityDiagram';
import Container from 'react-bootstrap/Container';
import AgentStates from "./agent-states/AgentStates";
import Fullscreen from "react-full-screen";

import env from "../../../AppEnvironment";

import { Row, Col } from 'adminlte-2-react';
import Footer from "../../../components/Footer";

class Wallboard extends React.Component {

    render(){
        const { dashboardData, fullscreenData } = this.props;
        const { isFull, changeStateFullscreen } = fullscreenData;
        const { title, version } = env.app;
        const h2 = title + " " + version;

        return (
            <Container as="div" className="Wallboard">
                <Fullscreen
                    enabled={isFull}
                    onChange={changeStateFullscreen}
                >
                    <h2>{h2}</h2>
                    <Row>
                        <Col md={9}>
                            <CallActivity callActivityData={dashboardData.data}/>
                        </Col>
                        <Col md={3}>
                            <CallActivityDiagram callActivityData={dashboardData.data}/>
                        </Col>
                    </Row>
                    <AgentStates agentStatesData={dashboardData.response}/>
                    <Footer enabled={isFull}/>
                </Fullscreen>
            </Container>
        );
    }
}

export default Wallboard;