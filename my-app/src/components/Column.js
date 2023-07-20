import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "@mui/material";
import Post from "./Post";
export default class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredArray: this.props.column,
      text: "",
      list: this.props.listname,
      commentList: [],
      comment: "",
    };
  }

  onFilter = (filteredBy) => {
    // posts
    if (filteredBy === "posts") {
      return this.setState(() => {
        return {
          filteredArray: this.props.column.filter(
            (post) => post.title.toLowerCase() === this.state.text.toLowerCase()
          ),
        };
      });
    }

    // comments
    else if (filteredBy === "comments") {
      return this.setState(() => {
        const filteredArray = this.props.column.filter((item) =>
          item.comments.some((elem) =>
            elem.text.includes(this.state.text.toLowerCase())
          )
        );
        return {
          filteredArray,
        };
      });
    }

    // all posts
    else {
      return this.setState(() => {
        return {
          filteredArray: this.props.column,
        };
      });
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
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                return this.onFilter(this.state.list);
              }
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
          <Button
            variant="contained"
            onClick={() => {
              this.onFilter(this.state.list);
            }}
          >
            Filter
          </Button>
        </div>
        <div style={{ display: "flex", gap: "10px", paddingTop: "15px" }}>
          <Button
            variant="contained"
            onClick={() => this.props.sortList(this.props.listname)}
            style={{
              backgroundColor: "grey",
            }}
          >
            Sort
          </Button>
          <Button
            disabled={this.props.loaded}
            variant="contained"
            color="success"
            onClick={() => {
              this.state.list === this.props.listname &&
                this.props.addItem(this.props.listname);
              this.onFilter(this.state.list);
            }}
          >
            Add
          </Button>
          {this.state.list === this.props.listname && (
            <Button
              disabled={this.props.loaded}
              variant="contained"
              color="error"
              onClick={() =>
                this.props.onRemove(
                  this.props.listname,
                  this.onFilter(this.state.list)
                )
              }
            >
              Remove
            </Button>
          )}
        </div>

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
              <Post
                item={item}
                onDelete={this.props.onDelete}
                listname={this.props.listname}
                sortComments={this.props.sortComments}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
