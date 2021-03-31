import React from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {JumpTo, WarningType} from '../../utils/constants';

import {ScreenMain,
  ScreenLogin,
  ScreenFavorites,
  ScreenRoom,
  ScreenWarning,
  ScreenLoading,
  PrivateRoute,
} from '..';

const App = () => {
  const {isHotelsLoaded} = useSelector((state) => state.USER);

  if (!isHotelsLoaded) {
    return (
      <ScreenLoading />
    );
  }

  return (
    <Switch>
      <Route
        exact
        path={JumpTo.LOGIN}
        component={ScreenLogin} />

      <Route
        exact
        path={JumpTo.ROOT}
        render={() => <ScreenMain/>} />

      <PrivateRoute
        exact
        path={JumpTo.FAVORITES}
        render={() => <ScreenFavorites />} />

      <Route
        exact
        path={`${JumpTo.OFFER}/:id`}
        render={({match}) => <ScreenRoom id={match.params.id} />} />

      <Route>
        <ScreenWarning warning={WarningType.INVALID_ADDRESS_BAR} />
      </Route>
    </Switch>
  );
};

export default App;

// Router as BrowserRouter. Компонент `BrowserRouter` автоматически создаёт объект для работы с историей.
// Раз так, то нам необходимо чтобы `Router` пользовался нашим экземпляром объекта `history`, а не собственным.
// К сожалению, компонент `BrowserRouter` не позволяет этого сделать, но в пакете `react-router-dom` есть
// другой компонент – `Router`. Основное его отличие от `BrowserRouter` — конфигурируемость.
// Теперь, чтобы воспользоваться нашим экземпляром `history`, достаточно передать его в соответствующий пропс, в `history`.
