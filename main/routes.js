export default (components = {}) => [
  {
    path: '/about',
    exact: true,
    component: components.PAbout
  },
  {
    path: '/',
    exact: true,
    component: components.PMain
  },
  {
    path: '/game/:id',
    exact: true,
    component: components.PGame
  },
  {
    path: '/past-games',
    exact: true,
    component: components.PPastGames
  },
  {
    path: '/library',
    exact: true,
    component: components.PLibrary
  },
  {
    path: '/create-template',
    exact: true,
    component: components.PCreateTemplate
  },
  {
    path: '/templates/:id',
    exact: true,
    component: components.PEditTemplate
  },
]
