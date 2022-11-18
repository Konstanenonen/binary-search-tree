function NodeFactory(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

function TreeFactory(array) {
  const buildTree = (arr) => {
    const sortedArrayToBST = (arr, start, end) => {
      if (start > end) return null;

      const middle = Math.floor((start + end) / 2);

      const node = NodeFactory(arr[middle]);
      node.left = sortedArrayToBST(arr, start, middle - 1);
      node.right = sortedArrayToBST(arr, middle + 1, end);

      return node;
    };

    const sanitizedArray = arr
      .filter((item, index, self) => self.indexOf(item) === index)
      .sort((a, b) => a - b);

    return sortedArrayToBST(sanitizedArray, 0, sanitizedArray.length - 1);
  };

  const root = buildTree(array);

  const insert = (value) => {
    const insertToTree = (node) => {
      if (node === null) return NodeFactory(value);

      if (node.data > value) node.left = insertToTree(node.left);

      if (node.data < value) node.right = insertToTree(node.right);

      return node;
    };

    insertToTree(root);
  };

  const remove = (value) => {
    const removeNode = (node, val) => {
      if (node.data > val) node.left = removeNode(node.left, val);
      if (node.data < val) node.right = removeNode(node.right, val);

      if (node.data === val && node.left === null && node.right === null) {
        return null;
      }

      if (node.data === val && node.left === null) {
        return node.right;
      }

      if (node.data === val && node.right === null) {
        return node.left;
      }

      if (node.data === val && node.right !== null && node.left !== null) {
        const minValue = (n) => {
          let minv = n.data;
          while (n.left !== null) {
            minv = n.left.data;
            n = n.left;
          }
          return minv;
        };
        node.data = minValue(node.right);
        node.right = removeNode(node.right, node.data);
      }

      return node;
    };

    removeNode(root, value);
  };

  const find = (value) => {
    const findFromTree = (node) => {
      if (node === null || node.data === value) return node;

      if (node.data > value) return findFromTree(node.left);

      if (node.data < value) return findFromTree(node.right);
    };

    return findFromTree(root);
  };

  return {
    root,
    buildTree,
    insert,
    remove,
    find,
  };
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const tree = TreeFactory([1, 4, 2, 3, 3, 6, 7, 5, 8, 9, 10, 11, 12, 13, 14]);

prettyPrint(tree.root);
