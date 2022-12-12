{
  interface A {
    eat: (food: string) => void
  }
  
  class Person implements A {
    eat = (food: string) => {
      console.log(food)
    }
  }
  
  const a = new Person()
  a.eat('hamburger')
  // console.log()
}