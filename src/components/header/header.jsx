import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, JumpTo} from '../../utils/constants';

import {Logo} from '..';

const Header = ({classNameForLogoLink}) => {
  const {authorizationStatus} = useSelector((state) => state.AUTH);
  const {userEmail} = useSelector((state) => state.USER);
  const path = (AuthorizationStatus.AUTH === authorizationStatus) ? JumpTo.ROOT : JumpTo.LOGIN;
  const title = (AuthorizationStatus.AUTH === authorizationStatus) ? userEmail : `Sign in`;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo classNameForLogoLink={classNameForLogoLink}/>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  to={path}
                  className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">{title}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  classNameForLogoLink: PropTypes.string,
};

export default Header;
