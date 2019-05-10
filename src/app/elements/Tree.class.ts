export class Tree implements Iterable<any> {
    constructor(public concept: any, public children: Tree[] = null) { }

    add(child: Tree) {
        this.children.push(child);
    }

    [Symbol.iterator](level = 0) {
        const self = this;
        let me = false;
        let childIterator;
        let current;
        let index = 0;
        if (this.children && this.children.length) {
            childIterator = this.children.map(c => c[Symbol.iterator](level + 1));
            current = childIterator[0];
        }
        return {
            next(): IteratorResult<any> {
                if (!me) {
                    me = true;
                    return {
                        done: false,
                        value: self.concept + level
                    };
                } else if (childIterator) {
                    const r = current.next();
                    if (r.done) {
                        index++;
                        if (index === childIterator.length) {
                            return { done: true, value: null };
                        } else {
                            current = childIterator[index];
                            return current.next();
                        }
                    }
                    return r;
                } else {
                    return {
                        done: true,
                        value: null
                    };
                }
            }
        };
    }

}
