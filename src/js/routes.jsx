import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import AppContainer from 'views/AppContainer';
import NotFoundPage from 'views/NotFoundPage';

import TimetableContainer from 'views/timetable/TimetableContainer';
import ModulesContainer from 'views/modules/ModulesContainer';
import ModuleFinderContainer from 'views/modules/ModuleFinderContainer';
import ModulePageContainer from 'views/modules/ModulePageContainer';
import SettingsContainer from 'views/settings/SettingsContainer';

/* eslint-disable react/prop-types */
export default function ({ store, history }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppContainer}>
          <IndexRedirect to="/timetable"/>
          <Route path="/timetable" component={TimetableContainer}/>
          <Route path="/modules" component={ModulesContainer}>
            <IndexRoute component={ModuleFinderContainer}/>
            <Route path=":moduleCode" component={ModulePageContainer}/>
          </Route>
          <Route path="/settings" component={SettingsContainer}/>
          <Route path="*" component={NotFoundPage}/>
        </Route>
      </Router>
    </Provider>
  );
}
