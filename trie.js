function Trie() {
  const makeTrieNode = (char, isEnd = false) => ({
    char,
    isEnd,
    children: []
  })

  this.root = makeTrieNode('')

  const getChild = (c, node) => {
    for (const child of node.children) {
      if (child.char === c) return child
    }
  }

  this.print = (node = this.root) => {
    if (node !== this.root) process.stdout.write(node.char)
    for (const child of node.children) {
      if (node.children.length > 1)
        process.stdout.write('\n →')
      if (node.isEnd)
        process.stdout.write('\n ')
      this.print(child)
    }
    if (!node.children.length)
      process.stdout.write('\n ')
  }

  this.insert = word => {
    let currentNode = this.root
    for (const c of word) {
      let child = getChild(c, currentNode)
      if (!child) {
        child = makeTrieNode(c)
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
tree.insert('currrnt')
tree.insert('currrent')
tree.insert('curry')
// console.log(tree.search('the'))
tree.print()
