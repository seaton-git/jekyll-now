---
layout: post
title: Taro.js 开发小程序 - React 入门
date:       2019-05-10
author:     Seaton
catalog: true
tags:
    - 前端开发
    - 小程序
---

# React

## JSX

 > JavaScript 内部实现的一种语法扩展

 ```jsx
// 普通表达式
const element = <h1 className="home">Hello, world!</h1>

// 属性为表达式
const element = <img src={user.avatarUrl} />

// 方法内使用 JSX
function getGreeting(user) {
    if (user) {
    return <div>Hello, {this.formatName(user)}!</div>;
    }
    return <h1>Hello, Stranger.</h1>;
}
```
    
### 注入攻击

所有的内容在渲染之前都被转换成了字符串，防止 `XSS` 攻击
    
### 注意
 
 - 因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称

 
    class -> className 
    tabindex -> tabIndex
    
## 元素渲染

 > React 元素都是 `immutable` 不可变的。当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子

重新调用 `render` 将只渲染更新改变的部分

## 组件 & Props

 > 组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素
 
 ```jsx
// 方式一
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// 方式二
class Welcome extends React.Component {
    render() {
    return <h1>Hello, {this.props.name}</h1>;
    }
}
```
    
### 注意

 - 组件名称必须以大写字母开头

## State & 生命周期

 - 私有，完全受控于当前组件

### 生命周期

[生命周期图例](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

React 16.3 新增的生命周期方法

 - getDerivedStateFromProps()
 - getSnapshotBeforeUpdate()

逐渐废弃的生命周期方法（17 版本删除）：

 - ~~componentWillMount()~~ -> UNSAFE_componentWillMount()
 - ~~componentWillReceiveProps()~~ -> UNSAFE_componentWillReceiveProps()
 - ~~componentWillUpdate()~~ -> UNSAFE_componentWillUpdate
 
一般将生命周期分成三个阶段：

 - 创建阶段（Mounting）
 - 更新阶段（Updating）
 - 卸载阶段（Unmounting）
 
#### 创建阶段

组件实例创建并插入 DOM 时，按顺序调用以下方法：

##### 1. constructor() 

构造函数，初始化 `state`

##### 2. static getDerivedStateFromProps(nextProps, prevProps)

创建时、接收新的 `props` 时、`setState` 时、`forceUpdate` 时执行

参数 `nextProps` 是新接收的 `props`，`prevState` 是当前的 `state`。返回值（对象）将用于更新 `state`，如果不需要更新则需要返回 `null`

```js
state = {
    isScrollingDown: false,
    lastRow: null,
};

static getDerivedStateFromProps(props, state) {
    if (props.currentRow !== state.lastRow) {
        return {
        isScrollingDown: props.currentRow > state.lastRow,
        lastRow: props.currentRow,
        };
    }

    // Return null to indicate no change to state.
    return null;
}
```
    
这个方法在建议尽量少用，只在必要的场景中使用，一般使用场景如下：

 - 无条件的根据 `props` 更新 `state`
 - 当 `props` 和 `state` 的不匹配情况更新 `state`

##### 3. ~~componentWillMount()~~/UNSAFE_componentWillMount()（being deprecated）

这个方法已经不推荐使用。因为在未来异步渲染机制下，该方法可能会多次调用。它所行使的功能也可以由 `componentDidMount()` 和 `constructor()` 代替：

 - 之前有些人会把异步请求放在这个生命周期，其实大部分情况下都推荐把异步数据请求放在 `componentDidMount()` 中
 - 在服务端渲染时，通常使用 `componentWillMount()` 获取必要的同步数据，但是可以使用 `constructor()` 代替它


##### 4. render()

`render()` 唯一必须的方法，不应包含副作用，为纯函数

作为渲染用，可以返回下面几种类型：

 - React 元素（React elements）
 - 数组（Arrays）
 - 片段（fragments）
 - 插槽（Portals）
 - 字符串或数字（String and numbers）
 - 布尔值或 null（Booleans or null）

> 注意：<br />
Arrays 和 String 是 v16.0.0 新增<br />
fragments 是 v16.2.0 新增<br />
Portals 是 V16.0.0 新增

##### 5. componentDidMount()

组件完成装载（已经插入 DOM 树）时，触发该方法。这个阶段已经获取到真实的 DOM

一般用于下面的场景：

 - 异步请求 ajax
 - 添加事件绑定（注意在 `componentWillUnmount` 中取消，以免造成内存泄漏）
 - 可以使用 `setState`，触发re-render，影响性能
 
#### 更新阶段（Updating）

 - ~~componentWillReceiveProps()~~/UNSAFE_componentWillReceiveProps()（being deprecated）
 - static getDerivedStateFromProps()
 - shouldComponentUpdate()
 - ~~componentWillUpdate()~~/UNSAFE_componentWillUpdate()（being deprecated）
 - render()
 - getSnapshotBeforeUpdate()
 - componentDidUpdate()

> 有 `getDerivedStateFromProps` 或者 `getSnapshotBeforeUpdate` 时，`componentWillReceiveProps()/UNSAFE_componentWillReceiveProps()` 和 `componentWillUpdate()/UNSAFE_componentWillUpdate()` 不会执行 [详情查看源码](https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberClassComponent.js)

##### 1. ~~componentWillReceiveProps()~~/UNSAFE_componentWillReceiveProps()

```js
UNSAFE_componentWillReceiveProps(nextProps)
```

接收新的 `props` 时触发，即使 `props` 没有变化

一般用这个方法来判断 props 的前后变化来更新 `state`

这个方法将被弃用，推荐使用 `getDerivedStateFromProps` 代替

##### 2. static getDerivedStateFromProps()

同创建阶段（Mounting） 行为一致

##### 3. shouldComponentUpdate()

在接收新的 `props` 或新的 `state` 时，在渲染前会触发该方法

该方法通过返回 `true` 或者 `false` 来确定是否需要触发新的渲染。返回 `false`， 则不会触发后续的 `UNSAFE_componentWillUpdate()`、`render()` 和 `componentDidUpdate()`（但是 `state` 变化还是可能引起子组件重新渲染）

所以通常通过这个方法对 props 和 state 做比较，从而避免一些不必要的渲染

> PureComponent 的原理就是对 props 和 state 进行浅对比（shallow comparison），来判断是否触发渲染

##### 4. ~~componentWillUpdate()~~/UNSAFE_componentWillUpdate()

接收到新的 `props` 或 `state` 时，在渲染前执行该方法

在以后异步渲染时，可能会出现某些组件暂缓更新，导致 `componentWillUpdate` 和 `componentDidUpdate` 之间的时间变长，这个过程中可能发生一些变化，比如用户行为导致 DOM 发生了新的变化，这时在 `componentWillUpdate` 获取的信息可能就不可靠了

##### 5. render()

同创建阶段（Mounting）行为一致

##### 6. getSnapshotBeforeUpdate()

```js
// prevProps：更新前的 props，prevState：更新前的 state
getSnapShotBeforeUpdate(prevProps, prevState)
```

这个方法在 `render()` 之后，`componentDidUpdate()` 之前调用

返回值称为一个快照（snapshot），如果不需要 snapshot，则必须显示的返回 `null` —— 因为返回值将作为 `componentDidUpdate()` 的第三个参数使用。所以这个函数必须要配合 `componentDidUpdate()` 一起使用

这个函数的作用是在真实 DOM 更新（`componentDidUpdate`）前，获取一些需要的信息（类似快照功能），然后作为参数传给 `componentDidUpdate`。例如：在 `getSnapShotBeforeUpdate` 中获取滚动位置，然后作为参数传给 `componentDidUpdate`，就可以直接在渲染真实的 DOM 时就滚动到需要的位置

##### 7. componentDidUpdate()

```js
componentDidUpdate(prevProps, prevState, snapshot)
```

更新完成之后调用，第三个参数 `snapshot` 就是 `getSnapshotBeforeUpdate` 的返回值

有 `getSnapshotBeforeUpdate` 时，必须要有 `componentDidUpdate` 配合使用

可以使用 `setState`，会触发 re-render，所以要注意判断，避免导致死循环


#### 卸载阶段（Unmounting）

 - componentWillUnmount()

##### 1. componentWillUnmount()

组件卸载或者销毁前调用

#### 错误处理 Error Handling

 - componentDidCatch()
 
##### 1. componentDidCatch()

```js
componentDidCatch(err, info)
```

子组件在渲染期间，生命周期方法中或者构造函数 `constructor` 发生错误时调用

错误边界不会捕获下面的错误：

 - 事件处理 (Event handlers) （因为事件处理不发生在 React 渲染时，报错不影响渲染）
 - 异步代码 (Asynchronous code) (e.g. setTimeout or requestAnimationFrame callbacks)
 - 服务端渲染 (Server side rendering)
 - 错误边界本身(而不是子组件)抛出的错误

### 注意

 - 不要直接更新状态，不会重新渲染组件
 
```js
// 错误
this.state.comment = 'Hello'

// 正确
this.setState({ comment: 'Hello' })

- 状态更新可能是异步


// 错误
this.setState({
    counter: this.state.counter + this.props.increment,
})

// 正确
this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
}))
```

### 数据自顶向下流动（单向数据流）

> 状态通常被称为局部或封装，除了拥有并设置它的组件外，其他组件不可访问

## 事件处理

 - React事件绑定属性的命名采用驼峰式写法，而不是小写
 - 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
 - React 中不能使用返回 `false` 的方式阻止默认行为。你必须明确的使用 `preventDefault`
 

    <button onClick={this.pushList.bind(this, 'CSS')}>
        添加
    </button>
    
## 条件渲染

使用 `if` 、 `&&` 、 三目运算符 等

```jsx
render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    
    if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
        <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
        </div>
    );
}
```
      
## 列表 & Keys

```jsx     
{
    this.state.list.map((item, index) => (
        <Item item={item} key={index} />
    ))
}
```


## 表单

```jsx
// 声明state
state = {
    name: 'CSS'
}

// 改变监听
handlerInput = (event) => {
    this.setState({name: event.target.value});
}

// 渲染
<input value={this.state.name} onInput={this.handlerInput} />
```

## 状态提升

通过 `this.props[handlerEvent]` 实现传值给父组件state，再共享至当前子组件的其他兄弟组件

# React Router

[React Router 文档](http://react-guide.github.io/react-router-cn/)

```jsx
handlerJump = () => {
    const {history} = this.props;
    
    history.push('/copy_docs');
}
```

