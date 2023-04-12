import { expect } from "chai";
import supertest from "supertest";

let request;

describe("Ecommerce API test", () => {

    before(() => {request = supertest("http://localhost:3000")});

    describe("GET to /products", () => {
        it("should return a 200 code", async () => {
            const response = await request.get("/products")
            expect(response.status).to.eql(200);
        })
    });

    describe("POST to /products", () => {
        const testProd = {
            name: "test",
            price: 200,
            stock: 9,
            img: 'test.jpg'
        };
        it("should return a 200 code", async () => {
            const response = await request.post("/products").send(testProd);
            expect(response.status).to.eql(200);
        });
    })

});