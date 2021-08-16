
const routes = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { name: 'Homepage', path: '', component: () => import('pages/Students.vue') }
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
      { path: '/professors', name: 'Professors', component: () => import('src/pages/Professors.vue') },
      { path: '/professors/settings', name: 'Settings', component: () => import('src/components/Professor/Settings.vue') }
    ]
  },

  {
    path: '/students',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '/students', name: 'Students', component: () => import('src/pages/Students.vue') },
      { path: '/students/attendance', name: 'Attendance', component: () => import('src/components/Students/Attendance.vue') }
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
