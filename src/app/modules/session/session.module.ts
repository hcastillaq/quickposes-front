import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { SessionComponent } from './components/session/session.component';
import { ImageSessionComponent } from './components/image-session/image-session.component';
import { SessionControlsComponent } from './components/session-controls/session-controls.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SessionLoadingComponent } from './components/session-loading/session-loading.component';
import { NgMagnizoomModule } from 'ng-magnizoom';

@NgModule({
	declarations: [
		SessionComponent,
		ImageSessionComponent,
		SessionControlsComponent,
		SessionLoadingComponent,
	],
	imports: [
		CommonModule,
		SessionRoutingModule,
		MaterialModule,
		HttpClientModule,
		NgMagnizoomModule,
	],
})
export class SessionModule {}
