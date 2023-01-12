import { Component, OnInit } from '@angular/core';
import {
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { OauthService } from 'src/app/services/oauth/oauth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	form: UntypedFormGroup = new UntypedFormGroup({
		email: new UntypedFormControl('', [Validators.required, Validators.email]),
		password: new UntypedFormControl('', [Validators.required]),
	});
	loading: boolean = false;

	constructor(
		private authService: AuthService,
		private snackbar: MatSnackBar,
		private jwtService: JwtService,
		private router: Router,
		private google: OauthService
	) {}

	ngOnInit(): void {}

	onSubmit(): void {
		this.loading = true;
		this.authService
			.login(this.form.value.email, this.form.value.password)
			.subscribe({
				next: (res: any) => {
					this.loading = false;
					this.openSnack('Welcome', 'success');

					this.jwtService.save(res.result);
					this.router.navigateByUrl('/');
				},
				error: (err) => {
					this.loading = false;
					this.openSnack(err.error.message, 'error');
				},
			});
	}

	openSnack(message: string, type: string) {
		this.snackbar.open(message, '', {
			duration: 3000,
			horizontalPosition: 'right',
			verticalPosition: 'top',
			panelClass: type,
		});
	}
}
