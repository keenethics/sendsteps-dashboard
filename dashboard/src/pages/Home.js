import React, { Component } from "react";
import View from "./base/View";

export default class Home extends View {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Dashboard</h1>
          <p>Welcome to the New Sendsteps Dashboard</p>
        </div>
      </div>
    );
  }
}