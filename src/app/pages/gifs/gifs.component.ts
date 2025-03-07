import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { GifsService } from 'src/core/apis/gifs.service';
import { GiphyDataDTO } from 'src/core/dtos/dto';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
})
@UntilDestroy()
export class GifsComponent implements OnInit {
  public gifs: GiphyDataDTO[] = [];
  public columns: GiphyDataDTO[][] = [[], [], [], []];
  public loading: boolean = false;
  public searchControl = new FormControl('');

  private limit: number = 30;
  private offset: number = 0;

  constructor(private gifsService: GifsService) {}

  ngOnInit() {
    this.loadTrendingGifs();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.searchGifs(query ?? '')),
        untilDestroyed(this)
      )
      .subscribe((response) => {
        this.gifs = response.data;
        this.distributeGifs();
      });
  }

  searchGifs(query: string) {
    if (!query.trim()) {
      return this.gifsService.getTrendingGifs(this.limit, this.offset);
    }
    return this.gifsService.searchGifs(query, this.limit, this.offset);
  }

  loadTrendingGifs() {
    this.loading = true;
    this.gifsService
      .getTrendingGifs(this.limit, this.offset)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        this.gifs.push(...response.data);
        this.distributeGifs();
        this.loading = false;
      });
  }
  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.remove('hidden');
    img.classList.add('loaded');
  }

  distributeGifs() {
    this.columns = [[], [], [], []];
    this.gifs.forEach((gif, index) => {
      this.columns[index % 4].push(gif);
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      this.offset += this.limit;
      this.loadTrendingGifs();
    }
  }
}
