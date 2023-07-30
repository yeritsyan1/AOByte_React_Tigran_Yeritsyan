import { legacy_createStore as createStore } from "redux";
import {
  ADDTOCOLUMN,
  DELETEME,
  FILTERCOMMENTS,
  FILTERPOSTS,
  GETALLPOSTS,
  ISSELECTEDFALSE,
  ISSELECTEDTRUE,
  ONREMOVE,
  RATECOMMENT,
  REMOVEITEM,
  SELECTALL,
  SORTAVERAGERATE,
  SORTCOMMENTS,
} from "./action";

const updatePosts = [
  GETALLPOSTS,
  ISSELECTEDTRUE,
  ISSELECTEDFALSE,
  ONREMOVE,
  RATECOMMENT,
];
const updateColumn = [
  ADDTOCOLUMN,
  REMOVEITEM,
  DELETEME,
  SORTCOMMENTS,
  SORTAVERAGERATE,
];
const filterPosts = [FILTERPOSTS, FILTERCOMMENTS, SELECTALL];

export const store = createStore(
  function (state, action) {
    if (updatePosts.includes(action.type)) {
      return {
        ...state,
        posts: action.payload.posts,
      };
    }

    if (updateColumn.includes(action.type)) {
      return {
        ...state,
        [action.payload.listName]: action.payload[action.payload.listName],
      };
    }

    if (filterPosts.includes(action.type)) {
      return {
        ...state,
        filteredArray: action.payload.filteredArray,
      };
    }

    return state;
  },
  {
    posts: [],
    firstList: [],
    secondList: [],
    filteredArray: [],
  }
);
