import ArrayStack from "../arrayStack";

interface tagMap {
    [index: string]: string;
}

function fn(str: string): boolean {
    const stack = new ArrayStack<string>(str.length);
    const map: tagMap = {
        'o}': '{',
        'o)': '(',
        'o]': '[',
    };

    for (let i = 0, len = str.length; i < len; i++) {
        const char = str[i];

        switch (char) {
            case '{':
            case '(':
            case '[':
                stack.push(char);
                break;
            case '}':
            case ')':
            case ']':
                if (stack.isEmpty()) {
                    return false;
                }
                let top = stack.pop();
                if (map['o' + char] !== top) {
                    return false;
                }
                break;
        }
    }

    return stack.isEmpty();
}