import React from 'react';
import AppEnvironment from '../AppEnvironment';

const { app } = AppEnvironment;

class Footer extends React.Component {
    render(){
        const { title, year, marquee } = app;
        const footerText = `${title} @${year}`;
        const { enabled } = this.props;
        let style;
        if (enabled){
            style = {
                display: '',
                marginLeft: 0
            }
        }
        else {
            style = {
                display: 'none'
            }
        }

        const animation = {
            animation: 'marquee '+ marquee.loopTime +' linear infinite'
        };

        return (
            <footer className="main-footer" style={style}>
                <p className="marquee">
                    <span style={animation}>{marquee.text}</span>
                </p>
                <div className="pull-right hidden-xs">
                    {footerText}
                </div>&nbsp;
            </footer>
        );
    }
}

export default Footer;