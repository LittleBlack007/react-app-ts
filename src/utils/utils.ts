//====================函数重载====================
type Combinable = string | number;
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  // type Combinable = string | number;
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
add('234',234);

interface Per {
  readonly name: string;
  age?: number;
  [propName: string]: any
}

//====================类方法重载====================
class c {
  getC(){
    return 123
  }
}

class D extends c {
  getC():123;
  getC(x:number):string;
  getC(x?:number) {
    if(typeof x === 'number'){
      return x.toString();
    }
    return 123;
  }
}
const dd = new D();
dd.getC()

//====================泛型====================
function identity <T>(value: T): T{
  return value
}

identity(123)

interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity({length: 10, value: 3});

// ====================类装饰器====================
// eslint-disable-next-line @typescript-eslint/ban-types
function Greeter(target: Function): void {
  target.prototype.greet = function(): void{
    console.log("Hello Semlinker!");
  }
}

@Greeter
class Greeting {
}

const myGreeting = new Greeting();
(myGreeting as any).greet();

// ====================类装饰器(传参)====================
function Greeter2(greeting: string){
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function(target: Function){
    target.prototype.greet = function(): void{
      console.log(greeting);
    }
  }
}

@Greeter2('Hello')
class Greeting2 {
}
const myGreeting2 = new Greeting2();
(myGreeting2 as any).greet();

// ====================属性装饰器====================
// target: Object - 被装饰的类
// propertyKey: string | symbol - 被装饰类的属性名
function logProperty(target: any, key: string){
  delete target[key];

  const backingField = '_' + key;
  
  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true
  })

  const getter = function(this:any){
    const currVal  = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  }

  const setter = function(this:any, newVal: any){
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  }

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  })
}

class Person { 
  @logProperty  // 不要加分号
  public name: string;

  constructor(name : string) { 
    this.name = name;
  }
}

const p1 = new Person('ppp'); // Set: name => ppp
p1.name = 'pp';  // Set: name => pp

// ====================方法装饰器====================
// target: Object - 被装饰的类
// propertyKey: string | symbol - 方法名
// descriptor: TypePropertyDescript - 属性描述符
// declare type MethodDecorator = <T>(target: Object, prototype: string | symbol, descriptor: TypePropertDescript<T>) => TypePropertDescript<T> | void;
function log(target: object, prototypeKey: string, descriptor: PropertyDescriptor){
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]){
    console.log('wraapped function: before invoking');
    const result = originalMethod.apply(this, args);
    console.log('wrapped function: after invoking');
    return result;
  }
}
class Task {
  @log
  runTask(arg: any): any {
    console.log('runTask invoked, args:' + arg);
    return 'finished';
  }
}

const task = new Task();
const result = task.runTask('learn ts');
console.log('result: ' + result);
// 输出：
// wrapped function: before invoking runTask
// runtime.ts:178 runTask invoked, args: learn ts
// runtime.ts:178 wrapped function: after invoking runTask
// runtime.ts:178 result: finished


// ====================参数装饰器====================
// target: Object - 被装饰的类
// propertyKey: string | symbol - 方法名
// parameterIndex: number - 方法中参数的索引值
// eslint-disable-next-line @typescript-eslint/ban-types
function Log(target: Function, key: string, parameterIndex: number){
  const functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has been decorated`);
}

class ParamGreeter {
  getting: string;
  constructor(@Log phrase: string){
    this.getting = phrase;
  }
}
// 输出：The parameter in position 0 at Greeter has been decorated；

// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================
// ====================类====================

export default {}