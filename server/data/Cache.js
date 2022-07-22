class Cache {
  #map;
  constructor() {
    this.#map = new Map();
  }

  add(item, name, lifetime) {
    let o = {
      item: item,
      lifetime: lifetime,
      added: new Date(),
    };
    this.#map.set(name, o);
  }

  get(name) {
    let item = this.#map.get(name);

    if (!item) {
      return;
    }

    let now = new Date();

    let dur = Math.abs(now.getTime() - item.added.getTime());

    if (dur > item.lifetime) {
      this.#map.delete(name);
      return;
    }

    return item.item;
  }

  remove(name) {
    this.#map.delete(name);
  }
}

module.exports = { Cache };
