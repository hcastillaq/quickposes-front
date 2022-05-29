import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';

import { AppModule } from './app/app.module';
import { firebaseConfig } from './config/firebase';
import { environment } from './environments/environment';

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
