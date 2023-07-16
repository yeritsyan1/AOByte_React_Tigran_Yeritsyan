import React, { Component } from "react";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.comments = this.props.comments;
  }
  render() {
    return (
      <div
        style={{
          maxHeight: "250px",
          overflow: "scroll",
          borderBottom: "2px black solid",
          color: "white",
          textAlign: "left",
          padding: "0 15px",
        }}
      >
        <p> {this.comments.comment} </p>
      </div>
    );
  }
}
