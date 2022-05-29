import { Component, Input, OnInit, ViewChild } from '@angular/core';
@Component({
	selector: 'app-image-session',
	templateUrl: './image-session.component.html',
	styleUrls: ['./image-session.component.scss'],
})
export class ImageSessionComponent implements OnInit {
	@ViewChild('img') img: HTMLImageElement | undefined = undefined;

	@Input('url') url: string | undefined;
	@Input('image') image: any;

	scale = 90;
	step = 20;
	style = 'height: 98%';
	constructor() {}
	ngOnInit(): void {}

	zoomIn() {
		this.scale += this.step;
		this.style = `height: ${this.scale}%  !important`;
	}
	zoomOut() {
		this.scale -= this.step;
		this.style = `height: ${this.scale}%  !important`;
	}
}
