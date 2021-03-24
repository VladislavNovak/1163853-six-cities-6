import React from "react";
import PropTypes from 'prop-types';

import {
  NotFoundWrapper,
  NotFound,
  NotFound404,
  NotFound404FirstChildren,
  NotFoundH1,
  NotFoundH2,
  NotFoundP,
  NotFoundLink,
} from "./screen-warning-style";

const ScreenWarning = ({warning}) => {
  return (
    <NotFoundWrapper>
      <NotFound>
        <NotFound404>
          <NotFound404FirstChildren></NotFound404FirstChildren>
          <NotFoundH1>404</NotFoundH1>
        </NotFound404>
        <NotFoundH2>{warning}</NotFoundH2>
        <NotFoundP>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</NotFoundP>
        <NotFoundLink to="/">Вернуться на главную</NotFoundLink>
      </NotFound>
    </NotFoundWrapper>
  );
};

ScreenWarning.propTypes = {
  warning: PropTypes.string.isRequired,
};

export default ScreenWarning;

