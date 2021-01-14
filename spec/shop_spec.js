const Shop = require("../src/shop");

let fakeNormalItem = {
  name: "foo",
  sellIn: 10,
  quality: 10,
};

describe("Shop", () => {
  beforeEach(() => {
    normalItem = {
      name: "foo",
      sellIn: 10,
      quality: 10,
    };

    normalItemPastSellby = {
      name: "foo",
      sellIn: 0,
      quality: 10,
    };

    zeroQualityItem = {
      name: "foo",
      sellIn: 5,
      quality: 0,
    };

    freshBrie = {
      name: "Aged Brie",
      sellIn: 10,
      quality: 10,
    };

    matureBrie = {
      name: "Aged Brie",
      sellIn: 0,
      quality: 50,
    };

    legendaryItem = {
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: 10,
      quality: 80,
    };

    normalItemShop = new Shop([normalItem]);
  });

  it("correctly add items to the inventory", () => {
    expect(normalItemShop.items[0].name).toEqual("foo");
    expect(normalItemShop.items[0].sellIn).toEqual(10);
    expect(normalItemShop.items[0].quality).toEqual(10);
  });

  describe("updateQuality()", () => {
    it("Should reduce a positive quality and sellIn on an in date 'normal' item by 1", () => {
      let items = normalItemShop.updateQuality();
      expect(items[0].quality).toEqual(9);
      expect(items[0].sellIn).toEqual(9);
    });

    it("Cannot reduce quality below 0", () => {
      let gildedRose = new Shop([zeroQualityItem]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("Degrades item quality twice as fast after sell by has passed, sellIn still reducing", () => {
      let gildedRose = new Shop([normalItemPastSellby]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
      expect(items[0].sellIn).toEqual(-1);
    });

    it("Increases the quality of brie as it gets older", () => {
      let gildedRose = new Shop([freshBrie]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(11);
    });

    it("Doesn't degrade the time to sell or quality of legendary items", () => {
      let gildedRose = new Shop([legendaryItem]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(80);
      expect(items[0].sellIn).toEqual(10);
    });

    it("cannot increase the quality above 50", () => {
      let gildedRose = new Shop([matureBrie]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("Reduces the quality of a backstage pass to 0 after sellby", () => {
      let ticket = {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 30,
        sellIn: 0,
      };
      let gildedRose = new Shop([ticket]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("increases quality by 2 when there are 10 days or less on sellIn", () => {
      let ticket = {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 30,
        sellIn: 10,
      };
      let gildedRose = new Shop([ticket]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(32);
    });

    it("increases quality by 3 when there are 5 days or less on sellIn", () => {
      let ticket = {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 30,
        sellIn: 5,
      };
      let gildedRose = new Shop([ticket]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(33);
    });
  });
});
