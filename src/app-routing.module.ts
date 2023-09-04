import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomePageComponent } from './app/shared/pages/home-page/home-page.component';
import { AboutPAgeComponent } from './app/shared/pages/about-page/about-page.component';
import { ContactPagesComponent } from './app/shared/pages/contact-pages/contact-pages.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'about',
        component: AboutPAgeComponent
    },
    {
        path: 'contact',
        component: ContactPagesComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot( routes )],
    exports: [RouterModule]
})
export class AppRoutingModule { }