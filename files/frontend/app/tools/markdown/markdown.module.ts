import { NgModule }      from '@angular/core';
import { MDEditor } from "./mde.component"
import {MarkdownToHtmlPipe} from 'markdown-to-html-pipe'
@NgModule({
  imports: [],
  declarations: [
    MDEditor,
    MarkdownToHtmlPipe
  ],
  exports: [
    MDEditor,
    MarkdownToHtmlPipe
  ],
  providers: [
  ],
})
export class MarkdownModule { }
