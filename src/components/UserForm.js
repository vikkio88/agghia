import React, { Component } from 'react';
import '../styles/UserForm.css';

export default class UserForm extends Component {
    saveUser(e) {
        e.preventDefault();
        let user = {
            name: document.getElementById('name').value,
            net: document.getElementById('net').value,
            hours: document.getElementById('hours').value,
            week: document.getElementById('week').value,
            start: document.getElementById('start').value
        };
        localStorage.setItem('userInfo', JSON.stringify(user));
        location.reload();
    }

    render() {
        return (
            <div className="container">
                <div className="head">
                <h1>Agghia</h1>
                <h3>this small silly utility will calculate in real time, your income</h3>
                </div>
                <form onSubmit={this.saveUser} className="user-form">
                    <label>Name</label>
                    <input id="name" type="text" placeholder="Mariano Rossi" required />
                    <label>Monthly Net Wage</label>
                    <input id="net" step="0.01" type="number" placeholder="1300" required min="1" />
                    <label>Daily working hours</label>
                    <input id="hours" step="0.1" type="number" placeholder="8" size="2" required min="0.1" max="24" />
                    <label>Weekly working days</label>
                    <input id="week" type="number" placeholder="6" size="2" required min="1" max="7" />
                    <label>Start time</label>
                    <input id="start" type="time" placeholder="8:30" size="2" required />
                    <input type="submit" value="Save" />
                </form>
            </div>
        );
    }
}