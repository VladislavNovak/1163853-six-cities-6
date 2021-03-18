import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {hotelStructure} from '../../utils/types';
import {JumpTo, WarningType} from '../../utils/constants';
import browserHistory from '../../browser-history';

import {ScreenMain, ScreenLogin, ScreenFavorites, ScreenRoom, ScreenWarning, ScreenLoading, PrivateRoute} from '..';

const App = ({hotels, isHotelsLoaded}) => {

  if (!isHotelsLoaded) {
    return (
      <ScreenLoading />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route
          exact
          path={JumpTo.ROOT}
          render={({history}) => {
            return <ScreenMain
              hotels={hotels}
              onClickHotel={(id) => history.push(`${JumpTo.OFFER}/${id}`)}
            />;
          }}
        />
        <Route
          exact
          path={JumpTo.LOGIN}
          component={ScreenLogin}
        />
        <PrivateRoute
          exact
          path={JumpTo.FAVORITES}
          render={({history}) => (
            <ScreenFavorites
              hotels={hotels}
              onClickHotel={(id) => history.push(`${JumpTo.OFFER}/${id}`)}
            />
          )}
        />
        <Route
          exact
          path={`${JumpTo.OFFER}/:id`}
          render={({history, match}) => (
            <ScreenRoom
              id={match.params.id}
              hotels={hotels}
              onClickHotel={(id) => history.push(`${JumpTo.OFFER}/${id}`)}
            />
          )}
        />
        <Route>
          <ScreenWarning warning={WarningType.INVALID_ADDRESS_BAR} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  hotels: PropTypes.arrayOf(hotelStructure),
  isHotelsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({USER}) => ({
  hotels: USER.hotels,
  isHotelsLoaded: USER.isHotelsLoaded,
});

export {App};
export default connect(mapStateToProps, null)(App);


// Router as BrowserRouter. Компонент `BrowserRouter` автоматически создаёт объект для работы с историей.
// Раз так, то нам необходимо чтобы `Router` пользовался нашим экземпляром объекта `history`, а не собственным.
// К сожалению, компонент `BrowserRouter` не позволяет этого сделать, но в пакете `react-router-dom` есть
// другой компонент – `Router`. Основное его отличие от `BrowserRouter` — конфигурируемость.
// Теперь, чтобы воспользоваться нашим экземпляром `history`, достаточно передать его в соответствующий пропс, в `history`.
