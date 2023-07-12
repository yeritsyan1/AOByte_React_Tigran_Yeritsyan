import React, { Component } from "react";
import Column1 from "./components/Column1";
import Column2 from "./components/Column2";
import { v4 as uuid } from "uuid";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.sortList = this.sortList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      firstList: [],
      secondList: [],
      isSorted: { firstList: false, secondList: false },
      posts: [
        {
          title: "Post 1",
          isSelected: false,
          averageRate: 0,
          id: uuid(),
          comments: [
            {
              comment: "comment 1",
              rate: 7,
            },
            {
              comment: "comment 2",
              rate: 8,
            },
            {
              comment: "comment 3",
              rate: 4,
            },
          ],
        },
        {
          title: "Post 2",
          isSelected: false,
          averageRate: 0,
          id: uuid(),
          comments: [
            {
              comment: "comment 1",
              rate: 17,
            },
            {
              comment: "comment 2",
              rate: 5,
            },
            {
              comment: "comment 3",
              rate: 4,
            },
          ],
        },
        {
          title: "Post 3",
          isSelected: false,
          averageRate: 0,
          id: uuid(),
          comments: [
            {
              comment: "comment 1",
              rate: 5,
            },
            {
              comment: "comment 2",
              rate: 7,
            },
            {
              comment: "comment 3",
              rate: 9,
            },
          ],
        },
        {
          title: "Post 4",
          isSelected: false,
          averageRate: 0,
          id: uuid(),
          comments: [
            {
              comment: "comment 1",
              rate: 7,
            },
            {
              comment: "comment 2",
              rate: 6,
            },
            {
              comment: "comment 3",
              rate: 23,
            },
          ],
        },
        {
          title: "Post 5",
          isSelected: false,
          averageRate: 0,
          id: uuid(),
          comments: [
            {
              comment: "comment 1",
              rate: 5,
            },
            {
              comment: "comment 2",
              rate: 5,
            },
            {
              comment: "comment 3",
              rate: 17,
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.setState(() => {
      return {
        posts: this.state.posts.map((item) => {
          return (
            (item.averageRate = item.comments.reduce(function (aggr, val) {
              return aggr + val.rate;
            }, 0)),
            item
          );
        }),
      };
    });
  }

  addItem(listname) {
    const newItem = this.state.posts.reduce((aggr, val) => {
      return val.isSelected
        ? aggr
        : val.averageRate > aggr.averageRate
        ? val
        : aggr;
    });

    // update column list
  const itemExist = this.state.firstList.some((obj) => obj.id === newItem.id) || this.state.secondList.some((obj) => obj.id === newItem.id)
 if(!itemExist) {
    this.setState(() => {
      return {
        [listname]: this.state.isSorted[listname]
          ? [newItem, ...this.state[listname]]
          : [...this.state[listname], newItem],
      };
    });
  }
    // change isSelected value
    this.setState(() => {
      return {
        posts: this.state.posts.map((item) => {
          if (item.id === newItem.id) {
            return {
              ...item,
              isSelected: true,
            };
          } else {
            return item;
          }
        }),
      };
    });
  }

  // sorted by value
  sortList(listname) {
    this.setState(() => {
      return {
        [listname]: [...this.state[listname]].reverse(),
        isSorted: {
          ...this.state.isSorted,
          [listname]: !this.state.isSorted[listname],
        },
      };
    });
  }

  // delete me
  onDelete(listname, item) {
    this.setState(() => {
      return {
        [listname]: this.state[listname].filter((elem) => elem.id !== item.id),
        posts: this.state.posts.map((elem) => {
          if (elem.id === item.id) {
            return {
              ...item,
              isSelected: false,
            };
          } else {
            return item;
          }
        }),
      };
    });
  }
  // remove item
  onRemove(listname) {
    const deletedObj = this.state[listname].reduce(function (aggr, val) {
      return val.averageRate > aggr.val ? val : aggr;
    });
    this.setState(() => {
      return {
        [listname]: this.state[listname].filter((obj) => obj !== deletedObj),
        posts: this.state.posts.map((item) => {
          if (item.id === deletedObj.id) {
            return {
              ...item,
              isSelected: false,
            };
          } else {
            return item;
          }
        }),
      };
    });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Column1
          addItem={this.addItem}
          firstList={this.state.firstList}
          sortList={this.sortList}
          onDelete={this.onDelete}
          onRemove={this.onRemove}
        />
        <Column2
          addItem={this.addItem}
          secondList={this.state.secondList}
          sortList={this.sortList}
          onDelete={this.onDelete}
          onRemove={this.onRemove}
        />
      </div>
    );
  }
}
