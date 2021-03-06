import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {
  title: string;

  constructor(
    private router: Router,
    private title2: Title,
    private meta: Meta
  ) {
    this.getDataRoute().subscribe((data) => {
      this.title = data.title;
      this.title2.setTitle(this.title);

      const metaTag: MetaDefinition = {
        name: 'Description',
        content: this.title,
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {}

  getDataRoute() {
    return this.router.events.pipe(
      filter((evento) => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
}
