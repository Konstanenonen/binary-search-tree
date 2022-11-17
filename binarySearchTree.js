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

    console.log(sanitizedArray);

    return sortedArrayToBST(sanitizedArray, 0, sanitizedArray.length - 1);
  };

  const root = buildTree(array);

  return {
    root,
    buildTree,
  };
}
