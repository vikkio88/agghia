import React, { Component } from 'react';
import logo from './assets/logo.png';
import './styles/App.css';

import UserForm from './components/UserForm';
import Calculator from './components/Calculator';

import { configs } from './libs';
const { userStorageKey } = configs;

class App extends Component {
  state = {
    userInfo: null
  };

  componentWillMount() {
    let userInfo = JSON.parse(localStorage.getItem(userStorageKey));
    if (userInfo) {
      this.setState({ userInfo });
    }
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem(userStorageKey);
    location.reload();
  }

  openRepo() {
    window.location.href = 'https://github.com/vikkio88/agghia';
  }

  renderUserInfo() {
    if (this.state.userInfo) {
      return (
        <Calculator user={this.state.userInfo} />
      );
    }

    return (
      <UserForm />
    );
  }

  renderLogout() {
    if (this.state.userInfo) {
      return (
        <div className="logout">
          <a onClick={this.logout}>Logout</a>
        </div>
      );
    }
    return '';
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div>
            <img onClick={this.openRepo} src={logo} className="logo" alt="logo" />
          </div>
          <div className="header-content">
          </div>
          {this.renderLogout()}
        </div>
        <div className="app-body">
          {this.renderUserInfo()}
        </div>
      </div>
    );
  }
}

export default App;
