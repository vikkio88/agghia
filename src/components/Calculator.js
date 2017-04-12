import React, { Component } from 'react';
import moment from 'moment';
import '../styles/Calculator.css';

import sun from '../assets/sun.png';

export default class Calculator extends Component {
    state = {};

    tick() {
        let diff = (moment() - this.state.todayStart) / 1000;
        let earned = (this.state.user.units.perSecond * diff).toFixed(2);
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
        const { message, working, todayStart } = todayState;
        this.setState({ user, message, working, todayStart });

    }

    calculateTodayState(user) {
        const now = new Date();
        let message = '';
        let working = false;
        let day = now.getDay();

        let todayStart = moment(`${moment().format("YYYY-MM-DD")} ${user.start}`);
        let diff = (moment() - todayStart) / 1000;
        //quick fix #3
        user.units.perDay = parseInt(user.units.perDay).toFixed(2);

        if (day === 0 || user.week < day) {
            message = `Today is not a working day, this week you earned £${user.units.perWeek}`;
        } else if (day === 1) {
            message = `Good Monday ${user.name}, this week you will earn £${user.units.perWeek * (day - 1)}`;
        } else if (diff < 0) {
            message = `Good Morning ${user.name}, so far this week you have earned £${user.units.perDay * (day - 1)}`;
        } else if (diff > (3600 * user.hours)) {
            message = `No more working for today, you earned £${user.units.perDay} today (£${user.units.perDay * day} so far this week)`;
        } else {
            working = true;
            message = `Work Day ${now.getDay()} / ${user.week}`;
        }


        return { message, working, todayStart };
    }

    renderTodayRTPay() {
        if (this.state.working) {
            return (
                <div>
                    <h3>You started working: {this.state.elapsed}</h3>
                    <h3>Today's earnings so far: £{this.state.earned}</h3>
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

                <h3>{this.state.message}</h3>
                {this.renderTodayRTPay()}
            </div>
        );
    }
}