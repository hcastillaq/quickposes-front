import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'favorites',
		loadChildren: () =>
			import('./modules/favorites/favorites.module').then(
				(m) => m.FavoritesModule
			),
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'session',
		loadChildren: () =>
			import('./modules/session/session.module').then((m) => m.SessionModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
