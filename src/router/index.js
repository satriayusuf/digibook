import Vue from 'vue'
import VueRouter from 'vue-router';
import firebase from 'firebase';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'landing',
        component: () => import('../components/Landing')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../components/Dashboard'),
        meta: {
            auth: true
        }
    },
    {
        path: '/peminjaman',
        name: 'peminjaman',
        component: () => import('../components/Peminjaman'),
        meta: {
            auth: true
        }
    },
    {
        path: '/selesaipeminjaman',
        name: 'selesaipeminjaman',
        component: () => import('../components/SelesaiPeminjaman'),
        meta: {
            auth: true
        }
    },
    {
        path: '/tambahpeminjaman',
        name: 'tambahpinjam',
        component: () => import('../components/TambahPinjam'),
        meta: {
            auth: true
        }
    },
    {
        path: '/create',
        name: 'add',
        component: () => import('../components/UserCreate'),
        meta: {
            auth: true
        }
        
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('../components/UserList'),
        meta: {
            auth: true
        }
    },
    {
        path: '/list/:id',
        name: 'buku',
        component: () => import('../components/Buku'),
        meta: {
            auth: true
        }
    },
    {
        path: '/buku/:id',
        name: 'bukunoauth',
        component: () => import('../components/Bukunoauth'),
        meta: {
            auth: false
        }
    },
    {
        path: '/buatbuku',
        name: 'buatbuku',
        component: () => import('../components/BuatBuku'),
        meta: {
            auth: true
        }
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: () => import('../components/UserEdit'),
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login'),
    },
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: () => import('../components/Register')
    // }
]

const router = new VueRouter({
    mode : 'history',
    base : process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user){
            if (to.matched.some(record => record.meta.auth)){
                next()
            }else{
                next({
                    path: '/dashboard'
                })
            }
        }else{
            if (to.matched.some(record => record.meta.auth)){
                next({
                    path: '/login'
                })
            }
            next();
        }
    })
})

export default router