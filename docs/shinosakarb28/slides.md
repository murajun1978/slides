# Shinosaka.rb #28
## React Fiber

---

## React v16.0 beta 5 :tada:

---

## Helpful issue

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
#### depends on the collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

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

## React Fiber
#### Architecture of Reconciliation
### Movie
[Lin Clark - A Cartoon Intro to Fiber - React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)

---

## Reconciliation
#### The algorithm React uses to diff one tree with another

---

## Changed Architecture
### Stack (v15) -> Fiber (v16)

---

## Stack
- Compare recursively Virtual DOM

---

## Problem
- It's slow when the Virtual DOM tree structure deeper
- Synchronous rendering
- UI is locked if processing is slow
  - Causing frames to drop and degrading the user experience
---

## Fiber
- Fiber is the Javascript object
- Abstract React Element update processing with Fiber
- Make Fiber a linked list
- Build a relationship between parents and siblings with other Fiber

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

## Resolves
- Pause work and come back later
- Reuse previously completed work
- Can give priority
- Asynchronous rendering!

---

## Solutions
- Use [requestIdleCallback()](https://developer.mozilla.org/ja/docs/Web/API/Window/requestIdleCallback) and [requestAnimationFrame()](https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame)
- High Priority - requestAnimationFrame()
- Low Priority - requestIdleCallback()

---

## Warning
- Asynchronous rendering is not enabled in v16.0
  - Async mode later during React 16.x
- ComponentWillUpdate is called many times
- ComponentDidUpdate is called only once
  - Don't describe slow processing
  - It's better to use Promise

---

## Let's try Asynchronous rendering

---

## Error Handling

---

## Problem
- A Script error in Component could not be handling
- The operation can continue if an exception occurs

---

## Resolves
- Don't render when an exception occurs
- Handling exceptions with componentDidCatch

---

## Let's try Error Handling

---

## Scheduling and Lifecycle

---

## Packaging
- Deprecated React.createClass
  - `create-react-class` package
- Deprecated React.PropTypes
  - `prop-types` package
  - Let's try [flow](https://flow.org/)
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
#### Asynchronous rendering
#### Component, Renderer and Reconciliation are split up in project
#### WebAssembly come in the future?

---

## Thanks :beers:
