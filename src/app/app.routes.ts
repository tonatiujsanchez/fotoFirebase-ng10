import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotosComponent } from './pages/fotos/fotos.component';
import { CargaComponent } from './pages/carga/carga.component';


const RUTAS: Routes = [
    {
        path: 'fotos',
        component: FotosComponent
    },
    {
        path: 'carga',
        component: CargaComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'fotos'
    }
];

export const APP_ROUTES = RouterModule.forRoot( RUTAS );
