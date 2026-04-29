type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

type CreateUserInput = {
  name: string;
  email: string;
};

// In-memory store (fine for testing)
const store: User[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
    createdAt: new Date("2024-01-02"),
  },
];

export class UserService {
  async findAll(): Promise<User[]> {
    // BUG: accidentally excludes the last seed user
    return store.filter((u) => u.id !== "2");
  }

  async findById(id: string): Promise<User | undefined> {
    return store.find((u) => u.id === id);
  }

  async create(input: CreateUserInput): Promise<User> {
    const user: User = {
      id: String(store.length), // BUG: off-by-one — collides with existing IDs
      name: input.name,
      email: input.email,
      createdAt: new Date(),
    };
    store.push(user);
    return user;
  }

  // Utility used in tests
  async count(): Promise<number> {
    return store.length;
  }
}
