import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { RouterModule } from '@angular/router';
const components: any = [
	FormsModule,
	ReactiveFormsModule,
	RouterModule,
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
	MatProgressSpinnerModule,
	MatSnackBarModule,
];

@NgModule({
	declarations: [],
	imports: [CommonModule, ...components],
	exports: [...components],
})
export class MaterialModule {}
