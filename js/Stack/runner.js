const Stack = require('./stack');

const stack = new Stack(12);

console.log(stack.toString());   // 

stack.push(0);
stack.push(1);
stack.push(2);

console.log(stack.toString());   // 2, 1, 0

const elem = stack.pop();
stack.push(100);

console.log(elem);   // 2
console.log(stack.toString())  // 100, 1, 0

console.log(stack.peek()) // 100


/**
 * 括号匹配校验函数
 * 利用栈结构，左括号就入栈
 * 右括号就与栈顶元素进行配对操作
 * 如果配对，就把栈顶元素出栈
 * 否则，就匹配失败
 * 如果在循环结束后，循环没有被中断，而且栈也是空的，那么就匹配成功了
 * @param {*} str 
 */
function validPares(str) {
  const left = ['{', '[', '('];
  const right = ['}', ']', ')'];
  const all = left.concat(right);
  const length = str.length;
  const stack = new Stack(str.length);
  
  // i 必须是循环作用域外的变量，不然无法知道循环是否被中途打断的
  let i = 0;
  for (; i < length; i++) {
    if (left.indexOf(str[i]) !== -1) {
      stack.push(str[i]);
    } else {
      const top = stack.peek();
      if (all.indexOf(str[i]) === (all.indexOf(top) + 3)) {
        // 匹配
        stack.pop();
      } else {
        // 匹配失败
        break;
      }
    }
  }

  if (i === length) {
    if (stack.getLength() === 0) {
      return 'bingo';
    } else {
      return 'ooop';
    }
  }

  return 'ooop';
}


console.log(validPares("[{({[()]})}]"));
console.log(validPares("[{)]"));

// 非栈的算法，利用一个指针来指向栈顶
function validPares2(str) {
  const length = str.length;
  const array = new Array();
  let topIndex = -1;
  const left = ['{', '[', '('];
  const right = ['}', ']', ')'];
  const all = left.concat(right);
  let i = 0;
  for (; i < length; i++) {
    if (left.indexOf(str[i]) !== -1) {
      array.push(str[i]);
      topIndex++;
    } else {
      const top = array[topIndex];
      if (all.indexOf(str[i]) === (all.indexOf(top) + 3)) {
        // 匹配
        array.pop();
        topIndex--;
      } else {
        // 匹配失败
        break;
      }
    }
  }

  if (i === length) {
    if (topIndex === -1) {
      return true;
    } else {
      return false;
    }
  }

  return false;
}

console.log(validPares2("[{()}]"));
console.log(validPares2("[{)]"));
