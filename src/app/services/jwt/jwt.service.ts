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

	get(): string | boolean {
		const token = localStorage.getItem(this.key);
		if (token) {
			const tokenDecode = this.decode(token);
			return this.validate(tokenDecode.exp) ? token : false;
		}
		return false;
	}

	clear() {
		localStorage.removeItem(this.key);
	}

	validate(exp: number) {
		if (Date.now() >= exp * 1000) {
			return false;
		}
		return true;
	}

	decode(token: string | null) {
		if (token) {
			const payload = token.split('.')[1];
			const payloadDecoded = atob(payload);
			return JSON.parse(payloadDecoded);
		}
		return null;
	}
}
