const Heap = require('./heap')

function Trie() {
  const makeTrieNode = (char, isEnd = false) => ({
    char,
    isEnd,
    children: []
  })

  this.root = makeTrieNode('')

  const _childBs = (c, node, l, r) => {
    if (r <= l) return

    // faster Math.floor
    const mid = l + ~~((r - l) / 2)
    console.log(mid)
    const child = node.children[mid]

    if (child.char === c) return child
    else if(child.char > c)
      return _childBs(c, node, l, mid - 1)
    else
      return _childBs(c, node, mid + 1, r)
  }

  const getChild = (c, node) => {
    return _childBs(c, node, 0, node.children.length - 1)
  }

  this.print = (node = this.root) => {
    process.stdout.write(node.char)
    if (node.isEnd)
      process.stdout.write('.\n')
    else if(node.children.length > 1 && node.isEnd)
      process.stdout.write('\n →')
    for (const child of node.children) {
      // if (node.children.length > 1)
      //   process.stdout.write('\n →')
      // if (node.isEnd)
      //   process.stdout.write('\n ')
      this.print(child)
    }
  }

  const subtreeCount = node => {
    if (!node.children.length) return 1
    let s = +node.isEnd
    for (const child of node.children) {
      s += subtreeCount(child)
    }
    return s
  }

  this.startsWithCount = sub => {
    let node = this.root
    for (const c of sub) {
      const child = getChild(c, node)
      if(!child) return 0
      node = child
    }
    return subtreeCount(node)
  }

  this.insert = word => {
    let currentNode = this.root
    // const h = new Heap()
    for (const c of word) {
      let child = getChild(c, currentNode)
      if (!child) {
        child = makeTrieNode(c)
        // h.makeHeap(children)
        currentNode.children.push(child)
      }
      currentNode = child
    }

    currentNode.isEnd = true
  }

  this.search = word => {
    let currentNode = this.root
    for (const c of word) {
      const child = getChild(c, currentNode)
      if (!child) return false
      currentNode = child
    }
    return true
  }
}

const tree = new Trie()
tree.insert('there')
tree.insert('thererere')
tree.insert('their')
tree.insert('the')
tree.insert('theatre')
tree.insert('threat')
tree.insert('currrnt')
tree.insert('currrent')
tree.insert('curry')
// console.log(tree.search('the'))
tree.print()
console.log(tree.startsWithCount('th'))
