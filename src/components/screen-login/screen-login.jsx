import React, {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../../store/api-action';
import {Redirect} from 'react-router';
import {AuthorizationStatus, JumpTo, REGULAR_EMAIL_TEMPLATE} from '../../utils/constants';

import {Header} from '..';

const ScreenLogin = () => {
  const {authorizationStatus} = useSelector((state) => state.AUTH);
  const dispatch = useDispatch();
  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (REGULAR_EMAIL_TEMPLATE.test(loginRef.current.value)) {
      dispatch(login({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }));
    }
  };

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={JumpTo.ROOT} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action="#"
              method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  data-testid="login"
                  placeholder="Email"
                  required=""/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  data-testid="password"
                  placeholder="Password"
                  autoComplete="off"
                  required=""/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScreenLogin;
