import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button, Pagination } from "@mui/material";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { FILTERCOMMENTS, FILTERPOSTS, SELECTALL } from "../redux/action";

const Column = (props) => {
  const filteredArray = useSelector(function (state) {
    return state.filteredArray;
  });
  const [text, setText] = useState("");
  const [list, setList] = useState(props.listname);
  const dispatch = useDispatch();
  const column = useSelector(function (state) {
    return state[props.listname];
  });

  const onFilter = (filteredBy) => {
    // posts
    if (filteredBy === "posts") {
      return dispatch({
        type: FILTERPOSTS,
        payload: {
          filteredArray: column.filter(
            (post) => post.title.toLowerCase() === text.toLowerCase()
          ),
        },
      });
    }

    // comments
    else if (filteredBy === "comments") {
      return dispatch({
        type: FILTERCOMMENTS,
        payload: {
          filteredArray: column.filter((item) =>
            item.comments.some((elem) => elem.text.includes(text.toLowerCase()))
          ),
        },
      });
    }

    // all posts
    return dispatch({
      type: SELECTALL,
      payload: {
        filteredArray: column,
      },
    });
  };

  useEffect(() => {
    onFilter(list);
  }, [column]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setTotalPages(Math.ceil(filteredArray.length / ITEMS_PER_PAGE));
  }, [filteredArray.length]);

  const getPostsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredArray.slice(startIndex, endIndex);
  };

  return (
    <div
      style={{
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
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              return onFilter(list);
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
          value={list}
          onChange={(e) => {
            setList(e.target.value);
          }}
        >
          <option value={props.listname}> All </option>
          <option value="comments"> comments </option>
          <option value="posts"> posts </option>
        </select>
        <Button
          variant="contained"
          onClick={() => {
            onFilter(list);
          }}
        >
          Filter
        </Button>
      </div>
      <div style={{ display: "flex", gap: "10px", paddingTop: "15px" }}>
        <Button
          variant="contained"
          onClick={() => props.sortList(column, props.listname)}
          style={{
            backgroundColor: "grey",
          }}
        >
          Sort
        </Button>
        <Button
          disabled={props.loaded}
          variant="contained"
          color="success"
          onClick={() => {
            list === props.listname && props.addItem(column, props.listname);
          }}
        >
          Add
        </Button>
        {list === props.listname && (
          <Button
            disabled={props.loaded}
            variant="contained"
            color="error"
            onClick={() =>
              props.onRemove(column, props.listname, onFilter(list))
            }
          >
            Remove
          </Button>
        )}
      </div>

      {!!column.length && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            color="primary"
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>
      )}
      {getPostsForCurrentPage().map((item) => (
        <div
          key={uuid()}
          style={{
            border: "2px white solid",
            textAlign: "center",
            paddingRight: "10px",
          }}
        >
          <Post
            item={item}
            onDelete={props.onDelete}
            listname={props.listname}
            column={column}
            sortComments={props.sortComments}
          />
        </div>
      ))}

      {!!column.length && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            color="primary"
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>
      )}
    </div>
  );
};

export default Column;
