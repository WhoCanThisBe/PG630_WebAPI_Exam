import {
  fetchJson,
  HttpExceptionCode,
  postJSON,
  post,
} from "../../../src/client/lib/http";

let postData;
beforeEach(() => {
  postData = "";
  global.fetch = jest.fn((input, options) => {
    postData = options?.body;
    return Promise.resolve({
      status: 201,
      ok: true,
      json: () => Promise.resolve({ test: "test" }),
    });
  });
});

test("post but return only status", async () => {
  const test = { test: "test" };
  await post("/", test);
  expect(JSON.parse(postData)).toEqual(test);
});

test("should post", async () => {
  const first = { test: "test" };
  await postJSON("/", first);
  expect(JSON.parse(postData)).toEqual(first);
});

test("trowing a post HttpException", async () => {
  global.fetch.mockResolvedValue({ status: 404, ok: false });

  const data = { test: "test" };

  try {
    await postJSON("/", data);
  } catch (err) {
    expect(err).toBeInstanceOf(HttpExceptionCode);
  }
});

test("should fetch", async () => {
  const res = await fetchJson("/");
  expect(res).toEqual({ test: "test" });
});

test("get - should throw HttpException", async () => {
  global.fetch.mockResolvedValue({
    status: 400,
    ok: false,
  });

  try {
    await fetchJson("/");
  } catch (err) {
    expect(err).toBeInstanceOf(HttpExceptionCode);
  }
});
