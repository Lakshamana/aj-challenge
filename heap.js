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
    // const anyChildrenMatches = [_lChild(s), _rChild(s)]
    //   .filter(c => c && _eval(s, c, mode === 'min' ? 'max': 'min'))
    const m = mode === 'min' ? 'max': 'min'
    if (
      _isLeaf(s) ||
      (!_eval(s, _lChild(s), m) && !_eval(s, _rChild(s), m))
    )
      return
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
    const swap = this.array.length - 1 //_swappingTarget(idx)
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

  this.sort = () => {
    const sorted = []
    while (this.array.length > 0) {
      sorted.push(this.root())
      this.deleteAt(0)
    }
    return sorted
  }
}

function distinguish(orderList) {
  const result = {
      prime: [],
      nonprime: []
  };
  for (const o of orderList) {
      const f = o.charCodeAt(0);
      const _class = (97 <= f && f >= 122) ? 'prime' : 'nonprime';
      result[_class] = o;
  }
  return result;
}

function prioritizedOrders(numOrders, orderList){
  const { prime, nonprime } = distinguish(orderList);
  const heap = new Heap('key');
  for (const p of prime) {
      const [id, type, ...rest] = p.split(' ');
      heap.insert({
          value: rest,
          key: type + '_' + id
      });
  }
  const sorted = heap.sort();
  for (const s in sorted) {
      const {key, value} = s;
      console.log(key, value);
  };
}

// const rand = (min, max) => ~~(min + (max - min) * Math.random())
// const h = new Heap('k')
// for (const i of Array.from({length: 50}, () => ({k: rand(0, 100)}))) {
//   console.log(i)
//   h.insert(i)
// }
// for (const k of ['eat_br8', 'has_w1', 'a_zzz']) {
//   h.insert({ k })
// }

// h.makeHeap([{k: 'eat_br8'}, {k: 'has_w1'}, {k: 'a_zzz'}])
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
// h.deleteAt(0)
// console.log('after delete:', h.array)
// h.insert(1)
// console.log(h.array)
// console.log(h.updateAt(2, 7), h.array)
// console.log(h.sort())

module.exports = Heap
