'use strict';

class BinaryTree {
    constructor() {
        //assigns null to the root
        this.root = null;
    }

    insert(data) {
        //create a new item object, place data in
        var node = new Node(data);
        var current;

        //if there're no items in the tree yet
        if (this.root === null) {
            this.root = node;
        }
        else {
            current = this.root;

            while (true) {

                //if the new value is less than this node's value, go left
                if (data < current.data) {
                    //if there's no left, then the new node belongs there
                    if (current.left === null) {
                        current.left = node;
                        break;
                    }
                    else {
                        current = current.left;
                    }
                }
                //if the new value is greater than this node's value, go right
                else if (data > current.data) {
                    //if there's no right, then the new node belongs there
                    if (current.right === null) {
                        current.right = node;
                        break;
                    }
                    else {
                        current = current.right;
                    }

                    //if the new value is equal to the current one, just ignore
                }
                else {
                    break;
                }
            }
        }
    }

    contains(data) {
        var isFound = false,
            current = this.root;

        //make sure there's a node to search
        while (!isFound && current) {

            //if the value is less than the current node's, go left
            if (data < current.data) {
                current = current.left;
            }
            //if the value is greater than the current node's, go right
            else if (data > current.data) {
                current = current.right;
            }
            //and if values are equal - element is found
            else {
                isFound = true;
            }
        }

        //only proceed if the node was found
        return isFound;
    }

    remove(data) {
        //we start from the root
        this.root = removeNode(this.root, data);

        function removeNode(node, data) {
            //if there's nothing to delete
            if(node === null)
                return null;

            //if we found the chosen node
            if(data == node.data) {
                //if there're no children
                if(node.left === null && node.right === null)
                    return null;

                //if there is no left child, just delete and reassign
                if(node.left===null)
                    return node.right;

                //if there is no right child, just delete and reassign
                if(node.right===null)
                    return node.left;

                //if there're two children, we're searching for minimal element in right branch
                //then placing it instead of removing element
                var current = node.right;
                while (current.left)
                    current = current.left;

                node.data = current.data;
                node.right = removeNode(node.right, current.data);
                return node;
            }
            //if the chosen element is in the left branch
            else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            }
            //if the chosen element is in the right branch
            else if (data > node.data) {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
    }

    size() {
        //traverses the tree
        function preOrderTraversal(node) {
            if(node !== null) {
                return preOrderTraversal(node.left) + preOrderTraversal(node.right) + 1;
            }
            else
                return 0;
        }
        //returns height
        return preOrderTraversal(this.root);
    }


    isEmpty() {
        //returns true if tree is empty, false if not
        return this.root === null;
    }
}