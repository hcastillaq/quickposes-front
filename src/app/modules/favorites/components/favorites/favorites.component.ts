import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { IImage, ImagesService } from 'src/app/services/images/images.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
	selector: 'app-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
	favorites: IImage[] = [];
	loading: boolean = false;
	constructor(
		private imageService: ImagesService,
		private router: Router,
		private jwtService: JwtService,
		private snackbar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.loading = true;
		this.imageService
			.getFavorites()
			.then((favorites) => {
				this.favorites = favorites;
				this.loading = false;
			})
			.catch((e) => {
				this.loading = false;
				console.error(e);
				this.jwtService.clear();
				this.openSnack('Session expired', 'error');
				this.router.navigateByUrl('/');
			});
	}

	remove(favorite: IImage) {
		this.imageService
			.toggleFavorite(favorite)
			.then(() => {
				this.favorites = this.favorites.filter(
					(fav) => fav.baseUrl !== favorite.baseUrl
				);
			})
			.catch((e) => {
				this.openSnack('Session expirada, por favor inicie session.', 'error');
			});
	}

	open(favorite: IImage) {
		this.imageService.setImages([favorite]);
		this.router.navigateByUrl('/session');
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
