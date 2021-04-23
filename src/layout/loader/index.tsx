import { Fragment } from "react";
import React from "react";

const Loader = () => {
  return (
    <Fragment>
      <div className={`loader-wrapper`}>
        <div className="loader-index">
          <span></span>
        </div>
      </div>
    </Fragment>
  );
};

export default Loader;
