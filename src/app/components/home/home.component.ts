import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImagesService } from 'src/app/services/images/images.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { OauthService } from 'src/app/services/oauth/oauth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	files: File[] = [];
	url = undefined;
	isLogged = this.jwtService.get() || false;
	loading: boolean = false;
	constructor(
		private imagesService: ImagesService,
		private router: Router,
		private jwtService: JwtService,
		private google: OauthService,
		private auth: AuthService
	) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.getToken();
	}

	getToken() {
		if (!this.isLogged) {
			this.google.token().then((token) => {
				if (token) {
					const user: User = {
						email: token.email,
						password: token.aud,
						aud: token.aud,
					};
					this.loading = true;

					this.auth
						.auth(user)
						.pipe(delay(500))
						.subscribe({
							next: (resp: any) => {
								this.loading = false;
								this.isLogged = true;
								this.jwtService.save(resp.result);
							},
							error: (err) => {
								this.loading = false;
								this.isLogged = false;
								this.jwtService.clear();
							},
						});
				}
			});
		}
	}

	login() {
		this.google.login();
	}

	logout() {
		this.google.logout();
		this.isLogged = false;
		this.jwtService.clear();
	}

	async changeFolder(event: Event) {
		this.files = [];
		const el = event.currentTarget as HTMLInputElement;
		const fileList = el.files;
		if (fileList?.length) {
			const tempFiles: File[] = [];
			for (let i = 0; i < fileList.length; i++) {
				if (this.imagesService.validateTypeFile(fileList[i])) {
					tempFiles.push(fileList[i]);
				}
			}
			await this.imagesService.setImages(this.shuffle(tempFiles));
			this.files = [...tempFiles];
		}
	}

	shuffle(array: any[]): Array<any> {
		let currentIndex = array.length,
			randomIndex;
		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}
		return array;
	}

	continue(): void {
		this.router.navigateByUrl('/session');
	}
}
