import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/Login.vue';
import DashboardPage from '../views/Dashboard.vue';
// import Overview from '../views/dashboard/Overview.vue';
// import Drugs from '../views/dashboard/Drugs.vue';

// variable er bitor nile project build howar somoy sob load hobe 
const Overview = ()=> import('../views/dashboard/Overview.vue');
const Drugs = ()=> import("../views/dashboard/Drugs.vue");
const SellingHistory = ()=> import("../views/dashboard/SellingHistory.vue");
const Settings = ()=> import("../views/dashboard/Settings.vue");
const Vendors = ()=> import("../views/dashboard/Vendors.vue");
const Account = ()=> import("../views/dashboard/setting/Account.vue");
const Website = ()=> import("../views/dashboard/setting/Website.vue");
const Theme = ()=> import("../views/dashboard/setting/Theme.vue");


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
            {
                path: 'settings', component: Settings,
                redirect: "/dashboard/settings/account",
                children: [
                    { path: 'account', component: Account },
                    { path: 'website', component: Website },
                    { path: 'theme', component: Theme }
                ]
            }
    ]
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;