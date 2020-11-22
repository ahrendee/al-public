import { Component, OnInit } from '@angular/core';
import { ImageType, NewsItem } from './model/NewsItem';
import { CarouselService } from './services/carousel.service';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carouselImages: any[] = [];
  newsItems: NewsItem[] = [];

  constructor(private carouselService: CarouselService,
              private newsService: NewsService) {
    this.carouselService.getImages().subscribe((data: any[]) => {
      this.carouselImages = data;
    });

    // this.newsService.getNewsItems().subscribe((data: any) => {
    //   this.newsItems = data.items.map((item: any) => {
    //     const newsItem = new NewsItem(item);
    //     this.addTargetToHrefs(newsItem);
    //     return newsItem;
    //   });
    // });
  }

  public get FACEBOOK() {
    return ImageType.FACEBOOK
  }

  ngOnInit() {
  }

  private addTargetToHrefs(newsItem: NewsItem) {
    newsItem.content = newsItem.content
      .replace('<a ', '<a target="_blank"');
  }
}
