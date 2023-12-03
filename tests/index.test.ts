import xen from "../src/index";

describe("new Xencode()", () => {
  test("encode()", () => {
    expect(xen.encode("usage", "cl-1")).toBe("trzfd");
    expect(xen.encode("usage", "cr-1")).toBe("vtbhf");

    expect(xen.encode("usage", "pl-1")).toBe("uesga");
    expect(xen.encode("usage", "pr-1")).toBe("eugsa");

    expect(xen.encode("usage", "tl-2")).toBe("gsuae");
    expect(xen.encode("usage", "tr-2")).toBe("uaesg");
  });

  test("caesar():", () => {
    expect(xen.caesar("usage", true, 1)).toBe("trzfd");
    expect(xen.caesar("usage", false, 1)).toBe("vtbhf");
  });

  test("pendulum()", () => {
    expect(xen.pendulum("usage", true, 1)).toBe("uesga");
    expect(xen.pendulum("usage", false, 1)).toBe("eugsa");
  });

  test("thinout()", () => {
    expect(xen.thinout("usage", true, 2)).toBe("gsuae");
    expect(xen.thinout("usage", false, 2)).toBe("uaesg");
  });
});
