import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../jwt/jwt.service';

export interface IImage {
	posterize: string | undefined;
	baseUrl: string;
}

@Injectable({
	providedIn: 'root',
})
export class ImagesService {
	images: (File | IImage)[] = [];
	index: number = 0;
	image: IImage | undefined = undefined;
	change = new Subject<IImage>();
	loading = new BehaviorSubject(true);
	favorites: IImage[] = [];

	constructor(private http: HttpClient, private jwtService: JwtService) {}

	validateTypeFile(file: File): boolean {
		const types = ['jpg', 'png', 'jpeg'];
		let valid = false;
		for (let i = 0; i < types.length; i++) {
			if (file.type.includes(types[i])) {
				valid = true;
				break;
			}
		}
		return valid;
	}

	toBase64(file: File): Promise<any> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	setImages(images: (File | IImage)[]) {
		this.images = [...images];
		this.setIndex();
	}

	setIndex(index: number = 0) {
		this.index = index;
	}

	existsImages(): boolean {
		return this.images.length ? true : false;
	}

	async getCurrentImage(): Promise<IImage> {
		this.loading.next(true);
		return new Promise(async (resolve) => {
			const img = this.images[this.index];
			if (img && img instanceof File) {
				const url = await this.toBase64(img);
				const imgOb: IImage = {
					posterize: undefined,
					baseUrl: url,
				};
				this.image = imgOb;
				this.loading.next(false);
				resolve(imgOb);
			} else {
				if (img) {
					resolve(img);
					this.image = img;
					this.loading.next(false);
				} else {
					throw new Error('image is undefined, please set image array');
				}
			}
		});
	}

	async back() {
		if (this.validGoToBack()) {
			this.index -= 1;
			const image: IImage = await this.getCurrentImage();
			this.change.next(image);
		}
	}

	async next() {
		if (this.validGoToNext()) {
			this.index += 1;
			const image: IImage = await this.getCurrentImage();
			this.change.next(image);
		}
	}

	validGoToBack(): boolean {
		return this.index > 0;
	}
	validGoToNext(): boolean {
		return this.index < this.images.length - 1;
	}

	posterize(levels: number = 3) {
		this.loading.next(true);
		this.http
			.post(environment.api + '/images/posterize', {
				url: this.image?.baseUrl,
				levels: levels,
				token: this.jwtService.get() || undefined,
			})
			.subscribe({
				next: (resp: any) => {
					if (this.image) {
						this.image.posterize = resp.base64 as string;
						this.change.next(this.image);
						this.loading.next(false);
					}
				},
				error: (err) => {
					this.loading.next(false);
				},
			});
	}

	normal() {
		if (this.image) {
			this.image.posterize = undefined;
			this.change.next(this.image);
		}
	}

	toggleFavorite(image: IImage): Promise<boolean> {
		return new Promise((resolve) => {
			this.http
				.post(environment.api + '/images/favorites/toggle', {
					baseUrl: image.baseUrl,
					token: this.jwtService.get() || undefined,
				})
				.subscribe({
					next: (resp: any) => {
						if (resp.action === true) {
							this.favorites.push(image);
						} else {
							this.favorites = this.favorites.filter(
								(favorite) => favorite.baseUrl !== image.baseUrl
							);
						}
						resolve(resp.action);
					},
				});
		});
	}

	getFavorites(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http
				.post(environment.api + '/images/favorites', {
					token: this.jwtService.get() || undefined,
				})
				.pipe(
					catchError((e) => {
						reject(e);
						return [];
					})
				)
				.subscribe({
					next: (resp: any) => {
						const favorites = resp.map((fav: string) => ({
							baseUrl: fav,
							posterize: undefined,
						}));
						this.favorites = [...favorites];
						resolve(favorites);
					},
				});
		});
	}

	validateFavorite(): boolean {
		const find = this.favorites.find(
			(favorite) => favorite.baseUrl === this.image?.baseUrl
		);
		return find ? true : false;
	}
}
