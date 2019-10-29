import React from 'react';
import { Col, Box, Infobox } from 'adminlte-2-react';

class CallActivity extends React.Component {

    constructor(){
        super();
        this.state = {
            data: [
                {
                    key: 'answered',
                    icon: 'fa-phone',
                    number: 16,
                    text: 'Answered',
                    color: 'green'
                },
                {
                    key: 'serviceLevel',
                    icon: 'ion-pie-graph',
                    number: 80,
                    postfix: '%',
                    text: 'Service Level',
                    color: 'blue'
                },
                {
                    key: 'talking',
                    icon: 'fa-volume-up',
                    number: 2,
                    text: 'Talking',
                    color: 'aqua'
                },
                {
                    key: 'abandoned',
                    icon: 'ion-alert-circled',
                    number: 4,
                    text: 'Abandoned',
                    color: 'red'
                },
                {
                    key: 'abandonRate',
                    icon: 'ion-arrow-graph-down-right',
                    number: 20,
                    postfix: '%',
                    text: 'Abandon Rate',
                    color: 'yellow'
                },
                {
                    key: 'ready',
                    icon: 'fa-user',
                    number: 1,
                    text: 'Ready',
                    color: 'green'
                },
                {
                    key: 'totalCalls',
                    icon: 'fa-tty',
                    number: 20,
                    text: 'Total Calls',
                    color: 'blue'
                },
                {
                    key: 'callQueue',
                    icon: 'ion-android-notifications',
                    number: '2',
                    text: 'Call Queue',
                    color: 'aqua'
                },
                {
                    key: 'notReady',
                    icon: 'fa-user-times',
                    number: 3,
                    text: 'Not Ready',
                    color: 'red'
                },
                {
                    key: 'averageInbound',
                    icon: 'ion-android-arrow-down',
                    number: '02:35',
                    text: 'Average Inbound',
                    color: 'green'
                },
                {
                    key: 'averageOutbound',
                    icon: 'ion-android-arrow-up',
                    number: '01:28',
                    text: 'Average Outbound',
                    color: 'blue'
                }
            ]
        };
    }

    render(){
        const { callActivityData } = this.props || [];
        const { data } = this.state;

        const newData = data.map((item) => {
            const { key } = item;
            if (callActivityData){
                item.number = callActivityData[key] !== undefined ? callActivityData[key] : 'N/A';
            }
            return item;
        });

        let infoTiles = newData.map((item,index) => {
            item.number = item.number + (item.postfix || '');

            const sizes = {
              md: 4,
              sm: 8,
              xs: 12
            };

            return (
                <Col {...sizes}>
                    <Infobox {...item} />
                </Col>
            );
        });

        return (
            <Box as="div" title="Call Activities" className="CallActivity">
                {infoTiles}
            </Box>
        );
    }
}

export default CallActivity;