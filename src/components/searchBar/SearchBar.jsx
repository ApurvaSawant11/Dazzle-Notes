import React, { useState, useEffect, useRef } from "react";
import "./searchBar.css";
import { useData } from "../../context";
import { SearchIcon, FilterIcon } from "../../assets";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const node = useRef();
  const [dropDown, setDropDown] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { tagsList, dispatch, filterTags, sortByPriority, sortByDate } =
    useData();

  const SORT_BY_PRIORITY = [
    { sortText: "Low to High", sortType: "LOW_TO_HIGH" },
    { sortText: "High to Low", sortType: "HIGH_TO_LOW" },
  ];

  const SORT_BY_DATE = [
    { sortText: "Recent first", sortType: "LATEST" },
    { sortText: "Old first", sortType: "OLD" },
  ];

  const searchHandler = (e) => {
    if (e.key === "Enter" || e.target.value === "" || e.type === "click")
      dispatch({
        type: "SEARCH",
        payload: e.type === "click" ? input : e.target.value,
      });
    navigate("/");
  };

  useEffect(() => {
    setInput("");
    dispatch({
      type: "SEARCH",
      payload: "",
    });
  }, [navigate]);

  const changeHandler = (checked, value) => {
    if (checked) {
      if (!filterTags.includes(value)) {
        dispatch({
          type: "ADD_TO_TAGS",
          payload: value,
        });
      }
    } else {
      let list = filterTags.filter((item) => item !== value);
      dispatch({
        type: "REMOVE_FROM_TAGS",
        payload: list,
      });
    }
  };

  const [showFilters, setShowFilters] = useState(false);
  const clickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setDropDown(false);
    setShowFilters(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [showFilters]);

  return (
    <div ref={node} onClick={() => setShowFilters(!showFilters)}>
      <div className="flex-row-center">
        <div className="flex-row-center search-box search-container">
          <input
            type="search"
            className="search-input basic-bg"
            onKeyDown={(e) => searchHandler(e)}
            onChange={(e) => setInput(e.target.value)}
          />
          <SearchIcon
            className="search-icon"
            onClick={(e) => searchHandler(e)}
          />
        </div>
        <span
          className="filter-icon text-lg mx-1"
          onClick={() => setDropDown(!dropDown)}
        >
          <FilterIcon />
        </span>
      </div>

      {dropDown && (
        <div className="filter-container">
          <div className="modal border-1">
            <div className="p-1 pb-0 fw-700">Filter by Tags</div>
            <div className="flex-column wrap p-1">
              {tagsList.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={item}
                    checked={filterTags.includes(item)}
                    name="option"
                    onChange={(e) =>
                      changeHandler(e.target.checked, e.target.value)
                    }
                  />{" "}
                  {item}
                </label>
              ))}
            </div>
            <div className="pl-1 pb-0 fw-700">Sort by Priority</div>
            <div className="p-1">
              {SORT_BY_PRIORITY.map(({ sortText, sortType }, index) => (
                <label key={index} className="radio-container pr-1">
                  <input
                    type="radio"
                    name="radio-sort"
                    className="radio-field"
                    checked={sortByPriority === sortType}
                    onChange={() =>
                      dispatch({
                        type: "SORT_BY_PRIORITY",
                        payload: sortType,
                      })
                    }
                  />{" "}
                  {sortText}
                </label>
              ))}
            </div>

            <div className="pl-1 pb-0 fw-700">Sort by Date</div>
            <div className="p-1">
              {SORT_BY_DATE.map(({ sortText, sortType }, index) => (
                <label key={index} className="radio-container pr-1">
                  <input
                    type="radio"
                    name="radio-date"
                    className="radio-field"
                    checked={sortByDate === sortType}
                    onChange={() =>
                      dispatch({
                        type: "SORT_BY_DATE",
                        payload: sortType,
                      })
                    }
                  />{" "}
                  {sortText}
                </label>
              ))}
            </div>
            <div className="filter-footer p-0p5 pl-1 danger-text">
              <span onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })}>
                Clear all filters
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchBar };
