# How-To-Detect-DOM-Resize

## 业务场景

在使用canvas绘制图表时通常需要先确定画布尺寸再进行绘制。但画布尺寸并不是永远不变的，改变浏览器窗口大小、侧边栏的展开/收起等常见场景都可能影响父容器的尺寸，从而需要改变画布尺寸并重绘（直接用css修改canvas尺寸会导致图像拉伸并变得模糊）。因此我们希望能够得到画布容器尺寸变化的事件以此来触发画布的重新绘制。

可能导致容器尺寸变化的情况有：
1. 浏览器大小变化（如在PC端拖拽浏览器窗口大小，移动端转屏）
2. 样式调整导致的布局变化

## 方案

### requestAnimationFrame/setTimeout（demo中未实现）

原理：

使用`requestAnimationFrame`或`setTimeout`对目标元素尺寸进行检测，如果尺寸改变则触发事件

优点：

1. 实现简单易懂
2. 对于所有元素有效
3. 能检测css`transition`导致的延迟变化
4. 可检测到元素的移除和隐藏

缺点：

1. 反复进行不必要的检查，相对来说会更消耗性能，尤其需要监控多个对象时
2. 回调有一定延迟

### MutationObserver/DOMSubtreeModified

原理：

利用`MutationObserver`或`DOMSubtreeModified`事件(IE)检测DOM属性变化，变化时去检查目标尺寸是否改变

优点：

1. 实现相对简单
2. 能够检测到元素的移除和隐藏

缺点：

1. 无法检测浏览器窗口大小变化和手机转屏（需要用`resize`事件辅助）
2. 无法处理css中`transition`导致的延迟变化（需要用`transitionend`事件辅助，但仍然只能触发一次）
3. 会有一些不必要的检查
4. 在微任务中回调，有些许延迟
5. 
### 隐藏的object/iframe

原理：

`resize`事件在改变窗口大小时会触发，比如拖拽改变浏览器窗口大小或手机转屏，但其仅在`window`上触发(部分版本IE除外)。因此可以容器内嵌入一个撑满容器的`object/iframe`，容器尺寸变化时将触发其内部`window`的`resize`事件

优点：

1. 实现简单易懂
2. 能检测css`transition`导致的延迟变化

缺点：

1. 需要嵌入额外的DOM节点，无法用在`<img>`, `<input>`等元素上
2. 当容器样式为`position: static`时，需要改变为`position: relative`
3. 节点的插入删除和`display: none`时不会触发事件

### scroll事件

原理:

嵌入两个比容器大的div，一个使用百分比大小，一个使用像素大小，并将其右和底定位到容器的右侧和底边，尺寸变化时触发scroll事件

优点：

1. 能检测css`transition`导致的延迟变化
2. 性能相对较好

缺点：

1. 奇技淫巧，实现相对复杂
2. 需要嵌入额外的DOM节点，无法用在`<img>`, `<input>`等元素上
3. 当容器样式为`position: static`时，需要改变为`position: relative`
4. 节点的插入删除和`display: none`时不会触发事件

### resize observer

https://wicg.github.io/ResizeObserver/

https://developers.google.com/web/updates/2016/10/resizeobserver

优点：

1. 实现简单
2. 上面提到的场景均能检测到

缺点：

1. 兼容性极差，只在高版本chrome能用，甚至在MDN都找不到

## 注意事项

1. 项目中的代码并未经过仔细的设计考虑和详细的测试，仅供参考，请不要直接拿到工程中使用
2. 检测转屏需设置`viewport`，`width=device-width`

## Thanks To

多种策略结合，并包含丰富的介绍文档：

https://github.com/Justineo/resize-detector

scroll事件：

https://github.com/marcj/css-element-queries

隐藏的object:

* https://github.com/Akryum/vue-resize

MutationObserver/DOMSubtreeModified：

* https://github.com/que-etc/resize-observer-polyfill