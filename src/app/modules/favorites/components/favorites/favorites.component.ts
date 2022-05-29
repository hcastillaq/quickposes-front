import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IImage, ImagesService } from 'src/app/services/images/images.service';

@Component({
	selector: 'app-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
	favorites: IImage[] = [];
	loading: boolean = false;
	constructor(private imageService: ImagesService, private router: Router) {}

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
			});
	}

	remove(favorite: IImage) {
		this.favorites = this.favorites.filter((fav) => fav.path !== favorite.path);
		this.imageService.toggleFavorite(favorite);
	}

	open(favorite: IImage) {
		this.imageService.setImages([favorite]);
		this.router.navigateByUrl('/session');
	}
}
