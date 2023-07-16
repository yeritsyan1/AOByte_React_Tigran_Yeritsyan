/* import React, { Component } from "react";
import { v4 as uuid } from "uuid";

export default class Column1 extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "green" }}>
        <h1> Column 1 </h1>
        <button
          onClick={() => this.props.sortList("firstList")}
          style={{ backgroundColor: "grey" }}
        >
          Sort
        </button>
        <button
          onClick={() => this.props.addItem("firstList")}
          style={{ backgroundColor: "green" }}
        >
          Add
        </button>
        <button
          onClick={() => this.props.onRemove("firstList")}
          style={{ backgroundColor: "red" }}
        >
          Remove
        </button>
        {this.props.firstList.map((item) => {
          return (
            <div
              key={uuid()}
              style={{ border: "2px white solid", textAlign: "center" }}
            >
              <h3 style={{ color: "red" }}> {item.title} </h3>
              <h3 style={{ color: "white" }}> Rate: {item.averageRate} </h3>
              <button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => this.props.onDelete("firstList", item)}
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
 */