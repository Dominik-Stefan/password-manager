export class Card {
  id: string;
  name: string;
  cardholder_name: string;
  number: string;
  brand: string;
  expiration: string;
  cvv: string;
  constructor() {
    this.id = '';
    this.name = '';
    this.cardholder_name = '';
    this.number = '';
    this.brand = '';
    this.expiration = '';
    this.cvv = '';
  }
}
