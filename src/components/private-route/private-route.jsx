import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AuthorizationStatus, JumpTo} from '../../utils/constants';

const PrivateRoute = ({render, path, exact}) => {
  const {authorizationStatus} = useSelector((state) => state.AUTH);

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (authorizationStatus === AuthorizationStatus.AUTH ? render(routeProps) : <Redirect to={JumpTo.LOGIN} />);
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;

// Перехватчики - интерсепторы, решают проблему перенаправления, когда запрос был отправлен:
// Т.е. если сервер вернул `401`, то они выполнят перенаправление на маршруту `/login`.
// Но как быть, если необходимо решить эту же задачу на клиенте? Для этого потребуется реализовать
// компонент для описания приватных маршрутов, а затем воспользоваться им для всех маршрутов,
// доступ к которым возможен после предварительной авторизации.
