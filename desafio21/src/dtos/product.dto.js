export default class ProductDTO {
  constructor(data, currencies) {
    this.name = data.name;
    this.img = data.img;
    this.price = data.price;
    this.stock = data.stock
    this._id = data._id

    for (const [currency, value] of Object.entries(currencies)) {
      this[currency] = value;
    }
  }
}
