import React from 'react';
import {WarningType} from '../../utils/constants';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
display: flex;
flex-direction: column;
align-items: center;
align-content: center;
justify-content: center;
overflow: auto;
background: radial-gradient(#edf1cf, #43acb4);
`;

const Loading = styled.div`
color: #65abf8;
background: linear-gradient(45deg, #00c6fb, #005bea);
font-size: 90px;
text-indent: -9999em;
overflow: hidden;
width: 1em;
height: 1em;
border-radius: 50%;
margin: 72px auto;
position: relative;
-webkit-transform: translateZ(0);
-ms-transform: translateZ(0);
transform: translateZ(0);
-webkit-animation: load6 1.7s infinite ease;
animation: load6 1.7s infinite ease;

@-webkit-keyframes load6 {
0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
}
5%,
95% {box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;}
10%,
59% {box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;}
20% {box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;}
38% {box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;}
100% {-webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;}
}
@keyframes load6 {
0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
}
5%,
95% {box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;}
10%,
59% {box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;}
20% {box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;}
38% {box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;}
100% {-webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
}}
`;

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
