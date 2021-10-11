# typescript  4.4.3    

<!-- TOC -->

- [typescript  4.4.3](#typescript--443)
  - [常见类型](#常见类型)
  - [narrowing](#narrowing)
  - [functions](#functions)
  - [对象类型](#对象类型)
  - [泛型](#泛型)
  - [template literal types](#template-literal-types)
  - [classes](#classes)
  - [modules](#modules)
  - [Utility Types](#utility-types)
  - [声明空间](#声明空间)
  - [模块](#模块)
  - [declaration](#declaration)
  - [枚举](#枚举)
  - [lib.d.ts](#libdts)

<!-- /TOC -->

两种构建类型系统的方法：Interface 和 Type。    

组合类型的方式也有两种：union 或者 generics。    

鸭式辩型的 shape 匹配执行的是对象的子集匹配。    

## 常见类型     

- string
- number
- boolean
- 数组 `number[]`, `Array<number>`
- any
- union
- null
- undefined
- bigint
- symbol
- never


可选属性、narrow、type 能给所有其他的类型起别名，而 interface 只能给对象类型起别名、type assertions、literal types。
as const、non-null assertion operator !、    

## narrowing

type guard:   

- typeof
- 真值判断
- 相等性判断
- in 运算符
- instanceof 运算符
- 赋值
- user-defined type guard, type predicate    

## functions   

```ts
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
    console.log(fn.description + ' returned ' + fn(6));
}
```     

在调用签名前面加个 new 就是构造函数签名：    

```ts
type SomeConstructor = {
    new (s: string): SomeObject;
}
```     

泛型：    

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}
```     

泛型类型限制（不确定是不是只有泛型能用，个人感觉应该不只有泛型能用）：   

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    }
    return b;
}
```     

要使用泛型，说明这个类型一定是两个值以上是这种类型。   

指定泛型类型参数：    

```ts
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

const arr = combine<string | number>([1,2,3], ["hello"]);
```    

函数重载：   

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}
```    

- void
- object
- unknown    

貌似这种定义的 void 函数，是可以有任意返回值的，但是返回值按 void 类型处理 `type voidFunc = () => void;`
但是函数声明式的就不行了：    

```ts
function f2(): void {
    return true;
}

const f3 = function (): void {
    return true;
}
```    

## 对象类型    

索引签名    

```ts
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
```  

扩展：    

```ts
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```   

并集 `type ColorfulCircle = Colorful & Circle`。    

## 泛型    

```ts
interface GenericIdentityFn {
    <Type>(arg: Type): Type;
}

interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}

class GenericNumber<NumType> {
    zeroValue: NumType,
    add: (x: NumType, y: NumType) => Number;
}
```     

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");
// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```   

- `keyof` 运算符接受一个对象类型做运算对象，然后计算出起键名的一个字符串或数字字面量的并集。
- `typeof` 运算符，除了可以正常的使用外，还可以在类型出现的地方使用，用来引用一个变量或属性的类型 `let s = "hello"; let n: typeof s;`   
- indexed access types：对类型使用索引
- 条件类型 `SomeType extends OtherType ? TrueType: FalseType`    

```ts
interface Animal {
    live(): void;
}

interface Dog {
    live(): void;
    swit(): void;
}

type Example = Dog extends Animal ? number : string;
// type Example = number;
```    

mapped types:    

```ts
type OptionFlags<Type> = {
    [Property in keyof Type]: boolean;
}
```     

key remapping via as:   

```ts
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
}

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters<Person>;
```    

这个老实说已经超出理解范围了。    

## template literal types   

```ts
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
```    

## classes    

It’s important to understand that an implements clause is only a check that the class can be treated as the interface type. It doesn’t change the type of the class or its methods at all.    

## modules

type, interface 可以使用常规的模块语法 import/export。    

然后新增了 `import type` 语法。`import type { Cat, Dog } from './animals.js';`    

推荐使用 es6 的模块语法写源代码，至于编译 option 的 module 的话，见仁见智了。    

两种 resolution 策略：classic 和 node。    

## Utility Types   

- `Partial<Type>`
- `Required<Type>`
- `Readonly<Type>`
- `Record<Keys, Type>`
- `Pick<Type, Keys>`
- `Omit<Type, Keys>`
- `Exclude<Type, ExcludedUnion>`
- `Extract<Type, Union>`
- `NonNullable<Type>`
- `Parameters<Type>`
- `ConstructorParameters<Type>`
- `ReturnType<Type>`

## 声明空间   

变量声明空间，类型声明空间。   

## 模块    

可以这样全局声明一个模块：   

```ts
declare module 'foo' {
    export var bar: number;
}
```    

```ts
import * as foo from 'foo';
```     

global.d.ts。    

默认安装的 @types/xxx 可以全局用，可以模块用，这就带来了命名空间污染的问题，所以要设置 types 配置项，保证只有模块的用法。    

## declaration   

使用 `declare` 声明一些可能在别的地方定义/出现的代码。这些 declare 语句可以放在普通的 .ts 文件中，也可以放在 .d.ts 文件中，
推荐用 .d.ts。     

但是这里有个问题啊，就是 declaration 文件是以全局，还是以模块的身份出现呢。   

## 枚举    

```ts
enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades,
}

var card = CardSuit.Clubs;
```    

```ts
enum Tristate {
    False,
    True,
    Unknown
}

var Tristate;
(function (Tristate) {
    Tristate[Tristate["False"] = 0] = "False";
    Tristate[Tristate["True"] = 1] = "True";
    Tristate[Tristate["Unknown"] = 2] = "Unknown";
})(Tristate || (Tristate = {}));
```    

`const enum`。    


## lib.d.ts    

每次安装 ts 的时候都会安装这个特殊的文件，里面包含了许多 js 运行时和 dom 的常见结构。这个文件在项目中是自动装载的。    

如果设置 noLib 选项，就不会装载这个文件。    
