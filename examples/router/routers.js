import index from '@/test/index.vue'

export default [
  {
    path: '/',
    redirect: '/myLoading',
    component: index,
    children: [
      {
        path: '/myLoading',
        name: 'myLoading',
        component: () => import('@/test/myLoading/myLoading.vue')
      },
      {
        path: '/myCalendar',
        name: 'myCalendar',
        component: () => import('@/test/myCalendar/myCalendar.vue')
      }
    ]
  }
]
