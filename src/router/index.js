import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import auth from './middleware/auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Blog',
        // route level code-splitting
        // this generates a separate chunk (blog.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "blog" */ '../views/blog/Blog'),
        meta: {
            title: 'Blog'
        },
        children: [
            {
                path: '',
                name: "Employees",
                component: () => import(/* webpackChunkName: "employees" */ '../views/blog/Employees'),
                meta: {title: 'Employees'}
            },
            {
                path: 'create',
                name: "CreateEmployee",
                component: () => import(/* webpackChunkName: "createEmployee" */ '../views/blog/CreateEmployee'),
                meta: {title: 'Create Employee'}
            },
            {
                path: 'edit/:id',
                name: "EditEmployee",
                component: () => import(/* webpackChunkName: "editEmployee" */ '../views/blog/EditEmployee'),
                meta: {title: 'Edit Employee'}
            },
            {
                path: 'tasks',
                name: "Tasks",
                component: () => import(/* webpackChunkName: "tasks" */ '../views/blog/Tasks'),
                meta: {title: 'Tasks'}
            },
            {
                path: 'tasks/create',
                name: "Create Task",
                component: () => import(/* webpackChunkName: "createTask" */ '../views/blog/CreateTask'),
                meta: {title: 'Create Task'}
            },
            {
                path: 'tasks/edit/:id',
                name: "Edit Task",
                component: () => import(/* webpackChunkName: "createTask" */ '../views/blog/EditTask'),
                meta: {title: 'Edit Task'}
            },
        ]
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router
