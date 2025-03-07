import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GifsService } from 'src/core/apis/gifs.service';
import { GifDetailsDataDTO } from 'src/core/dtos/dto';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
@UntilDestroy()
export class DetailsComponent {
  public gif: GifDetailsDataDTO = {} as GifDetailsDataDTO;
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private gifsService: GifsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getGifDetails(id);
    }
  }

  getGifDetails(id: string) {
    this.gifsService
      .getGifById(id)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        this.gif = response.data;
        this.loading = false;
      });
  }
  downloadGif() {
    if (!this.gif?.images?.original?.url) return;
    this.http
      .get(this.gif.images.original.url, { responseType: 'blob' })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${this.gif.title || 'gif'}.gif`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        },
      });
  }

  copyLink() {
    if (this.gif?.images?.original?.url) {
      navigator.clipboard
        .writeText(this.gif.images.original.url)
        .then(() => {
          alert('Посилання скопійоване!');
        })
        .catch((err) => console.error('Помилка копіювання:', err));
    }
  }
}
