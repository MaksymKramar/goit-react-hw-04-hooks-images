import React from "react";
import PropTypes from "prop-types";

import style from "./Button.module.css";

function Button({ onClick }) {
  return (
    <div className={style.Container}>
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
