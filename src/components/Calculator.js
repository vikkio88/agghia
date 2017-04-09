import React, { Component } from 'react';
import '../styles/Calculator.css';

import sun from '../assets/sun.png';

export default class Calculator extends Component {
    state = {};

    tick() {
        
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillMount() {
        let user = this.props.user;
        let todayState = this.calculateTodayState(user);
        const { message, working } = todayState;
        this.setState({ user, message, working });

    }

    calculateTodayState(user) {
        const now = new Date();
        let message = '';
        let working = false;
        let day = now.getDay();
        if (day === 1 || user.week < day) {
            message = `Today is not a working day, ${user.name}`;
        } else {
            working = true;
            message = `Work Day ${now.getDay()} / ${user.week}`;
        }
        

        return { message, working };
    }

    renderTodayRTPay() {
        if (this.state.working) {
            return (
                <div>
                    <h2>You have been working for {this.state.workingHours}</h2>
                    <h2>You earned {this.state.moneyEarned} (£,€,$)</h2>
                </div>
            );
        }

        return (
            <img src={sun} className="sun" alt="Not working" />
        );
    }

    render() {
        return (
            <div className="calculator">

                <h1>{this.state.message}</h1>
                {this.renderTodayRTPay()}
            </div>
        );
    }
}