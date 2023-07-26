import React, { useEffect, useState } from "react";
import Column from "./Column";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { app } from "../firebase/firebase";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AccountMenu from "./AccountNavigation";
import CustomTabPanel, { a11yProps } from "./CustomTabPanel";

const List = () => {
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [isSorted, setIsSorted] = useState({
    firstList: false,
    secondList: false,
  });
  const [posts, setPosts] = useState([]);
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
        data.averageRate = Math.random() * 100;
        return data;
      });
      await setPosts(docs);
    })().then(() => setLoaded(false));

    setPosts(() => {
      return posts?.map((item) => {
        return (
          (item.averageRate = item.comments.reduce(function (aggr, val) {
            return aggr + val.rate;
          }, 0)),
          item
        );
      });
    });
  }, []);

  const addItem = (listname, setList) => {
    const newItem = posts?.reduce((aggr, val) => {
      return val.isSelected
        ? aggr
        : val.averageRate > aggr.averageRate
        ? val
        : aggr;
    }, posts[0]);

    // update column list
    const itemExist =
      firstList.some((obj) => obj.id === newItem.id) ||
      secondList.some((obj) => obj.id === newItem.id);
    if (!itemExist) {
      setList(() => {
        return isSorted[listname]
          ? [newItem, ...listname]
          : [...listname, newItem];
      });
    }

    // change isSelected value
    setPosts(() => {
      return posts.map((item) => {
        if (item.id === newItem.id) {
          return {
            ...item,
            isSelected: true,
          };
        } else {
          return item;
        }
      });
    });
  };

  // sorted by value
  const sortList = (listname, setList) => {
    setIsSorted({
      ...isSorted,
      [listname]: !isSorted[listname],
    });
    setList(() => {
      return listname.sort((a, b) =>
        isSorted[listname]
          ? b.averageRate - a.averageRate
          : a.averageRate - b.averageRate
      );
    });
  };

  // delete me
  const onDelete = (listname, setList, item) => {
    setList(() => {
      return listname.filter((elem) => elem.id !== item.id);
    });

    setPosts(() => {
      return posts.map((elem) => {
        if (elem.id === item.id) {
          return {
            ...item,
            isSelected: false,
          };
        } else {
          return elem;
        }
      });
    });
  };
  // remove item
  const onRemove = (listname, setList) => {
    if (listname.length) {
      let deletedObj = { averageRate: 0 };
      for (const item in listname) {
        deletedObj =
          listname[item].averageRate > deletedObj.averageRate
            ? listname[item]
            : deletedObj;
      }

      return (
        setList(() => {
          return listname.filter((obj) => obj !== deletedObj);
        }),
        /* () => {
          return sortList(listname), sortList(listname);
        } */
        setPosts(() => {
          return posts.map((item) => {
            if (item.id === deletedObj.id) {
              return {
                ...item,
                isSelected: false,
              };
            } else {
              return item;
            }
          });
        })
      );
    }
  };

  const sortComments = (listname, setList, elem) => {
    setList(() => {
      return listname.map((item) => {
        if (item.id === elem.id) {
          const sorted = elem?.comments?.sort((a, b) => b.rate - a.rate);
          return { ...elem, sorted };
        } else {
          return item;
        }
      });
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
          column={firstList}
          sortList={sortList}
          onDelete={onDelete}
          onRemove={onRemove}
          listname="firstList"
          setUpdateList={setFirstList}
          loaded={loaded}
          sortComments={sortComments}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Column
          addItem={addItem}
          column={secondList}
          sortList={sortList}
          onDelete={onDelete}
          onRemove={onRemove}
          // listname="secondList"
          listname="secondList"
          setUpdateList={setSecondList}
          loaded={loaded}
          sortComments={sortComments}
        />
      </CustomTabPanel>
    </>
  );
};

export default List;
