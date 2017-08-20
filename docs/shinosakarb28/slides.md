# Shinosaka.rb #28
## React Fiber

---

## React v16.0 beta 5 :tada:

---

## 参考 issue

[React 16 beta #10294](https://github.com/facebook/react/issues/10294)

---

## Agenda
- Environment Requirements
- React Fiber
- Error Handling
- Scheduling and Lifecycle
- Packaging

---

## Environment Requirements
#### [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) と [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) に依存するようになった

---

## IE 11 :cry:

---

## [core-js](https://github.com/zloirock/core-js)

```javascript
import 'core-js/es6/map'
import 'core-js/es6/set'

import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)
```

---

## [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)

```javascript
import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)
```

---

## Environment Requirements
- [requestIdleCallback](https://developer.mozilla.org/ja/docs/Web/API/Window/requestIdleCallback) に依存
  - [対応ブラウザ](https://caniuse.com/#search=requestIdleCallback)が少ないので、[polyfill](https://github.com/facebook/react/blob/master/src/renderers/shared/ReactDOMFrameScheduling.js#L57-L153)を実装している
- [requestAnimationFrame](https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame) に依存

---

## React Fiber
#### Reconciliationのアーキテクチャ
### Movie
[Lin Clark - A Cartoon Intro to Fiber - React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)

---

## Reconciliation
#### 仮想DOMの差分を更新するアルゴリズム

---

## Changed Architecture
### Stack (v15) -> Fiber (v16)

---

## Stack
- 仮想DOMを再帰的に比較する
- 同期レンダリング

---

## Problem
- 仮想DOMのツリー構造が深いと遅くなってしまう
- 同期レンダリングなので、処理が遅くなるとUIがロックする
  - フレームをドロップしてユーザーエクスペリエンスを低下させる

---

## Fiber
- FiberはJavascriptオブジェクト
- React Elementの更新処理をFiberで抽象化
- Fiberの連結リストを作成し、Fiberごとに更新処理を実行する
- 他のFiberと親子、兄弟の関連を構築する

---

## [Fiber Types](https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactFiber.js#L66)

```
export type Fiber = {|
  // These first fields are conceptually members of an Instance. This used to
  // be split into a separate type and intersected with the other Fiber fields,
  // but until Flow fixes its intersection bugs, we've merged them into a
  // single type.

  // An Instance is shared between all versions of a component. We can easily
  // break this out into a separate object to avoid copying so much to the
  // alternate versions of the tree. We put this on a single object for now to
  // minimize the number of objects created during the initial render.

  // Tag identifying the type of fiber.
  tag: TypeOfWork,

  // Unique identifier of this child.
  key: null | string,

  // The function/class/module associated with this fiber.
  type: any,

  // The local state associated with this fiber.
  stateNode: any,

  // Conceptual aliases
  // parent : Instance -> return The parent happens to be the same as the
  // return fiber since we've merged the fiber and instance.

  // Remaining fields belong to Fiber

  // The Fiber to return to after finishing processing this one.
  // This is effectively the parent, but there can be multiple parents (two)
  // so this is only the parent of the thing we're currently processing.
  // It is conceptually the same as the return address of a stack frame.
  return: Fiber | null,

  // Singly Linked List Tree Structure.
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref: null | (((handle: mixed) => void) & {_stringRef: ?string}),

  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any, // This type will be more specific once we overload the tag.
  memoizedProps: any, // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: UpdateQueue | null,

  // The state used to create the output
  memoizedState: any,

  // Bitfield that describes properties about the fiber and its subtree. E.g.
  // the AsyncUpdates flag indicates whether the subtree should be async-by-
  // default. When a fiber is created, it inherits the internalContextTag of its
  // parent. Additional flags can be set at creation time, but after than the
  // value should remain unchanged throughout the fiber's lifetime, particularly
  // before its child fibers are created.
  internalContextTag: TypeOfInternalContext,

  // Effect
  effectTag: TypeOfSideEffect,

  // Singly linked list fast path to the next fiber with side-effects.
  nextEffect: Fiber | null,

  // The first and last fiber with side-effect within this subtree. This allows
  // us to reuse a slice of the linked list when we reuse the work done within
  // this fiber.
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  // This will be used to quickly determine if a subtree has no pending changes.
  pendingWorkPriority: PriorityLevel,

  // This is a pooled version of a Fiber. Every fiber that gets updated will
  // eventually have a pair. There are cases when we can clean up pairs to save
  // memory if we need to.
  alternate: Fiber | null,

  // Conceptual aliases
  // workInProgress : Fiber ->  alternate The alternate used for reuse happens
  // to be the same as work in progress.
  // __DEV__ only
  _debugID?: DebugID,
  _debugSource?: Source | null,
  _debugOwner?: Fiber | ReactInstance | null, // Stack compatible
  _debugIsCurrentlyTiming?: boolean,
|};
```

---

## できること
- Fiberが独立しているので、処理を中断、再開することができる
- 以前に完了したFiberを再利用する
- 更新処理に優先順位をつけることができる
- 非同期レンダリング

---

## 内部的な実装
- [requestIdleCallback()](https://developer.mozilla.org/ja/docs/Web/API/Window/requestIdleCallback) と [requestAnimationFrame()](https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame) を使って、独自のスタックフレームワークを実装している
- 優先度の高い処理 - requestAnimationFrame()
- 優先度の低い処理 - requestIdleCallback()

---

## ご注意
- 非同期レンダリングはv16.0では、まだ使えない
  - v16.xのどこかではいる
- ComponentWillUpdateは複数回callされる可能性がある
  - 更新処理が再開するときにもcallされる
- ComponentDidUpdateは1度だけcallされる
- LifeCycleメソッドでは、遅い処理をcallするのは避ける
- Promiseなどで非同期処理にするのがいいかも

---

## 非同期レンダリングを試そう!

---

## Error Handling

---

## 問題点
- Componentで発生した例外を補足できない
- Component内で例外が発生しても操作できてしまう

---

## できること
- Error HandlingしていないComponentで例外が発生すると、何もレンダリングしない
- componentDidCatchで、Component内の例外を補足できる

---

## Error Handlingを試そう!

---

## Scheduling and Lifecycle

---

## Packaging
- Deprecated React.createClass
  - `create-react-class` package
- Deprecated React.PropTypes
  - `prop-types` package
  - [flow](https://flow.org/) を使おう
- Deprecated Addons
  - react-addons-create-fragment
  - react-addons-css-transition-group -> react-transition-group
  - react-addons-transition-group -> react-transition-group
  - react-addons-linked-state-mixin, react-linked-input
  - react-addons-pure-render-mixin,
  - react-addons-shallow-compare, react-addons-update
  - react-addons-test-utils -> react-dom/test-utils

---

## Awesome React :smile:
#### 非同期レンダリング
#### Component, RendererとReconciliationが分離されている
#### ReactにWebAssemblyとかくるかも

---

## Enjoy React :beers:
