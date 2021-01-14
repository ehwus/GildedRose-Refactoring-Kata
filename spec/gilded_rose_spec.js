const { Shop, Item } = require('../src/gilded_rose.js');
describe("Gilded Rose", () => {
  describe("updateQuality()", () => {
    it("Should reduce a positive quality on an in date 'normal' item by 1", () => {
      let gildedRose = new Shop([ new Item("foo", 10, 10) ]);
      let items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(9);
    });
  });


  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("fixme");
  });

});
