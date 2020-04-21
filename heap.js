function Heap(key, mode = 'min') {
  this.array = []

  // insertion oriented evaluations
  const evaluations = {
    min: (n, c) => n < c,
    max: (n, c) => n > c
  }

  const _eval = (nodeIdx, childIdx, m = mode) => {
    const nodeVal = _valueAt(nodeIdx)
    const childVal = _valueAt(childIdx)
    return evaluations[m](nodeVal, childVal)
  }

  const _compare = (a, b, m = mode) => {
    return evaluations[m](a[key] || a, b[key] || b)
  }

  const _swap = (i, j) => {
    const [a, b] = [this.array[i], this.array[j]]
    this.array[i] = b
    this.array[j] = a
  }

  const _valueAt = i => {
    const val = this.array[i]
    return key && val ? val[key] : val
  }

  const _lChild = i => {
    return 2 * i + 1
  }

  const _rChild = i => {
    return 2 * (i + 1)
  }

  const _parent = i => {
    if (i === 0) return undefined
    return Math.floor((i - 1) / 2)
  }

  const _isLeaf = idx => !_valueAt(_lChild(idx))

  const _bubbleUp = nodeIdx => {
    const pidx = _parent(nodeIdx)
    if (pidx === undefined || _eval(pidx, nodeIdx)) return
    _swap(pidx, nodeIdx) // array[pidx] = new array[nodeIdx]
    _bubbleUp(pidx)
  }

  const _bubbleDown = s => {
    const anyChildrenMatches = [_lChild(s), _rChild(s)]
      .filter(c => c && _eval(s, c, mode === 'min' ? 'max': 'min'))
    if (!anyChildrenMatches.length || _isLeaf(s)) return
    const swapIdx = _next(s)
    if (!_valueAt(swapIdx)) return
    _swap(s, swapIdx) // array[s] = new array[swapIdx]
    _bubbleDown(swapIdx)
  }

  const _next = s => {
    if (!_valueAt(_rChild(s)))
      return _lChild(s)
    return _eval(_lChild(s), _rChild(s)) ? _lChild(s) : _rChild(s)
  }

  const _swappingTarget = s => {
    if (_isLeaf(s)) return s
    return _swappingTarget(_next(s))
  }

  this.root = () => this.array[0]

  this.insert = node => {
    this.array.push(node)
    _bubbleUp(this.array.length - 1)
  }

  this.updateAt = (idx, override) => {
    const val = _valueAt(idx)
    if (!val) return false
    this.array[idx] = override
    if (_compare(val, override))
      _bubbleDown(idx)
    else
      _bubbleUp(idx)
    return true
  }

  this.deleteAt = idx => {
    if (_isLeaf(idx)) {
      this.array.pop()
      return
    }
    const swap = _swappingTarget(idx)
    _swap(idx, swap)
    this.array.splice(swap, 1)
    _bubbleDown(idx)
  }

  this.makeHeap = nodes => {
    this.array = []
    for (const n of nodes) {
      this.insert(n)
    }
  }
}

// const h = new Heap()
// h.makeHeap([3, 1, 6, 5, 2, 4])
// h.makeHeap([{k: 3}, {k: 1}, {k: 6}, {k: 5}, {k: 2}, {k: 4}])
// const k = h.root()
// console.log(k)
// h.makeHeap([
//   { vtx: 'a', dist: 0 },
//   { vtx: 'b', dist: 1000000 },
//   { vtx: 'c', dist: 1000000 },
//   { vtx: 'd', dist: 1000000 },
//   { vtx: 'e', dist: 1000000 }
// ])
// console.log(h.array)
// h.deleteAt(1)
// console.log('after delete:', h.array)
// h.insert(1)
// console.log(h.array)
// console.log(h.updateAt(2, 7), h.array)

module.exports = Heap
