import { Component, OnInit } from '@angular/core';
import { PlatformDetailComponent } from './platform-detail.component'
import { Platform } from './platform'
import { PlatformsService } from './platforms.service'
import {DataTableModule, SharedModule} from 'primeng/primeng';

declare let moment

@Component({
  selector: 'platforms',
  templateUrl: 'templates/platforms.component.html',
  providers: [PlatformDetailComponent, DataTableModule],
})
export class PlatformsComponent implements OnInit {
  platforms: Platform[];

  ngOnInit(): void {
    this.getPlatforms();
  }

  date(d) {
    return moment(d).format("D/M/YYYY")
  }

  constructor(
    private platformsService: PlatformsService
  ) { }

  getPlatforms(): void {
    console.log('fetching platforms');
    this.platformsService.all().subscribe(
      platforms => {
        this.platforms = platforms;
        console.dir(this.platforms);
      }
    );
  }
}
