import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import Comments from "./Comments";

export default class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredArray: this.props.column,
      text: "",
      list: this.props.listname,
      commentList: [],
    };
  }

  onFilter = (filteredBy) => {
    // posts
    if (filteredBy === "posts") {
      return this.setState(() => {
        return {
          filteredArray: this.props.column.filter(
            (post) => post.title === this.state.text
          ),
        };
      });
    }

    // comments
    else if (filteredBy === "comments") {
      return this.setState(() => {
        const commentList = this.props.column
          .map((item) =>
            item.comments.find((elem) => elem.comment === this.state.text)
          )
          .filter(Boolean);

        const filteredArray = this.props.column.filter((parent) => {
          return parent.comments.some((parentChild) =>
            commentList.some((child) => child.comment === parentChild.comment)
          );
        });
        return {
          commentList,
          filteredArray,
        };
      });
    }

    // all posts
    else {
      return (
        this.setState(() => {
          return {
            filteredArray: this.props.column.filter((parent) => {
              return parent.comments.some((parentChild) =>
                this.state.commentList.some(
                  (child) => child.comment === parentChild.comment
                )
              );
            }),
          };
        }),
        this.setState(() => {
          return {
            filteredArray: this.props.column,
          };
        })
      );
    }
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.backgroundColor,
          flexGrow: 1,
          alignSelf: "start",
        }}
      >
        <h1> Column </h1>
        <div>
          <input
            style={{
              width: "200px",
              height: "35px",
              border: "1px black solid",
              borderRadius: "15px",
              padding: " 10px",
              fontSize: "16px",
            }}
            placeholder="Filter"
            value={this.state.text}
            onChange={(e) => {
              this.setState(() => {
                return {
                  text: e.target.value,
                };
              });
            }}
          />
          <select
            style={{
              width: "100px",
              height: "35px",
              border: "1px black solid",
              backgroundColor: "grey",
              borderRadius: "15px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            value={this.state.list}
            onChange={(e) => {
              this.setState(() => {
                return {
                  list: e.target.value,
                };
              });
            }}
          >
            <option value={this.props.listname}> All </option>
            <option value="comments"> comments </option>
            <option value="posts"> posts </option>
          </select>
          <button
            style={{
              width: "100px",
              height: "35px",
              border: "1px black solid",
              borderRadius: "15px",
              backgroundColor: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={() => {
              this.onFilter(this.state.list);
            }}
          >
            Filter
          </button>
        </div>
        <div style={{ display: "flex", gap: "10px", paddingTop: "15px" }}>
          <button
            onClick={() => this.props.sortList(this.props.listname)}
            style={{
              width: "100px",
              height: "35px",
              border: "1px black solid",
              borderRadius: "15px",
              backgroundColor: "grey",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Sort
          </button>
          <button
            onClick={() => {
              this.state.list === this.props.listname &&
                this.props.addItem(this.props.listname);
              this.onFilter(this.state.list);
            }}
            style={{
              width: "100px",
              height: "35px",
              border: "1px black solid",
              borderRadius: "15px",
              backgroundColor: "green",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
          {this.state.list === this.props.listname && (
            <button
              onClick={() =>
                this.props.onRemove(
                  this.props.listname,
                  this.onFilter(this.state.list)
                )
              }
              style={{
                width: "100px",
                height: "35px",
                border: "1px black solid",
                borderRadius: "15px",
                backgroundColor: "red",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          )}
        </div>
        <h1 style={{ color: "yellow" }}>
          All posts: {this.props.column.length}
        </h1>

        {this.state.filteredArray.map((item) => {
          return (
            <div
              key={uuid()}
              style={{
                maxHeight: "300px",
                overflow: "scroll",
                border: "2px white solid",
                textAlign: "center",
                paddingRight: "10px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ color: "white", textAlign: "right" }}>
                  Rate: {item?.averageRate}
                </h4>
                <button
                  style={{
                    fontSize: "12px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => this.props.onDelete(this.props.listname, item)}
                >
                  Delete
                </button>
              </div>
              <p
                style={{
                  textAlign: "left",
                  backgroundColor: "white",
                  padding: "0 15px",
                }}
              >
                {item.title}
              </p>
              <h3
                style={{ color: "red", textAlign: "left", padding: "0px 10px" }}
              >
                Comments:
              </h3>
              {item.comments.map((comments) => {
                return (
                  <React.Fragment key={uuid()}>
                    <Comments comments={comments} />
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
