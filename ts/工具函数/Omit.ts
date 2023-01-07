interface Person {
  name: string;
  age: number;
  address: string;
}

// 从 T 中移除 K 属性
type P = Omit<Person, 'name' | 'address'>;