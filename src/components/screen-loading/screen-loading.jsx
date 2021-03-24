import React from 'react';
import {WarningType} from '../../utils/constants';
import {Loading, LoadingWrapper} from './screen-loading.style';

const ScreenLoading = () => {
  const styleText = {
    fontFamily: `monospace`,
    textAlign: `center`,
    fontSize: `28px`,
    color: `#1E90FF`,
    lineHeight: `26px`,
    fontWeight: `700`,
  };

  return (
    <LoadingWrapper>
      <p style={styleText}>{WarningType.LOADING}</p>
      <Loading />
    </LoadingWrapper>
  );
};

export default ScreenLoading;
