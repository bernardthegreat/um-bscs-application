
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
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/professors', name: 'Professors', component: () => import('src/pages/Professors.vue') },
      { path: '/professors/clearance', name: 'Clearance', component: () => import('src/components/Professor/Clearance.vue') }
    ]
  },

  {
    path: '/students',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '/students', name: 'Students', component: () => import('src/pages/Students.vue') },
      { path: '/students/attendance', name: 'Attendance', component: () => import('src/components/Students/Attendance.vue') },
      { path: '/students/grading', name: 'Grading', component: () => import('src/components/Students/Grading.vue') },
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
