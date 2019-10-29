import React from 'react';
import { app } from '../AppEnvironment';

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
            <footer class="main-footer" style={style}>
                <p class="marquee">
                    <span style={animation}>{marquee.text}</span>
                </p>
                <div class="pull-right hidden-xs">
                    {footerText}
                </div>&nbsp;
            </footer>
        );
    }
}

export default Footer;