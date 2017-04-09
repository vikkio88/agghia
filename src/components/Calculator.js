import React, { Component } from 'react';
import moment from 'moment';
import '../styles/Calculator.css';

import sun from '../assets/sun.png';

export default class Calculator extends Component {
    state = {};

    tick() {
        let diff = (moment() - this.state.todayStart) / 1000;
        let earned = (this.state.unitPerSecond * diff).toFixed(2);
        let elapsed = this.state.todayStart.fromNow();
        this.setState({ earned, elapsed })
    }

    componentDidMount() {
        if (this.state.working) {
            this.interval = setInterval(this.tick.bind(this), 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillMount() {
        let user = this.props.user;
        let todayState = this.calculateTodayState(user);
        const { message, working, unitPerSecond, todayStart } = todayState;
        this.setState({ user, message, working, unitPerSecond, todayStart });

    }

    calculateTodayState(user) {
        const now = new Date();
        let message = '';
        let working = false;
        let day = now.getDay();
        let unitPerSecond = 0;

        let todayStart = moment(`${moment().format("YYYY-MM-DD")} ${user.start}`);
        let diff = (moment() - todayStart) / 1000;

        if (day === 0 || user.week < day) {
            message = `Today is not a working day, ${user.name}`;
        } else if (diff < 0) {
            message = `You will start work ${todayStart.fromNow()}`;
        } else if (diff > (3600 * user.hours)) {
            message = `You finished working for today, ${user.name}`;
        } else {
            working = true;
            message = `Work Day ${now.getDay()} / ${user.week}`;
            let unitPerWeek = user.net / 4;
            let unitPerDay = unitPerWeek / user.week;
            let unitPerHour = unitPerDay / user.hours;
            unitPerSecond = unitPerHour / 3600;
        }


        return { message, working, todayStart, unitPerSecond };
    }

    renderTodayRTPay() {
        if (this.state.working) {
            return (
                <div>
                    <h3>You started working: {this.state.elapsed}</h3>
                    <h3>Today's earnings: {this.state.earned} £</h3>
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