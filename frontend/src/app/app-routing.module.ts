import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./pagine/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pagine/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'pagine/rewards',
    loadChildren: () =>
      import('./pagine/rewards/rewards.module').then((m) => m.RewardsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'pagine/settings',
    loadChildren: () =>
      import('./pagine/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pagine/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoggedInGuard], // Impedisce agli utenti loggati di accedere
  },
  {
    path: 'notFound',
    loadChildren: () =>
      import('./pagine/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'notFound', // Cambiato da 'login' a 'notFound'
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'homepage',
//     pathMatch: 'full',
//   },
//   {
//     path: 'homepage',
//     loadChildren: () =>
//       import('./pagine/homepage/homepage.module').then(
//         (m) => m.HomepageModule
//       ),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'profile',
//     loadChildren: () =>
//       import('./pagine/profile/profile.module').then((m) => m.ProfileModule),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'pagine/rewards',
//     loadChildren: () =>
//       import('./pagine/rewards/rewards.module').then((m) => m.RewardsModule),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'pagine/settings',
//     loadChildren: () =>
//       import('./pagine/settings/settings.module').then(
//         (m) => m.SettingsModule
//       ),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'login',
//     loadChildren: () =>
//       import('./pagine/login/login.module').then((m) => m.LoginModule),
//   },
//   {
//     path: '**',
//     redirectTo: 'notFound',
//     pathMatch: 'full',
//   },
//   {
//     path: 'notFound',
//     loadChildren: () =>
//       import('./pagine/not-found/not-found.module').then(
//         (m) => m.NotFoundModule
//       ),
//   },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       scrollPositionRestoration: 'top' // Aggiunto per scroll istantaneo in cima || scrollPositionRestoration è una soluzione nativa di Angular (meglio di un window.toScroll() su app.component.ts o di un servizio
//     })
//   ],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}