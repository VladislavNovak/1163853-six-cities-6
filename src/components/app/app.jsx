import React from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {JumpTo, WarningType} from '../../utils/constants';
import browserHistory from '../../browser-history';

import {ScreenMain, ScreenLogin, ScreenFavorites, ScreenRoom, ScreenWarning, ScreenLoading, PrivateRoute} from '..';

const App = () => {
  const {hotels, isHotelsLoaded} = useSelector((state) => state.USER);

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
          render={() => <ScreenMain hotels={hotels} />} />

        <Route
          exact
          path={JumpTo.LOGIN}
          component={ScreenLogin}
        />

        <PrivateRoute
          exact
          path={JumpTo.FAVORITES}
          render={({}) => <ScreenFavorites hotels={hotels}/>} />

        <Route
          exact
          path={`${JumpTo.OFFER}/:id`}
          render={({match}) => <ScreenRoom id={match.params.id} hotels={hotels}/>} />

        <Route>
          <ScreenWarning warning={WarningType.INVALID_ADDRESS_BAR} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

// Router as BrowserRouter. Компонент `BrowserRouter` автоматически создаёт объект для работы с историей.
// Раз так, то нам необходимо чтобы `Router` пользовался нашим экземпляром объекта `history`, а не собственным.
// К сожалению, компонент `BrowserRouter` не позволяет этого сделать, но в пакете `react-router-dom` есть
// другой компонент – `Router`. Основное его отличие от `BrowserRouter` — конфигурируемость.
// Теперь, чтобы воспользоваться нашим экземпляром `history`, достаточно передать его в соответствующий пропс, в `history`.
