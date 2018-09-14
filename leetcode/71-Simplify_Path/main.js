var simplifyPath = function(path) {
  var stack = Array();

  var splits = path.split('/');
  splits = splits.filter((p) => {
    return p !== '';
  });

  const n = splits.length;

  for (let i = 0; i < n; i++) {
    const p = splits[i];
    switch (p) {
      case '.':
        break;
      case '..':
        if (stack.length !== 0) {
          stack.pop();
        }
        break;
      default:
        stack.push(p);
        break;
    }
  }

  let result = stack.join('/');
  return '/' + result;
};