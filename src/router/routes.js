const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', redirect: '/register' },
      { path: 'nuevoRegistro',component: () => import('components/auth/RegisterForm.vue')}
    ],
  },
  {
    path: '/login',
    component: () => import('components/auth/LoginForm.vue'),
  },
  {
    path: '/register',
    component: () => import('components/auth/RegisterForm.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]


export default routes
