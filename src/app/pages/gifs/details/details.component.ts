import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GifsService } from 'src/core/apis/gifs.service';
import { GifDetailsDataDTO } from 'src/core/dtos/dto';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  public gif: GifDetailsDataDTO = {} as GifDetailsDataDTO;
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private gifsService: GifsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getGifDetails(id);
    }
  }

  getGifDetails(id: string) {
    this.gifsService.getGifById(id).subscribe((response) => {
      this.gif = response.data;
      console.log(response);
      this.loading = false;
    });
  }

  downloadGif() {
    if (!this.gif?.images?.original?.url) return;
    fetch(this.gif.images.original.url)
      .then(res => res.blob())
      .then(blob => {
        const link = Object.assign(document.createElement('a'), {
          href: URL.createObjectURL(blob),
          download: `${this.gif.title || 'gif'}.gif`,
        });
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch(console.error);
  }

  copyLink() {
    if (this.gif?.images?.original?.url) {
      navigator.clipboard.writeText(this.gif.images.original.url).then(() => {
        alert('Посилання скопійоване!');
      }).catch(err => console.error('Помилка копіювання:', err));
    }
  }
}
