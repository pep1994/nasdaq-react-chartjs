import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: this.props.dataLabels,
                datasets: [
                    {
                        label: 'price',
                        data: this.props.dataPrice,
                        backgroundColor: [
                            'rgba(150, 33, 146, .7)',
                            'rgba(82, 40, 204, 1)',
                            'rgba(4, 51, 255, 1)',
                            'rgba(0, 146, 146, 1)',
                            'rgba(0, 249, 0, 1)',
                            'rgba(202, 250, 0, 1)',
                            'rgba(255, 251, 0, 1)',
                            'rgba(255, 199, 0, 1)',
                            'rgba(255, 147, 0, 1)',
                            'rgba(255, 80, 0, 1)',
                            'rgba(255, 38, 0, 1)',
                            'rgba(216, 34, 83, 1)'
                        ],
                        borderColor: [
                            'rgba(150, 33, 146, 1)',
                            'rgba(82, 40, 204, 1)',
                            'rgba(4, 51, 255, 1)',
                            'rgba(0, 146, 146, 1)',
                            'rgba(0, 249, 0, 1)',
                            'rgba(202, 250, 0, 1)',
                            'rgba(255, 251, 0, 1)',
                            'rgba(255, 199, 0, 1)',
                            'rgba(255, 147, 0, 1)',
                            'rgba(255, 80, 0, 1)',
                            'rgba(255, 38, 0, 1)',
                            'rgba(216, 34, 83, 1)'
                        ]
                    }
                ]
            },

        }
    }
    render() {
        return (
            <div>
                <Line
                    data={this.state.chartData}
                    options={

                        {

                            title: {
                                display: true,
                                text: 'Tranding',
                                fontSize: 15,
                                fontColor: '#CCCCCC'
                            },
                            legend: {
                                labels: {
                                    fontColor: '#CCCCCC',
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    }
                />
            </div>
        )
    }
}

export default Chart



