import React, { Component } from "react";
import { v4 as uuid } from "uuid";

export default class Column2 extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "blue" }}>
        <h1> Column 2 </h1>
        <button
          onClick={() => this.props.sortList("secondList")}
          style={{ backgroundColor: "grey" }}
        >
          Sort
        </button>
        <button
          onClick={() => this.props.addItem("secondList")}
          style={{ backgroundColor: "green" }}
        >
          Add
        </button>
        <button
          onClick={() => this.props.onRemove("secondList")}
          style={{ backgroundColor: "red" }}
        >
          Remove
        </button>
        {this.props.secondList.map((item) => {
          return (
            <div
              key={uuid()}
              style={{ border: "2px white solid", textAlign: "center" }}
            >
              <h3 style={{ color: "red" }}> {item.title} </h3>
              <h4 style={{ color: "white" }}> Rate: {item.averageRate} </h4>
              <button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => this.props.onDelete("secondList", item)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
