import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }            from '@angular/router';
import { PlatformsService } from './platforms.service';
import { Platform } from './platform'
import { PopoverModule } from "ng2-popover"

@Component({
  selector: 'PlatformEdit',
  templateUrl: 'templates/platform-edit.component.html'
})

export class PlatformEditComponent implements OnInit {
  platform: Platform = new Platform();

  constructor(
    private platforms: PlatformsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.platform = new Platform();
    console.dir(this.platform);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id)
        this.platforms.getPlatform(id).subscribe(platform => this.platform = platform);
    });
  }

  onSubmit() {
    if (this.platform.id) {
      this.platforms.update(this.platform).subscribe(platform => this.router.navigate(['platforms']), () => this.router.navigate(['platforms']));
    } else {
      this.platforms.create(this.platform).subscribe(platform => this.router.navigate(['platforms']), () => this.router.navigate(['platforms']));
    }
  }

  onDelete() {
    if (this.platform.id != '') {
      this.platforms.delete(this.platform.id).subscribe(platform => this.router.navigate(['platforms']), () => this.router.navigate(['platforms']));
    }
  }

  // TODO: Remove this when we're done
  get_diagnostic() {
    return JSON.stringify(this.platform);
  }

}
