// src/tests/awards.test.ts
import request from "supertest";
import { app } from "../app";

describe("GET /awards-interval", () => {
  it("should return the producers with the longest and shortest interval between wins", async () => {
    const response = await request(app).get("/awards-interval");

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("min");
    expect(response.body).toHaveProperty("max");

    expect(response.body.min).toEqual([
      {
        producer: "Joel Silver",
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      },
    ]);

    expect(response.body.max).toEqual([
      {
        producer: "Matthew Vaughn",
        interval: 13,
        previousWin: 2002,
        followingWin: 2015,
      },
    ]);
  });
});