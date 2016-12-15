// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

// Bring in the auth sagas since they're needed everywhere
import authSagas from 'containers/AuthPage/sagas';

// Ensure user is logged in, otherwise redirect
import { requireAuth } from 'utils/auth';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  // Ensure the auth sagas are loaded on every page
  injectSagas(authSagas);

  return [
    {
      path: '/auth',
      name: 'auth',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/AuthPage/reducer'),
          System.import('containers/AuthPage/sagas'),
          System.import('containers/AuthPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('auth', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/',
      name: 'organizationsPage',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/OrganizationsPage/reducer'),
          System.import('containers/OrganizationsPage/sagas'),
          System.import('containers/OrganizationsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('organizationsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
