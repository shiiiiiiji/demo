function cb(val) {
  // 渲染视图
  console.log("视图更新啦～");
}

function defineReactive(obj, key, val) {
  // 一个 Dep 类对象
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true /* 属性可枚举 */,
    configurable: true /* 属性可被修改或删除 */,
    get: function reactiveGetter() {
      // 将 Dep.target (即当前的 Watch 对象存入 dep 的 subs 中)
      dep.addSub(Dep.target);
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      // 在 set 的时候触发 dep 的 notify 来通知所有的 Watcher 对象更新视图
      dep.notify();
    }
  });
}

function observer(value) {
  if (!value || typeof value !== "object") {
    return;
  }

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}

class Vue {
  // Vue构造类
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    // 新建一个 Watch 观察者对象，这时候 Dep.target 会指向这个 Watcher 对象
    new Watcher();
    // 在这里模拟 render 的过程，为了触发 test 属性的 get 函数
    console.log("render~", this._data.test);
  }
}

let o = new Vue({
  data: {
    test: "i am test."
  }
});

o._data.test = "hello, world.";
