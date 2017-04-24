/**
 * Created by jamie on 24/04/2017. logic used from:
 * https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392
 */
const util = require('util');

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}
class SingleLinkedList {
    constructor() {
        this._length = 0;
        this.head = null;
    }

    add(value) {
        let node = new Node(value),
            currentNode = this.head;

        // 1st use-case: an empty list
        if (!currentNode) {
            this.head = node;
            this._length++;
            return node;
        }

        // 2nd use-case: a non-empty list
        while (currentNode.next) {
            currentNode = currentNode.next;
        }

        currentNode.next = node;

        this._length++;

        return node;
    }

    searchNodeAt(position) {
        let currentNode = this.head,
            length = this._length,
            count = 1;
        const failMessage = 'Search Failure: non-existent node in this list.';

        // 1st use-case: an invalid position
        if (length === 0 || position < 1 || position > length) {
            throw new Error(failMessage);
        }

        // 2nd use-case: a valid position
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode;
    }

    remove(position) {
        let currentNode = this.head,
            length = this._length,
            count = 0,
            beforeNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null;
        const failMessage = 'Remove Failure: non-existent node in this list.';

        // 1st use-case: an invalid position
        if (position < 0 || position > length) {
            throw new Error(failMessage);
        }

        // 2nd use-case: the first node is removed
        if (position === 1) {
            this.head = currentNode.next;
            deletedNode = currentNode;
            currentNode = null;
            this._length--;

            return deletedNode;
        }

        // 3rd use-case: any other node is removed
        while (count < position) {
            beforeNodeToDelete = currentNode;
            nodeToDelete = currentNode.next;
            count++;
        }

        beforeNodeToDelete.next = nodeToDelete.next;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
        this._length--;

        return deletedNode;
    }
}

class DoubleLinkedList {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null;
    }

    add(value) {
        let node = new Node(value);

        if (this._length) {
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }

        this._length++;

        return node;
    }

    searchNodeAt(position) {
        let currentNode = this.head,
            length = this._length,
            count = 1;
        const failMessage = 'Search Failure: non-existent node in this list.';

        // 1st use-case: an invalid position
        if (length === 0 || position < 1 || position > length) {
            throw new Error(failMessage);
        }

        // 2nd use-case: a valid position
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode;
    }

    remove(position) {
        let currentNode = this.head,
            length = this._length,
            count = 1,
            beforeNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null;
        const failMessage = 'Remove Failure: non-existent node in this list.';


        // 1st use-case: an invalid position
        if (length === 0 || position < 1 || position > length) {
            throw new Error(failMessage);
        }

        // 2nd use-case: the first node is removed
        if (position === 1) {
            this.head = currentNode.next;

            // 2nd use-case: there is a second node
            if (!this.head) {
                this.head.previous = null;
                // 2nd use-case: there is no second node
            } else {
                this.tail = null;
            }

            // 3rd use-case: the last node is removed
        } else if (position === this._length) {
            this.tail = this.tail.previous;
            this.tail.next = null;
            // 4th use-case: a middle node is removed
        } else {
            while (count < position) {
                currentNode = currentNode.next;
                count++;
            }

            beforeNodeToDelete = currentNode.previous;
            nodeToDelete = currentNode;
            let afterNodeToDelete = currentNode.next;

            beforeNodeToDelete.next = afterNodeToDelete;
            afterNodeToDelete.previous = beforeNodeToDelete;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
        }

        this._length--;

        return deletedNode;
    }
}


let singleList = new SingleLinkedList();
console.log('--------Single linked list Operations--------');
console.log(singleList);
singleList.add(5);
singleList.add(7);
singleList.add(9);
console.log(JSON.stringify(singleList));
console.log(singleList.searchNodeAt(2));
singleList.remove(1);
console.log(JSON.stringify(singleList));
console.log('--------Single linked list Operations--------');
console.log('\n--------Double linked list Operations--------')
let doubleList = new DoubleLinkedList();
doubleList.add(10);
doubleList.add(465);
doubleList.add(325);
console.log(doubleList);
console.log(doubleList.searchNodeAt(2));
doubleList.remove(1);
console.log(doubleList);
console.log('--------Double linked list Operations--------')

