import { Component, OnInit } from '@angular/core';
import { IAlbum, Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-pixflix',
  templateUrl: './pixflix.component.html',
  styleUrls: ['./pixflix.component.scss']
})
export class PixflixComponent implements OnInit {

  readonly folders = [
    {
      date: '20190406',
      name: '20190406-sound-dog',
      title: '06-04-2019 - Live @ The Dog - Sound Dog - Breda, Netherlands',
      htmlTitle: '06-04-2019 - Live @ The Dog<br>Sound Dog<br>Breda, Netherlands',
      nrOfPics: 50,
      pics: []
    },
    {
      date: '20190525',
      name: '20190525-wmm',
      title: '25-05-2019 - Westland Metal Meeting 2019 - Monster, Netherlands',
      htmlTitle: '25-05-2019<br>Westland Metal Meeting<br>Monster, Netherlands',
      nrOfPics: 10,
      pics: []
    },
    {
      date: '20190630',
      name: '20190630-bel-air',
      title: '31-06-2019 - Bel Air - Breda, Netherlands',
      htmlTitle: '30-06-2019<br>Bel Air<br>Breda, Netherlands',
      nrOfPics: 50,
      pics: []
    },
    {
      date: '20200201',
      name: '20200201-crossroads',
      title: '01-02-2020 - Crossroads - Kaatsheuvel, Netherlands',
      htmlTitle: '01-02-2020<br>Crossroads<br>Kaatsheuvel, Netherlands',
      nrOfPics: 91,
      pics: []
    }
  ];

  public albumList = new Map();
  public pixState: string;

  constructor(private lightBox: Lightbox,
              private lightboxConfig: LightboxConfig) {

    this.setupLightBoxConfig();
    this.buildPhotoAlbums();
  }

  ngOnInit() {
  }

  setupLightBoxConfig() {
    this.lightboxConfig.fitImageInViewPort = true;
    this.lightboxConfig.centerVertically = true;
  }

  buildPhotoAlbums() {
    this.folders.forEach((folder: any) => {
      let pics: Array<IAlbum> = [];
      for (let i = 1; i <= folder.nrOfPics; i++) {
        const src = `assets/pix/${folder.name}/${i}.jpg`;
        // const caption = 'Image ' + i + ' caption here';
        const thumb = `assets/pix/${folder.name}/thumb - ${i}.jpg`;
        const pic = {
          src: src,
          thumb: thumb
        };
        // caption: caption,
        pics.push(pic);
      }
      folder.pics = pics;
      this.albumList.set(folder.date, folder);
    });
  }

  /**
   * Ppen lightbox modal
   * @param index the image index in the array
   * @param albumName name of the album we're showing
   */
  open(index: number, albumName: string): void {
    this.lightBox.open(this.albumList.get(albumName).pics, index);
  }

  /**
   * Close the lightbox modal
   */
  close(): void {
    this.lightBox.close();
  }
}
