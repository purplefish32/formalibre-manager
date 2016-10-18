import { Component, OnInit } from '@angular/core';
import { PlatformDetailComponent } from './platform-detail.component'
import { Platform } from './platform'
import { PlatformsService } from './platforms.service'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'platforms',
  templateUrl: 'templates/platforms.component.html',
  providers: [PlatformDetailComponent, PlatformsService]
})
export class PlatformsComponent implements OnInit {
  platforms: Platform[];

  ngOnInit(): void {
    this.getPlatforms();
  }

  constructor(
    private platformsService: PlatformsService
  ) { }

  getPlatforms(): void {
    console.log('fetching platforms');
    this.platformsService.getPlatforms().toPromise().then(
      platforms => {
        this.platforms = platforms;
        console.dir(this.platforms);
      }
    );
  }
}
