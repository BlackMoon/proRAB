export default class Engine {
  public run<T>(body: string): T {
    const f = new Function(body);
    return f();
  }
}
