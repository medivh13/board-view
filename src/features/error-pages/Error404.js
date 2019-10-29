import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'adminlte-2-react';

class Error404 extends React.Component {

    constructor(){
        super();
        this.backToHome = this.backToHome.bind(this);
    }

    backToHome(){
        this.props.history.push('/');
    }

    render(){
        return (
            <Container as="div" style={{margin: "0 auto", textAlign: "center"}}>
                <h1>404</h1>
                <h3>Page Not Found!</h3>
                <Button
                    icon="fa-home"
                    type="primary"
                    text="Back to Home"
                    size="lg"
                    onClick={this.backToHome}
                />
                <hr />
            </Container>
        );
    }
}

export default Error404;