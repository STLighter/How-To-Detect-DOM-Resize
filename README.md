# How-To-Detect-DOM-Resize

## 业务场景

在使用canvas绘制图表时通常需要先确定画布尺寸再进行绘制。但画布尺寸并不是永远不变的，侧边栏的展开/收起导致画布父容器尺寸改变或者父容器隐藏等常见场景都可能需要改变画布尺寸并重绘（直接用css修改canvas尺寸会导致图像拉伸并变得模糊）。因此我们希望能够得到画布容器尺寸变化的事件以此来触发画布的重新绘制。

## 核心问题

1. 检测父容器宽高被其他元素影响而改变
2. 检测父容器`display: none`时宽高变为0

## 方案

### requestAnimationFrame/setTimeout


### 隐藏的object/iframe

原理: 利用object/iframe尺寸变化时触发resize事件

### scroll事件

原理: 嵌入两个比容器大的div，一个使用百分比大小，一个使用像素大小，并将其右和底定位到容器的右侧和底边，尺寸变化时触发scroll事件

### resize observer

原理: 原生ResizeObserver

### mutation observer

