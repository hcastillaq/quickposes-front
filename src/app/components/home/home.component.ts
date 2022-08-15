import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images/images.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	files: File[] = [];
	url = undefined;
	isLogged = this.jwtService.get() || false;

	constructor(
		private imagesService: ImagesService,
		private router: Router,
		private jwtService: JwtService
	) {}
	ngOnInit(): void {}

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
