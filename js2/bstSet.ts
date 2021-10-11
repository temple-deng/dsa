import type {Set} from './set';
import BST from './bst';

export default class BSTSet<T> implements Set<T> {
    tree = new BST();

    getSize() {
        return this.tree.getSize();
    }

    isEmpty() {
        return this.tree.isEmpty();
    }

    add(e: T) {
        this.tree.add(e);
    }

    remove(e: T) {
        this.tree.remove(e);
    }

    contains(e: T) {
        return this.tree.contains(e);
    }
}
