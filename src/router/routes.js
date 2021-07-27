
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/registration',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/StudentRegistration.vue') }
    ]
  },

  {
    path: '/professors',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', name: 'Professors', component: () => import('src/pages/Professors.vue') }
    ]
  },

  {
    path: '/students',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', name: 'Students', component: () => import('src/pages/Students.vue') }
    ]
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
