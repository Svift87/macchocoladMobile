import Vue from 'vue'
import Router from 'vue-router'

import PageStart from '@/components/PageStart'
import PageOne from '@/components/PageOne'
import PageTwo from '@/components/PageTwo'
import PageRecipes from '@/components/PageRecipes'
import PageNews from '@/components/PageNews'
import PagePrelast from '@/components/PagePrelast'
import PageScore from '@/components/PageScore'
import PageMobile from '@/components/PageMobile'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/', 
            name: 'Start',
            component: PageStart
        },
        {
            path: '/One', 
            name: 'One',
            component: PageOne
        },
        {
            path: '/Two', 
            name: 'Two',
            component: PageTwo
        },
        {
            path: '/Recipes', 
            name: 'Recipes',
            component: PageRecipes
        },
        {
            path: '/News', 
            name: 'News',
            component: PageNews
        },
        {
            path: '/Prelast', 
            name: 'Prelast',
            component: PagePrelast
        },
        {
            path: '/Score', 
            name: 'Score',
            component: PageScore
        },
        { 
            path: '*', 
            component: NotFoundComponent 
        },{
            path: '/Mobile', 
            name: 'Mobile',
            component: PageMobile
        }
    ]
})  

export default router

