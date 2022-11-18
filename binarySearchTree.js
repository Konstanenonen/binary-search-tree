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

  const find = (value) => {
    const findFromTree = (node, val) => {
      if (node.data === null || node.data === val) return node;

      if (node.data > val) return findFromTree(node.left, val);

      if (node.data < val) return findFromTree(node.right, val);
    };

    return findFromTree(root, value);
  };

  return {
    root,
    buildTree,
    find,
    insert,
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

const tree = TreeFactory([1, 4, 2, 3, 3, 6, 7, 5, 8, 9]);

prettyPrint(tree.root);
