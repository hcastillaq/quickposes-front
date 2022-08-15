import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class JwtService {
	key = 'quickposes-token';
	constructor() {}

	save(token: string) {
		localStorage.setItem(this.key, token);
	}

	get(): string | null {
		return localStorage.getItem(this.key);
	}
}
