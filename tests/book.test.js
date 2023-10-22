const app = require("../server");
const request = require("supertest");
function generateRandom10DigitNumber() {
  const min = 1000000000;
  const max = 9999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
describe("createBook", function () {
  it("should return a 200 OK response for a valid book creation", async function () {
    const response = await request(app).post("/book/add-book").send({
      title: "Test Book",
      author: "Test Author",
      isbn: generateRandom10DigitNumber(),
      quantity: 10,
      shelf_location: "A1",
    });

    expect(response.status).toBe(200);
  });
});
