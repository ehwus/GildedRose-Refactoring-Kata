const { Shop, Item } = require("../src/gilded_rose.js");

let fakeNormalItem = {
    name: "foo",
    sellIn: 10,
    quality: 10
}

describe("Shop", () => {
    beforeEach(() => {
        normalItem = {
            name: "foo",
            sellIn: 10,
            quality: 10
        }

        normalItemPastSellby = {
            name: "foo",
            sellIn: 0,
            quality: 10
        }

        zeroQualityItem = {
            name: "foo",
            sellIn: 5,
            quality: 0
        }

        freshBrie = {
            name: 'Aged Brie',
            sellIn: 10,
            quality: 10
        };

        legendaryItem = {
            name: "Sulfuras, Hand of Ragnaros",
            sellIn: 10,
            quality: 10
        }

        normalItemShop = new Shop([ normalItem ]);
    });

    it("correctly add items to the inventory", () => {
      expect(normalItemShop.items[0].name).toEqual("foo");
      expect(normalItemShop.items[0].sellIn).toEqual(10);
      expect(normalItemShop.items[0].quality).toEqual(10);
    });

    describe("updateQuality()", () => {
      it("Should reduce a positive quality on an in date 'normal' item by 1", () => {
        let items = normalItemShop.updateQuality();
        expect(items[0].quality).toEqual(9);
      });

      it("Cannot reduce quality below 0", () => {
        let gildedRose = new Shop([ zeroQualityItem ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
      });

      it("Degrades item quality twice as fast after sell by has passed", () => {
        let gildedRose = new Shop([ normalItemPastSellby ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(8);
      });

      it("Increases the quality of brie as it gets older", () => {
        let gildedRose = new Shop([ freshBrie ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(11);
      });

      it("Doesn't degrade the time to sell or quality of legendary items", () => {
        let gildedRose = new Shop([ legendaryItem ])
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(10);
        expect(items[0].sellIn).toEqual(10);
      });
    });
  });