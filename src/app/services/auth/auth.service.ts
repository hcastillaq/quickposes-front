import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './../../models/user.model';
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	env = environment.api;
	constructor(private http: HttpClient) {}

	auth(user: User) {
		return this.http.post(this.env + '/auth', user);
	}

	login(email: string, password: string) {
		return this.http.post(this.env + '/auth/login', {
			email,
			password,
		});
	}

	register(email: string, password: string) {
		return this.http.post(this.env + '/auth/register', {
			email,
			password,
		});
	}
}
