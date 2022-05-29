import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	files: File[] = [];
	url = undefined;
	constructor(private imagesService: ImagesService, private router: Router) {}
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

	shuffle(array: any[]) {
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
		this.imagesService.getFavorites();
		this.router.navigateByUrl('/session');
	}
}
