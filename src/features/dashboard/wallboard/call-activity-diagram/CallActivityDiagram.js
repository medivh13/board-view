import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

import {
    Box, Row, Col, NavList, NavListItem,
} from 'adminlte-2-react';

class CallActivityDiagram extends Component {
    state = {};

    serviceLevelOptions = {
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 1,
        cutoutPercentage: 50, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: 'easeOut',
        animateRotate: true,
        animateScale: false,
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        legendCallback: (chart) => {
            return;
        },
        tooltips: {
            displayColors: false,
            callbacks: {
                label(tooltipItem, data) {
                    const { datasets, labels } = data;
                    const { index } = tooltipItem;
                    return `${datasets[0].data[index]} ${labels[index]}`;
                },
            },
        },
    };

    render() {
        let data = {
            answered: 12,
            abandoned: 8
        };

        if (this.props.callActivityData){
            data = this.props.callActivityData;
        }
        const totalData = data.answered + data.abandoned;

        const serviceLevelData = {
            labels: ['Answered','Abandoned'],
            datasets: [{
                data: [data.answered, data.abandoned],
                backgroundColor: ['#00a65a','#f56954']
            }],
        };

        const label = {
            answered: (data.answered/totalData*100).toFixed(2)+'%',
            abandoned: (data.abandoned/totalData*100).toFixed(2)+'%'
        };

        const serviceLevelFooter = (
            <NavList pills stacked>
                <NavListItem iconClass="fa-angle-up" color="green" iconLabel={label.answered} text="Answered" onClick={() => { }} />
                <NavListItem iconClass="fa-angle-down" color="red" iconLabel={label.abandoned} text="Abandoned" onClick={() => { }} />
            </NavList>
        );

        return (
            <Box key="CallActivityDiagram" collapsable closable title="Service Level" footer={serviceLevelFooter} footerClass="no-padding">
                <Row>
                    <Col md={12}>
                        <Pie
                            key="serviceLevelChart"
                            ref={(c) => { this.serviceLevelChart = c; }}
                            data={serviceLevelData}
                            options={this.serviceLevelOptions}
                            height={ 193 }
                        />
                    </Col>
                </Row>
            </Box>

        );
    }
}

export default CallActivityDiagram;