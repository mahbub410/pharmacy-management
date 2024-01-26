import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/Login.vue';
import DashboardPage from '../views/Dashboard.vue';
// import Overview from '../views/dashboard/Overview.vue';
// import Drugs from '../views/dashboard/Drugs.vue';

// variable er bitor nile project build howar somoy sob load hobe 
const Overview = ()=> import('../views/dashboard/Overview.vue');
const Drugs = ()=> import("../views/Dashboard/Drugs.vue");
const SellingHistory = ()=> import("../views/Dashboard/SellingHistory.vue");
const Settings = ()=> import("../views/Dashboard/Settings.vue");
const Vendors = ()=> import("../views/Dashboard/Vendors.vue");

const routes = [
    {path: '/', component: LoginPage },
    {   path: '/dashboard', 
        component: DashboardPage,
        redirect: '/dashboard/overview',
        children:[
        {path: 'overview', component: Overview},
        {path: 'drug', component: Drugs},
        {path: 'vendor', component: Vendors},
        {path: 'selling-history', component: SellingHistory},
        {path: 'settings', component: Settings}
    ]
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;