const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", () => {
  it("correctly add items to the inventory", () => {
    let gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    expect(gildedRose.items[0].name).toEqual("foo");
    expect(gildedRose.items[0].sellIn).toEqual(0);
    expect(gildedRose.items[0].quality).toEqual(0)
  });

  describe("updateQuality()", () => {
    it("Should reduce a positive quality on an in date 'normal' item by 1", () => {
      let gildedRose = new Shop([ new Item("foo", 10, 10) ]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(9);
    });

    it("Cannot reduce quality below 0", () => {
      let gildedRose = new Shop([ new Item("foo", 10, 0) ]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("Degrades item quality twice as fast after sell by has passed", () => {
      let gildedRose = new Shop([ new Item("foo", 0, 2) ]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });
});
