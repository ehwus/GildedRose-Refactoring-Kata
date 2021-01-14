const Item = require("../src/gilded_rose.js").Item;


describe("Item", () => {
    it("Initializes correctly", () => {
        let test = new Item("foo", 10, 10);
        expect(test.name).toEqual("foo");
        expect(test.sellIn).toEqual(10);
        expect(test.quality).toEqual(10);
    });
});