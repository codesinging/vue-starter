export default [
    {
        path: '/',
        component: () => import('../views/Home'),
        meta: {auth: false},
        children: []
    },
    {
        path: '/auth',
        component: () => import('../views/Auth')
    },
    {
        path: '*',
        component: () => import('../views/404')
    }
]
