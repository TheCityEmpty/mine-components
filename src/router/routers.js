import index from '@/view/index.vue'

export default [
  {
    path: '/',
    redirect: '/introduce',
    component: index,
    children: [
      {
        path: 'introduce',
        name: 'introduce',
        component: () => import('@/view/introduce/introduce.vue')
      }
    ]
  }
]
