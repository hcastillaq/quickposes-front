import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	env = environment.api;
	constructor(private http: HttpClient) {}

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
