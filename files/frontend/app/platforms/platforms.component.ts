import { Component, OnInit } from '@angular/core';
import { PlatformDetailComponent } from './platform-detail.component'
import { Platform } from './platform'
import { PlatformsService } from './platforms.service'
import {DataTableModule, SharedModule} from 'primeng/primeng';

@Component({
  selector: 'platforms',
  templateUrl: 'templates/platforms.component.html',
  providers: [PlatformDetailComponent, DataTableModule]
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
    this.platformsService.getPlatforms().subscribe(
      platforms => {
        this.platforms = platforms;
        console.dir(this.platforms);
      }
    );
  }
}
