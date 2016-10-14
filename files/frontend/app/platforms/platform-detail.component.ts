import { Component, Input } from '@angular/core';
import { Platform } from './platform';

@Component({
  selector: '[PlatformDetail]',
  templateUrl: 'templates/platform-detail.component.html'
})
export class PlatformDetailComponent {
  @Input() platform: Platform;
}
