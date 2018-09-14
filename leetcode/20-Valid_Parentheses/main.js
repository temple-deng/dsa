var isValid = function(s) {
  var stack = Array();

  var n = s.length;

  for (let i = 0; i < n; i++) {
    const char = s[i];
    let len = stack.length;
    switch (char) {
      case '[':
      case '{':
      case '(':
        stack.push(char);
        break;
      case ']':
        if (len === 0) {
          return false;
        }
        if (stack[len-1] === '[') {
          stack.pop();
        } else {
          return false;
        }
        break;
      case '}':
        if (len === 0) {
          return false;
        }
        if (stack[len-1] === '{') {
          stack.pop();
        } else {
          return false;
        }
        break;
      case ')':
        if (len === 0) {
          return false;
        }
        if (stack[len-1] === '(') {
          stack.pop();
        } else {
          return false;
        }
        break;
      default:
        break;
    }
  }

  return stack.length === 0;
};