export default [
    {
        path: '/',
        component: () => import('../views/Index'),
        meta: {auth: true},
        children: [
            {
                path: '',
                component: () => import('../views/Home'),
                meta: {auth: true},
            },
            {
                path: '/home',
                component: () => import('../views/Home'),
                meta: {auth: true},
            },
            {
                path: '/setting',
                component: () => import('../views/Setting'),
                meta: {auth: true},
            },
            {
                path: '/me',
                component: () => import('../views/Me'),
                meta: {auth: true},
            },
        ]
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
