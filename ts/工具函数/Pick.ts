{
  type Person = {
    name: string
    age: number
    address: string
  }
  // 从 T 中选取 K 属性
  type P = Pick<Person, 'name' | 'age'>
}