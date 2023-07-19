import React, { Component } from "react";
import Column from "./Column";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { app } from "../firebase/firebase";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.sortList = this.sortList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      db: getFirestore(app),
      firstList: [],
      secondList: [],
      isSorted: { firstList: false, secondList: false },
      posts: [],
      loaded: true,
    };
  }

  componentDidMount() {
    (async () => {
      const colRef = collection(this.state.db, "posts");
      const snapshots = await getDocs(colRef);

      const docs = await snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.isSelected = false;
        data.averageRate = Math.random() * 100;
        return data;
      });
      await this.setState(() => {
        return {
          posts: docs,
        };
      });
    })().then(() =>
      this.setState(() => {
        return {
          loaded: false,
        };
      })
    );

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
    const itemExist =
      this.state.firstList.some((obj) => obj.id === newItem.id) ||
      this.state.secondList.some((obj) => obj.id === newItem.id);
    if (!itemExist) {
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
        [listname]: this.state[listname].sort((a, b) =>
          this.state.isSorted[listname]
            ? b.averageRate - a.averageRate
            : a.averageRate - b.averageRate
        ),
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
            return elem;
          }
        }),
      };
    });
  }
  // remove item
  onRemove(listname) {
    if (this.state[listname].length) {
      let deletedObj = { averageRate: 0 };
      for (const item in this.state[listname]) {
        deletedObj =
          this.state[listname][item].averageRate > deletedObj.averageRate
            ? this.state[listname][item]
            : deletedObj;
      }
      return (
        this.setState(() => {
          return {
            [listname]: this.state[listname].filter(
              (obj) => obj !== deletedObj
            ),
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
        }),
        () => {
          return this.sortList(listname), this.sortList(listname);
        }
      );
    }
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Column
          addItem={this.addItem}
          column={this.state.firstList}
          sortList={this.sortList}
          onDelete={this.onDelete}
          onRemove={this.onRemove}
          listname="firstList"
          loaded={this.state.loaded}
        />
        <Column
          addItem={this.addItem}
          column={this.state.secondList}
          sortList={this.sortList}
          onDelete={this.onDelete}
          onRemove={this.onRemove}
          listname="secondList"
          loaded={this.state.loaded}
        />
      </div>
    );
  }
}
