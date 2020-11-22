export class SelectedArticle {
  id: string;
  label: string;
  items: number;
  size: string;
  package: string;
  type: string;
  itemPrice: number;
  basketLinePrice: number;

  constructor(item: any, nrOfItems: string, shirtSize?: string) {
    this.id = item.id + (item.type === 'tshirt' ? shirtSize : '');
    this.label = item.label;
    this.type = item.type;
    this.items = parseInt(nrOfItems);
    this.size = item.type === 'tshirt' ? shirtSize : '';
    this.itemPrice = parseFloat(item.itemPrice);
    this.package = item.package;
    this.basketLinePrice = parseInt(nrOfItems) * parseFloat(item.itemPrice);
  }
}
