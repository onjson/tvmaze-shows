import Loadable from 'react-loadable';

const LoadableSearchPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "searchPage" */ './pages/SearchPage'),
  loading: () => null,
});

const LoadableShowsPage = Loadable({
  loader: () => import(/* webpackChunkName: "showsPage" */ './pages/ShowsPage'),
  loading: () => null,
});

const LoadableShowInfoPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "showInfoPage" */ './pages/ShowInfoPage'),
  loading: () => null,
});

const LoadablePageNotFound = Loadable({
  loader: () =>
    import(/* webpackChunkName: "pageNotFound" */ './pages/PageNotFound'),
  loading: () => null,
});

const routes = [
  {
    key: '1',
    path: '/',
    component: LoadableSearchPage,
    exact: true,
  },
  {
    key: '2',
    path: '/shows',
    component: LoadableShowsPage,
    exact: true,
  },
  {
    key: '3',
    path: '/shows/:id',
    component: LoadableShowInfoPage,
    exact: false,
  },
  {
    key: '4',
    component: LoadablePageNotFound,
    exact: false,
  },
];

export default routes;
