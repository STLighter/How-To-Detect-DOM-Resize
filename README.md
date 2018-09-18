# How-To-Detect-DOM-Resize

## 业务场景

在使用canvas绘制图表时通常需要先确定画布尺寸再进行绘制。但画布尺寸并不是永远不变的，改变浏览器窗口大小、侧边栏的展开/收起或者父容器隐藏等常见场景都可能影响父容器的尺寸，从而需要改变画布尺寸并重绘（直接用css修改canvas尺寸会导致图像拉伸并变得模糊）。因此我们希望能够得到画布容器尺寸变化的事件以此来触发画布的重新绘制。

可能导致容器尺寸变化的情况有：
1. 浏览器大小变化（如在PC端拖拽浏览器窗口大小，移动端转屏）
2. 样式调整导致的布局变化

`resize`事件仅在`window`上有，拖拽改变浏览器窗口大小或手机转屏时触发

## 方案

### requestAnimationFrame/setTimeout


### 隐藏的object/iframe

原理: 利用object/iframe尺寸变化时触发resize事件

### scroll事件

原理: 嵌入两个比容器大的div，一个使用百分比大小，一个使用像素大小，并将其右和底定位到容器的右侧和底边，尺寸变化时触发scroll事件

### mutation observer

### resize observer

https://wicg.github.io/ResizeObserver/

https://developers.google.com/web/updates/2016/10/resizeobserver