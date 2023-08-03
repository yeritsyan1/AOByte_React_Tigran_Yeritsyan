import React, { useEffect, useState } from "react";
import Column from "./Column";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { app } from "../firebase/firebase";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AccountMenu from "./AccountNavigation";
import CustomTabPanel, { a11yProps } from "./CustomTabPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDTOCOLUMN,
  DELETEME,
  GETALLPOSTS,
  ISSELECTEDFALSE,
  ISSELECTEDTRUE,
  ONREMOVE,
  RATECOMMENT,
  REMOVEITEM,
  SORTAVERAGERATE,
  SORTCOMMENTS,
} from "../redux/action";

const List = () => {
  const firstList = useSelector(function (state) {
    return state.firstList;
  });
  const secondList = useSelector(function (state) {
    return state.secondList;
  });
  const posts = useSelector(function (state) {
    return state.posts;
  });
  const [isSorted, setIsSorted] = useState({
    firstList: false,
    secondList: false,
  });
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);
  const db = getFirestore(app);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "posts");
      const snapshots = await getDocs(colRef);

      const docs = await snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.isSelected = false;
        return data;
      });
      dispatch({
        type: GETALLPOSTS,
        payload: {
          posts: docs,
        },
      });
      return docs;
    })().then((res) => {
      !!res.length && setLoaded(false);
    });

    dispatch({
      type: RATECOMMENT,
      payload: {
        posts: posts?.map((item) => {
          return (
            (item.averageRate = item.comments.reduce(function (aggr, val) {
              return aggr + val.rate;
            }, 0)),
            item
          );
        }),
      },
    });
  }, []);

  const addItem = (list, listName) => {
    const newItem = posts?.reduce((aggr, val) => {
      if(!val.isSelected && (val.averageRate > aggr.averageRate)) {
          return val
      }  else {
        return aggr
      }
    }, {averageRate: -Infinity});

    // update column list
    if(posts.includes(newItem)) {
    const itemExist =
      firstList.some((obj) => obj.id === newItem.id) ||
      secondList.some((obj) => obj.id === newItem.id);
    if (!itemExist) {
      dispatch({
        type: ADDTOCOLUMN,
        payload: {
          [listName]: isSorted[list] ? [newItem, ...list] : [...list, newItem],
          listName: listName,
        },
      });
    }
    }

    // change isSelected value
    dispatch({
      type: ISSELECTEDTRUE,
      payload: {
        posts: posts.map((item) => {
          if (item.id === newItem.id) {
            return {
              ...item,
              isSelected: true,
            };
          } else {
            return item;
          }
        }),
      },
    });
  };

  // sorted by value
  const sortList = (list, listName) => {
    setIsSorted({
      ...isSorted,
      [listName]: !isSorted[listName],
    });

    dispatch({
      type: SORTAVERAGERATE,
      payload: {
        [listName]: list.sort((a, b) =>
          isSorted[listName]
            ? b.averageRate - a.averageRate
            : a.averageRate - b.averageRate
        ),
        listName: listName,
      },
    });
  };

  // delete me
  const onDelete = (list, listName, item) => {
    return (
      dispatch({
        type: DELETEME,
        payload: {
          [listName]: list.filter((elem) => elem.id !== item.id),
          listName: listName,
        },
      }),
      dispatch({
        type: ISSELECTEDFALSE,
        payload: {
          posts: posts.map((elem) => {
            if (elem.id === item.id) {
              return {
                ...item,
                isSelected: false,
              };
            } else {
              return elem;
            }
          }),
        },
      })
    );
  };

  // remove item
  const onRemove = (list, listName) => {
    if (list.length) {
      let deletedObj = { averageRate: 0 };
      for (const item in list) {
        deletedObj =
          list[item].averageRate > deletedObj.averageRate
            ? list[item]
            : deletedObj;
      }

      return (
        dispatch({
          type: REMOVEITEM,
          payload: {
            [listName]: list.filter((obj) => obj !== deletedObj),
            listName: listName,
          },
        }),
        dispatch({
          type: ONREMOVE,
          payload: {
            posts: posts.map((item) => {
              if (item.id === deletedObj.id) {
                return {
                  ...item,
                  isSelected: false,
                };
              } else {
                return item;
              }
            }),
          },
        })
      );
    }
  };

  const sortComments = (list, listName, elem) => {
    return dispatch({
      type: SORTCOMMENTS,
      payload: {
        [listName]: list.map((item) => {
          if (item.id === elem.id) {
            const sorted = elem?.comments?.sort((a, b) => b.rate - a.rate);
            return { ...elem, sorted };
          } else {
            return item;
          }
        }),
        listName: listName,
      },
    });
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <AccountMenu />
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Column One" {...a11yProps(0)} />
          <Tab label="Column Two" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Column
          addItem={addItem}
          sortList={sortList}
          onDelete={onDelete}
          onRemove={onRemove}
          listname="firstList"
          loaded={loaded}
          sortComments={sortComments}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Column
          addItem={addItem}
          sortList={sortList}
          onDelete={onDelete}
          onRemove={onRemove}
          listname="secondList"
          loaded={loaded}
          sortComments={sortComments}
        />
      </CustomTabPanel>
    </>
  );
};

export default List;
