import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IImage, ImagesService } from 'src/app/services/images/images.service';

@Component({
	selector: 'app-session',
	templateUrl: './session.component.html',
	styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
	image: undefined | IImage = undefined;
	loading = this.imagesService.loading;

	constructor(private imagesService: ImagesService, private router: Router) {}
	ngOnInit(): void {
		if (this.imagesService.existsImages()) {
			this.getImage();
			this.imagesService.change.subscribe((image: IImage) => {
				this.image = image;
			});
		} else {
			this.router.navigateByUrl('/');
		}
	}

	getImage() {
		this.imagesService.getCurrentImage().then((image: IImage) => {
			this.image = image;
		});
	}
}
