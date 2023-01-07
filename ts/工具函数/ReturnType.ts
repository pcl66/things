{
  function foo(x: number): Array<number> {
    return [x];
  }
  type A = () => number[]
  // 函数类型的返回值类型
  type fn = ReturnType<A>;
}