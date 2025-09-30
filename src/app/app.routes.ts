import { Routes } from '@angular/router';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authGuard } from './core/guards/auth-guard';
import { loggedGuard } from './core/guards/logged-guard';
import { ForgetPassword } from './layouts/forget-password/forget-password';
import { Login } from './pages/login/login';



export const routes: Routes = [


  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'' , component: AuthLayout, title:'auth',canActivate:[loggedGuard] ,children:[
    {path:'login', component:Login, title:'login'},
    {path:'register', loadComponent:()=>import('../app/pages/register/register').then((c)=>c.Register), title:'register'},
        {path:'forget', component:ForgetPassword, title:'forget'}
  ]},

  {path: '', component:BlankLayout , title:'blank', canActivate:[authGuard], children:[
   {path:'home',loadComponent:()=>import("../app/pages/home/home").then((c)=>c.Home), title:'home'},
   {path:'cart',loadComponent:()=>import('../app/pages/cart/cart').then((c)=>c.Cart), title:'cart'},
   {path:'brands',loadComponent:()=>import('../app/pages/brands/brands').then((c)=>c.Brands), title:'brands'},
   {path:'details/:slug/:id',loadComponent:()=>import('../app/pages/details/details').then((c)=>c.Details), title:'details'},
      {path:'details/:id',loadComponent:()=>import('../app/pages/details/details').then((c)=>c.Details), title:'details'},
   {path:'categories',loadComponent:()=>import('../app/pages/categories/categories').then((c)=>c.Categories), title:'categories'},
  {path:'allorders/:id',loadComponent:()=>import('../app/pages/allorders/allorders').then((c)=>c.Allorders), title:'all orders'},
   {path:'products', loadComponent:()=>import('../app/pages/products/products').then((c)=>c.Products), title:'products'},
   {path:'checkout/:id',loadComponent:()=>import('../app/pages/checkout/checkout').then((c)=>c.Checkout), title:'checkout'}
  ]},

  {path:'**',loadComponent:()=>import('../app/pages/not-found/not-found').then((c)=>c.NotFound), title:'not found'}
];
