import { test, expect } from "@playwright/test";

test.describe("API @Challenge", () => {
  const URL = "https://apichallenges.herokuapp.com/";
  let token;

  //Test#1 - POST /challenger (get user_token))
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${URL}challenger`);
    const headers = response.headers();
    token = headers["x-challenger"];
    console.log(token);
  });

  test("Test#2 - GET /challenges", async ({ request }) => {
    let response = await request.get(`${URL}challenges`, {
      headers: {
        "x-challenger": token,
      },
    });
    const headers = response.headers();
    let body = await response.json();
    console.log(body);
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    console.log(token);
    expect(body.challenges.length).toBe(59);
  });
  test("Test#3 - GET/todos", async ({ request }) => {
    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
    });
    const headers = response.headers();
    let body = await response.json();
    console.log(body);
    expect(response.status()).toBe(200);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    console.log(token);
    expect(body.todos.length).toBe(10);
    expect(Array.isArray(body.todos)).toBeTruthy();
  });
  test("Test#4 - GET/todo (expect eror code 404)", async ({ request }) => {
    let response = await request.get(`${URL}todo`, {
      headers: {
        "x-challenger": token,
      },
    });
    const headers = response.headers();
    expect(response.status()).toBe(404);
    expect(headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    console.log(token);
  });
});
