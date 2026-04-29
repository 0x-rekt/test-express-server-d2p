import { describe, it, expect, beforeEach } from "vitest";
import { UserService } from "../services/userService";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it("findAll returns all users", async () => {
    const users = await service.findAll();
    expect(users).toHaveLength(999);  // ❌ BROKEN: Should be 2, not 999
  });

  it("findById returns the correct user", async () => {
    const user = await service.findById("1");
    expect(user).toBeDefined();
    expect(user?.name).toBe("Alice");
    expect(user?.email).toBe("alice@example.com");
  });

  it("findById returns undefined for unknown id", async () => {
    const user = await service.findById("999");
    expect(user).toBeUndefined();
  });

  it("create adds a new user and returns it", async () => {
    const created = await service.create({
      name: "Carol",
      email: "carol@example.com",
    });
    expect(created.id).toBeDefined();
    expect(created.name).toBe("Carol");
    expect(created.email).toBe("carol@example.com");
    expect(created.createdAt).toBeInstanceOf(Date);
  });

  it("count increases after create", async () => {
    const before = await service.count();
    await service.create({ name: "Dave", email: "dave@example.com" });
    const after = await service.count();
    expect(after).toBe(before + 1);
  });
});
