import * as fs from "fs"

export abstract class fl_jobs {
  constructor() { }
  abstract run()
}

export interface IHtmlJob {
  file: string
  html: string
  desc: string
}

export class HtmlJobs extends fl_jobs {
  jobs: IHtmlJob[] = []
  constructor() { super() }
  run() {
    this.jobs.forEach(job => fs.writeFile(
      job.file,
      job.html,
      err => {
        if (err)
          console.error("FAIL " + job.desc, err)
        else
          console.info("Ok " + job.desc)
      })
    )
  }
}
