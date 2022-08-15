import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
		password2: new FormControl('', [Validators.required]),
	});
	loading: boolean = false;

	constructor(
		private authService: AuthService,
		private snackbar: MatSnackBar,
		private jwtService: JwtService,
		private router: Router
	) {}

	onSubmit(): void {
		this.loading = true;
		this.authService
			.register(this.form.value.email, this.form.value.password)
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
	ngOnInit(): void {}
}
