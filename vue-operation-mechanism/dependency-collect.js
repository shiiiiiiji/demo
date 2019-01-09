// 订阅者 Dep
class Dep {
  constructor() {
    // 用来存放 Watcher 对象的数组
    this.subs = [];
  }

  // 在 subs 中添加一个 Watcher 对象
  addSub(sub) {
    this.subs.push(sub);
  }

  // 通知所有 Watcher 对象更新视图
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

// 观察者 Watch
class Watch {
  constructor() {
    // 在 new 一个 Watcher 对象时将该对象赋值给 Dep.target，在 get 中会用到
    Dep.target = this;
  }

  // 更新视图的方法
  update() {
    console.log("视图更新啦～");
  }
}

Dep.target = null;
