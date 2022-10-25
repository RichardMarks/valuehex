const api = require("./index");

// test encoding

test("should encode null and undefined to an empty string", () => {
  expect(api.encode(null)).toEqual("");
  expect(api.encode(undefined)).toEqual("");
});

test("should encode functions to an empty string", () => {
  expect(api.encode(() => {})).toEqual("");
});

test("should encode strings correctly", () => {
  expect(api.encode("Hello")).toEqual("A148656C6C6F");
});

test("should encode numbers correctly", () => {
  expect(api.encode(3.1415)).toEqual("A2332E31343135");
});

test("should encode booleans correctly", () => {
  expect(api.encode(true)).toEqual("A331");
  expect(api.encode(false)).toEqual("A330");
});

test("should encode objects correctly", () => {
  expect(api.encode({ key: "value" })).toEqual(
    "A47B226B6579223A2276616C7565227D"
  );
});

// test decoding

test("should decode strings correctly", () => {
  expect(api.decode(api.encode("Hello"))).toEqual("Hello");
});

test("should decode numbers correctly", () => {
  expect(api.decode(api.encode(3.1415))).toEqual(3.1415);
});

test("should decode booleans correctly", () => {
  expect(api.decode(api.encode(true))).toBeTruthy();
  expect(api.decode(api.encode(false))).toBeFalsy();
});

test("should decode objects correctly", () => {
  expect(api.decode(api.encode({ key: "value" }))).toEqual({
    key: "value",
  });
});

test("should decode invalid input to null", () => {
  expect(api.decode("X")).toBeNull();
  expect(api.decode("invalid")).toBeNull();
  expect(api.decode(100)).toBeNull();
  expect(api.decode(null)).toBeNull();
  expect(api.decode(undefined)).toBeNull();
  expect(api.decode({})).toBeNull();
  expect(api.decode([])).toBeNull();
  expect(api.decode(() => {})).toBeNull();
});
