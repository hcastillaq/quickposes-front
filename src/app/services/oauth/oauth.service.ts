import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig = {
	issuer: 'https://accounts.google.com',
	redirectUri: window.location.origin,
	strictDiscoveryDocumentValidation: false,
	clientId:
		'97243242599-bj4tf6fdrgujvp92j8lo7hrpjbo3ao15.apps.googleusercontent.com',
	scope: 'openid profile email',
};

@Injectable({
	providedIn: 'root',
})
export class OauthService {
	constructor(private readonly service: OAuthService) {
		this.service.configure(oAuthConfig);
	}

	login() {
		this.service.loadDiscoveryDocumentAndTryLogin().then(() => {
			this.service.initImplicitFlow();
		});
	}

	logout() {
		this.service.logOut();
	}

	token(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.service.loadDiscoveryDocumentAndTryLogin().then(() => {
				if (this.service.hasValidAccessToken()) {
					this.service.loadUserProfile().then((user: any) => {
						resolve(user.info);
					});
				} else {
					resolve(null);
				}
			});
		});
	}
}
