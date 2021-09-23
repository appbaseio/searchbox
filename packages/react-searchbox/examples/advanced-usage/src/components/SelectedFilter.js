import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "@appbaseio/react-searchbox";
/* eslint-disable */
const COMPONENTS_TO_SUBSCRIBE = ["author-filter"];
const SelectedFilters = () => {
  const [state, setState] = useState({});
  const appContext = useContext(SearchContext);
  useEffect(() => {
    const componentIds = COMPONENTS_TO_SUBSCRIBE;
    const components = appContext.getComponents();
    componentIds.forEach((componentId, index) => {
      components[componentId].subscribeToStateChanges((change) => {
        const state = {};
        Object.keys(change).forEach((property) => {
          state[componentId] = change[property].next;
        });
        setState(state);
      }, "value");
    });
  }, []);

  const renderFilters = () => {
    if (!Object.keys(state).length) return null;
    const filtersLabels = Object.keys(state);
    const filtersValues = Object.values(state);

    const jsxArray = [];
    filtersLabels.forEach((label, index) => {
      let currentFilterValue = "";
      if (Array.isArray(filtersValues[index])) {
        currentFilterValue = filtersValues[index].join(", ");
      } else if (filtersValues[index]) {
        currentFilterValue = filtersValues[index];
      }

      if (!!currentFilterValue)
        return jsxArray.push(
          <button
            onClick={() => removeFilter(label)}
            className="filter-btn"
            key={label}
          >
            {" "}
            <h5>{label}&nbsp;|&nbsp;</h5>
            <span title={currentFilterValue}>{currentFilterValue}</span>
          </button>
        );
    });
    if (jsxArray.length) {
      return (
        <div className="selected-filters">
          <h4>Selected Filters:</h4>
          {jsxArray}
          <button onClick={clearAll}>Clear All</button>
        </div>
      );
    }
    return null;
  };

  const removeFilter = (label) => {
    const components = appContext.getComponents();
    components[label].setValue("", {
      triggerCustomQuery: true
    });
  };

  const clearAll = () => {
    COMPONENTS_TO_SUBSCRIBE.forEach((key) => {
      removeFilter(key);
    });
  };

  return renderFilters();
};

export default SelectedFilters;
