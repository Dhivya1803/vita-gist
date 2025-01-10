import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./layouts/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./layouts/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./layouts/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./layouts/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
    // Protected routes (auth required)
    {
      path: '',
      canActivate: [AuthGuard],
      children: [
        {
          path: 'dashboard',
          loadChildren: () => import('./features/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
        },
        {
          path: 'health',
          loadChildren: () => import('./features/health/health.module')
            .then(m => m.HealthModule)
        },
        {
          path: 'documents',
          loadChildren: () => import('./features/documents/documents.module')
            .then(m => m.DocumentsModule)
        },
        {
          path: 'connections',
          loadChildren: () => import('./features/connections/connections.module')
            .then(m => m.ConnectionsModule)
        },
        {
          path: 'calendar',
          loadChildren: () => import('./features/calendar/calendar.module')
            .then(m => m.CalendarModule)
        },
        {
          path: 'chats',
          loadChildren: () => import('./features/chats/chats.module')
            .then(m => m.ChatsModule)
        },
        {
          path: 'notifications',
          loadChildren: () => import('./features/notifications/notifications.module')
            .then(m => m.NotificationsModule)
        },
        {
          path: 'audittrails',
          loadChildren: () => import('./features/audittrails/audittrails.module')
            .then(m => m.AudittrailsModule)
        },
        {
          path: 'settings',
          loadChildren: () => import('./features/settings/settings.module')
            .then(m => m.SettingsModule)
        },
        {
          path: 'logout',
          loadChildren: () => import('./features/logout/logout.module')
            .then(m => m.LogoutModule)
        }
      ]
    },
  
    // Wildcard route for 404
    { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
