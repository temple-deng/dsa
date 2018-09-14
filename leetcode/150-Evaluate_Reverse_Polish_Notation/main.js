var evalRPN = function(tokens) {
  const stack = Array();
  
  const n = tokens.length;

  for (let i = 0; i < n; i++) {
    const char = tokens[i];
    var oper1, oper2;
    switch (char) {
      case '+':
        oper2 = Number(stack.pop());
        oper1 = Number(stack.pop());
        stack.push(oper1 + oper2);
        break;
      case '-':
        oper2 = stack.pop();
        oper1 = stack.pop();
        stack.push(oper1 - oper2);
        break;
      case '*':
        oper2 = stack.pop();
        oper1 = stack.pop();
        stack.push(oper1 * oper2);
        break;
      case '/':
        oper2 = stack.pop();
        oper1 = stack.pop();
        stack.push(Math.round(oper1 / oper2));
        break;
      default:
        stack.push(char);
        break;
    }
  }

  console.log()
  return stack.pop();
};

console.log(evalRPN(["2", '1', '+', '3', '*']));