/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  // 添加观察者
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 移除观察者
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  // 存在观察者时，收集依赖
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  // 执行所有观察者的update事件，渲染视图
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null
const targetStack = []

// 将watcher实例赋值给dep.target对象，如果之前存在观察者将其放入targetStack堆栈中
export function pushTarget (_target: Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

// 从targetStack堆栈中删除最后一个元素，这个元素负责为dep.target
export function popTarget () {
  Dep.target = targetStack.pop()
}
