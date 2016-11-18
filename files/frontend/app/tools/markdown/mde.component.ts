import { Component, ElementRef, ViewChild, Input, Output, AfterViewInit, EventEmitter} from '@angular/core';
import * as SimpleMDE from 'simplemde'

//declare var SimpleMDE : any;

@Component({
  selector: 'mdeditor',
  template: '<textarea #simplemde>{{text}}</textarea>',
  styles: [`_host{display:flex;} test{position:relative;}`]
})
export class MDEditor implements AfterViewInit {
  @ViewChild('simplemde') textarea: ElementRef;

  onChangeOnProgress = false

  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() set content(val) {
    if ((this.mde) && (!this.onChangeOnProgress)) {
      console.log('Setting Value')
      this.onChangeOnProgress = true
      this.mde.codemirror.setValue(val)
    }
    else {
      this.onChangeOnProgress = false
    }
  }

  @Input() preview = false;

  mde: any = null

  ngAfterViewInit() {
    this.mde = new SimpleMDE({
      element: this.textarea.nativeElement,
      placeholder: this.content,
      hideIcons: ["fullscreen", "side-by-side"],
      showIcons: ["code", "table"]
    });

    this.mde.codemirror.on('change', () => {
      if (!this.onChangeOnProgress) {
        this.onChangeOnProgress = true
        this.contentChange.emit(this.mde.value());
      } else {
        this.onChangeOnProgress = false
      }
    });

    if (this.preview)
      this.mde.togglePreview();
  }

  validate(c: FormControl) {
    return false
  }
}
