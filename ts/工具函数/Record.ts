{
  type Person = {
    name: string
    age: number
    address: string
  }
  
  type NewPerson = Record<keyof Person, string>

  // 定义对象时 属性是动态的
  const p: Record<string, number> = {
    math: 123,
    english: 456
  }
}