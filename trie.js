function Trie() {
  const makeTrieNode = (char, isEnd = false) => ({
    char,
    isEnd,
    children: {}
  })

  this.root = makeTrieNode('')

  const _recChildBs = (c, node, l, r) => {
    if (r < l) return undefined

    // faster Math.floor
    const mid = l + ~~((r - l) >> 1)
    const child = node.children[mid]
    if (child.char.localeCompare(c) === 0) return child
    else if(child.char.localeCompare(c) === 1)
      return _recChildBs(c, node, l, mid - 1)
    else
      return _recChildBs(c, node, mid + 1, r)
  }

  const _iterChildBs = (c, node, l, r) => {
    while (l <= r) {
      // faster Math.floor
      const mid = l + ~~((r - l) >> 1)
      const child = node.children[mid]
      if (child.char.localeCompare(c) === 0) return child
      else if(child.char.localeCompare(c) === 1)
        r = mid - 1
      else
        l = mid + 1
    }
    return undefined
  }

  const getChild = (c, node) => {
    return _iterChildBs(c, node, 0, node.children.length - 1)
  }

  const linearGetChild = (c, node) => {
    for (const child of node.children) {
      if (child.char.localeCompare(c) === 0) return child
    }
  }

  // const sortedInsert = (child, node) => {
  //   const { children } = node
  //   const l = children.length
  //   if (!l)
  //     children.push(child)
  //   else {
  //     for (let i = l - 1; i > -1; i--) {
  //       if (child.char.localeCompare(children[i].char) > -1) {
  //         children.splice(i + 1, 0, child)
  //         return
  //       } else if (
  //         i === 0 &&
  //         child.char.localeCompare(children[i].char) === -1
  //       ) {
  //         node.children.splice(0, 0, child)
  //       }
  //     }
  //   }
  // }

  const sortedInsert = (child, node) => {
    const { children } = node
    const l = children.length
    if (!l)
      children.push(child)
    else {
      const result = []
      let pushed = false
      for (let i = 0; i < l; i++) {
        if (children[i].char.localeCompare(child.char) === -1) {
          result.push(children[i])
          if (i === l - 1) result.push(child)
        }
        else {
          if (!pushed) {
            result.push(child, children[i])
            pushed = true
          } else result.push(children[i])
        }
      }
      node.children = result
    }
  }

  this.print = (node = this.root) => {
    process.stdout.write(node.char)
    const { children } = node
    if (node.isEnd)
      process.stdout.write('.\n')
    else if(Object.keys(children).length > 1 && node.isEnd)
      process.stdout.write('\n →')
    for (const i in children) {
      // if (node.children.length > 1)
      //   process.stdout.write('\n →')
      // if (node.isEnd)
      //   process.stdout.write('\n ')
      this.print(children[i])
    }
  }

  const subtreeCountRecursive = node => {
    const { children } = node
    const cl = children.length
    if (!cl) return 1
    let s = +node.isEnd
    for (let i = 0; i < cl; i++) {
      s += subtreeCountRecursive(children[i])
    }
    return s
  }

  const subtreeCount = subroot => {
    let s = 0, i
    const q = []
    q.push(subroot)
    while (q.length) {
      const { children, isEnd } = q.pop()
      isEnd && s++
      i++
      for (const i in children) {
        q.push(children[i])
      }
    }
    return s
  }

  this.startsWithCount = sub => {
    let node = this.root
    const wl = sub.length
    for (let i = 0; i < wl; i++) {
      const child = node.children[sub[i]]
      if(!child) return 0
      node = child
    }
    return subtreeCount(node)
  }

  this.insert = word => {
    let currentNode = this.root
    const wl = word.length
    for (let i = 0; i < wl; i++) {
      let child = currentNode.children[word[i]]
      if (!child) {
        child = makeTrieNode(word[i])
        currentNode.children[word[i]] = child
      }
      currentNode = child
    }
    currentNode.isEnd = true
  }

  this.search = word => {
    let currentNode = this.root
    const wl = word.length
    for (let i = 0; i < wl; i++) {
      const child = currentNode.children[word[i]]
      if (!child) return false
      currentNode = child
    }
    return currentNode.isEnd
  }
}

function countTime(callback) {
  const start = Date.now()
  callback()
  return Date.now() - start
}

const tree = new Trie()
tree.insert('there')
tree.insert('thererere')
tree.insert('their')
tree.insert('the')
tree.insert('theatre')
tree.insert('threat')
tree.insert('table')
tree.insert('crrrnt')
tree.insert('currrent')
tree.insert('curry')
console.log(tree.search('th'))
console.log(tree.search('the'))
tree.print()
console.log(tree.startsWithCount('t'))
