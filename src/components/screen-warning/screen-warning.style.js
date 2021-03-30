import styled from 'styled-components';
import {Link} from "react-router-dom";

export const NotFoundWrapper = styled.div`
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  position: relative;
  height: 100vh;
`;

export const NotFound = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  max-width: 460px;
  width: 100%;
  text-align: center;
  line-height: 1.4;
`;

export const NotFound404 = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0px auto 50px;
`;

export const NotFound404FirstChildren = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #ffa200;
  -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
          transform: rotate(45deg);
  border: 5px dashed #000;
  border-radius: 5px;
  &:before {
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
    bottom: -5px;
    top: -5px;
    -webkit-box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.1) inset;
            box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.1) inset;
    border-radius: 5px;
  }
`;

export const NotFoundH1 = styled.h1`
  font-family: 'Cabin', sans-serif;
  color: #000;
  font-weight: 700;
  margin: 0;
  font-size: 90px;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  left: 50%;
  text-align: center;
  height: 40px;
  line-height: 40px;
`;

export const NotFoundH2 = styled.h2`
  font-family: 'Cabin', sans-serif;
  font-size: 33px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 7px;
`;

export const NotFoundP = styled.p`
  font-family: 'Cabin', sans-serif;
  font-size: 16px;
  color: #000;
  font-weight: 400;
`;

export const NotFoundLink = styled(Link)`
  font-family: 'Cabin', sans-serif;
  display: inline-block;
  padding: 10px 25px;
  background-color: #8f8f8f;
  border: none;
  border-radius: 40px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
  &:hover {
    background-color: #4481c3;
  }
`;
