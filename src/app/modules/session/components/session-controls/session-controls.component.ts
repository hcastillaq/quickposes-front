import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
	selector: 'app-session-controls',
	templateUrl: './session-controls.component.html',
	styleUrls: ['./session-controls.component.scss'],
})
export class SessionControlsComponent implements OnInit, OnDestroy {
	validBack = true;
	validNext = true;
	values = new FormControl(3, [
		Validators.required,
		Validators.min(3),
		Validators.max(8),
	]);
	favorite: 'add' | 'remove' = 'add';
	show = true;
	constructor(private imagesService: ImagesService) {}

	ngOnInit(): void {
		this.validate();
		this.imagesService.change.subscribe((image) => {
			if (this.imagesService.validateFavorite()) {
				this.favorite = 'add';
			} else {
				this.favorite = 'remove';
			}
		});
		this.getImage();
	}
	ngOnDestroy(): void {}

	getImage() {
		this.imagesService.getCurrentImage().then(() => {
			if (this.imagesService.validateFavorite()) {
				this.favorite = 'add';
			} else {
				this.favorite = 'remove';
			}
		});
	}

	validate() {
		this.validBack = this.imagesService.validGoToBack();
		this.validNext = this.imagesService.validGoToNext();
	}

	back(): void {
		this.imagesService.back();
		this.validate();
	}

	next(): void {
		this.imagesService.next();
		this.validate();
	}

	posterize() {
		this.imagesService.posterize(this.values.value);
	}

	normal() {
		this.imagesService.normal();
	}
	@HostListener('window:keyup', ['$event'])
	switchByKey(e: KeyboardEvent) {
		switch (e.key.toLowerCase()) {
			case 'arrowright':
				this.next();
				break;
			case 'arrowleft':
				this.back();
				break;
			case 'p':
				this.posterize();
				break;
			case 'n':
				this.normal();
				break;
			case 'o':
				this.hide();
				break;
			default:
				break;
		}
	}

	toggleFavorite() {
		this.imagesService.toggleFavorite().then((action) => {
			this.favorite = action;
		});
	}

	getFavoriteIcon() {
		return this.favorite === 'add' ? 'favorite' : 'favorite_border';
	}

	hide() {
		this.show = !this.show;
	}
}
