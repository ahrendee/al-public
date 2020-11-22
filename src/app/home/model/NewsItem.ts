export enum ImageType {
  IMAGE,
  FACEBOOK
}

export class NewsItem {
  published: string;
  updated: string;
  url: string;
  title: string;
  content: string;
  labels: [];
  imageUrl: string;
  imageType: ImageType;

  constructor(item: any) {
    this.published = item.published;
    this.updated = item.updated;
    this.url = item.url;
    this.title = item.title;
    this.content = item.content;
    this.labels = item.labels;
    this.imageUrl = item.labels && item.labels[0] ? item.labels[0] : undefined;
    this.imageType = this.determineImageType(this.imageUrl);
  }

  private determineImageType(imageUrl: string): ImageType {
    if (imageUrl.indexOf('facebook.com') !== -1) {
      return ImageType.FACEBOOK;
    }
    return ImageType.IMAGE;
  }

}
