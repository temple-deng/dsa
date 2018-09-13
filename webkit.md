# 第 1 章 浏览器和浏览器内核

## 1.1 浏览器

### 1.1.1 浏览器简介

在 FF 发布 1.0 版本的前一年，2003 年，苹果发布了 Safari 浏览器，并在2005 年释放了
浏览器中一种非常重要部件的源代码，发起了一个新的开源项目WebKit，它是Safari浏览器的内核。    

2008年，Google 公司以苹果开源项目 WebKit 作为内核，创建了一个新的项目Chromium，该项目
的目标是创建一个快速的、支持众多操作系统的浏览器，包括对桌面操作系统和移动操作系统的支持。    

在 Chromium 项目的基础上，Google 发布了自己的浏览器产品 Chrome。不同于 WebKit 之于
Safari 浏览器，Chromium 本身就是一个浏览器，而不是 Chrome 浏览器的内核，Chrome 浏览器
一般选择 Chromium 的稳定版本作为它的基础。Chromium 是开源试验场，它会尝试很多创新并且大
胆的技术，当这些技术稳定之后，Chrome 才会把它们集成进来，也就是说 Chrome 的版本会落后于
Chromium；其次，Chrome 还会加入一些私有的编码解码器以支持音视频等；再次，Chrome 还会整合
Google众多的网络服务；最后，Chrome还有自动更新的功能（虽然只是Windows平台），这也是
Chromium 所没有的。    

### 1.1.2 浏览器特性

大体上来讲，浏览器的这些功能包括网络、资源管理、网页浏览、多页面管理、插件和扩展、
书签管理、历史记录管理、设置管理、下载管理、账户和同步、安全机制、隐私管理、外观主题、开发
者工具等。    

+ 网络：它是第一步，浏览器通过网络模块来下载各种各样的资源。
+ 资源管理：从网络下载或者本地获取资源，并将它们管理起来，这需要高效的管理机制。例如如何
避免重复下载资源、缓存资源等，都是它们需要解决的问题。    
+ 多页面管理：很多浏览器支持多页面浏览，所以需要支持多个网页同时加载，这让浏览器变得更为复杂。
+ 插件和扩展：这是现代浏览器的一个重要特征，它们不仅能显示网页，而且能支持各种形式的插件和扩展。
+ 其他的略。   

### 1.1.3 HTML

HTML5包含了一系列的标准，一共包含了10个大的类别，它们分别是离线（offline）、存储（storage）、
连接（connectivity）、文件访问（file  access）、语义（semantics）、音频和视频
（audio/video）、3D和图形（3D/graphics）、展示（presentation）、性能（performance）
和其他（Nuts and bolts）。其中每个大的类别都是由众多技术或者是规范组成。   


类别 | 具体规范
----------|---------
 离线 | Application cache, Local storage, Indexed DB, 在线/离线事件
 存储 | Application cache, Local storage, Indexed DB 等
 连接 | Web Sockets, Server-sent 事件
 文件访问 | File API, File System, FileWriter, ProgressEvents
 语义 | 各种新的元素，包括 Media, structural, 国际化, Link relation 等
 音频和视频 | HTML5 Video, Web Audio, WebRTC, Vider track 等
 3D 和图形 | Canvas 2D, 3D CSS 变换, WebGL, SVG 等
 展示 | CSS 2D/3D 变换，过渡 transition, WebFonts 等
 性能 | Web Worker, HTTP caching 等
 其他 | 触控和鼠标, Shadow DOM, CSS masking 等     

## 1.2 浏览器内核及特性

### 1.2.1 内核和主流内核

在浏览器中，有一个最重要的模块，它主要的作用是将页面转变成可视化（准确讲还要加上可听化）
的图像结果，这就是浏览器内核。通常，它也被称为渲染引擎。所谓的渲染，就是根据描述或者定
义构建数学模型，通过模型生成图像的过程。    

目前，主流的渲染引擎包括 Trident、Gecko 和 WebKit，它们分别是IE、火狐和 Chrome 的内核，
2013年，Google宣布了 Blink 内核，它其实是从 WebKit 复制出去的。   

### 1.2.2 内核特征

根据渲染引擎所提供的渲染网页的功能，一般而言，它需要包含图中所描述的众多功能模块。图中
主要分成三层，最上层使用虚线框住的是渲染引擎所提供的功能。    

![kernel](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/kernel.jpg)   

从图中大致可以看出，一个渲染引擎主要包括HTML解释器、CSS解释器、布局和JavaScript引擎等:   

+ HTML 解释器：解释HTML文本的解释器，主要作用是将HTML文本解释成DOM（文档对象模型）树
+ CSS 解释器：级联样式表的解释器，它的作用是为 DOM 中的各个元素对象计算出样式信息，从而
为计算最后网页的布局提供基础设施
+ 布局：在 DOM 创建之后，Webkit 需要将其中的元素对象同样式信息结合起来，计算它们的大小
位置等布局信息，形成一个能够表示这所有信息的内部表示模型
+ JavaScript 引擎：使用 JavaScript 代码可以修改网页的内容，也能修改 CSS 的信息，
JavaScript引擎能够解释 JavaScript 代码并通过 DOM 接口和 CSSOM 接口来修改网页内容和样式信息，
从而改变渲染的结果
+ 绘图：使用图形库将布局计算后的各个网页的节点绘制成图像结果    

这些模块依赖很多其他的基础模块，这其中包括网络、存储、2D/3D图形、音频视频和图片解码器等。   

在了解了这些主要模块之后，下面介绍这些模块是如何一起工作以完成网页的渲染过程。一般的，
一个典型的渲染过程如图所示，这是渲染引擎的核心过程，一切都是围绕着它来的。    

![kernel-2](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/kernel-2.jpg)   

# 第 2 章 HTML 网页和结构

HTML 网页是利用 HTML 语言编写的文档，它是一种半结构化的数据表现方式。它的结构特征可以
归纳为三种：树状结构、层次结构和框结构。    

## 2.1 网页构成

### 2.1.1 基本元素和树状结构

整个网页可以看成一种树状结构，其树根是“html”，这是网页的根元素（或称节点）。   

## 2.2 网页结构

### 2.2.1 框结构

框结构很早就被引入网页中，它可以用来对网页的布局进行分割，将网页分成几个框。同时，网页
开发者也可以让网页嵌入其他的网页。在HTML的语法中，“frameset”、“frame”和“iframe”可以用来在
当前网页中嵌入新的框结构。   

注意这里框结构指的是嵌套的网页都是在一个独自的框中。    

### 2.2.2 层次结构

网页的层次结构是指网页中的元素可能分布在不同的层次中，就是说某些元素可能不同于它的父元素
所在的层次，因为某些原因，WebKit 需要为该元素和它的子女建立一个新层。    

```html
<!-- 示例代码，不确定能运行 -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    video, div, canvas {
      transform: rotateY(30deg) rotateX(-45deg);
    }
  </style>
</head>
<body>
  <video src="avideo.mp4"></video>
  <div>
    <canvas id="a2d"></canvas>
    <canvas id="a3d"></canvas>
  </div>
  <script>
    var size = 300;

    var a2dCtx = document.getElementById('a2d').getContext('2d');
    a2dCtx.canvas.width = size;
    a2dCtx.canvas.height = size;
    a2dCtx.fillStyle = "rgba(0, 192, 192, 80)";
    a2dCtx.fillRect(0, 0, 200, 200);

    var a3dCtx = document.getElementById('a3d').getContext('webgl');
    a3dCtx.canvas.width = size;
    a3dCtx.canvas.height = size;
    a3dCtx.clearColor(0.0, 192/255, 192/255, 80);
    a3dCtx.clear(a3dCtx.COLOR_BUFFER_BIT);
  </script>
</body>
</html>
```     

下图就是上面代码对应的网页层次结构：    

![html-layer](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/html-layer.png)   

当一个网页构建层次结构的时候，首先是根节点，此时自然地为它创建一个层，这就是“根层”。    

其次是“层1”，它是为元素“video”所创建的层。那为什么“video”元素需要新创建一个层，而不是
使用它的父亲所在的层呢？这是因为“video”元素用来播放视频，为它创建一个新的层可
以更有效地处理视频解码器和浏览器之间的交互和渲染问题。    

“层2” 对应着 div 元素。div 元素要进行 3D 变换，所以也有独自的层。   

“层3” 和 “层4” 对应着两个 canvas 元素，对应着复杂的 2D 和 3D 绘图操作。   

## 2.3 WebKit 的网页渲染过程

根据数据的流向，这里将渲染过程分成三个阶段，第一个阶段是从网页的 URL 到构建完 DOM 树，
第二个阶段是从 DOM 树到构建完 WebKit 的绘图上下文，第三个阶段是从绘图上下文到生成最终的图
像。    

![render-process](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/render-process.png)    

数字表示的是基本顺序，当然也不是严格一致，因为这个过程可能重复并且可能交叉。具体的过程如下：   

1. 当用户输入网页 URL 的时候，WebKit 调用其资源加载器加载该 URL 对应的网页。
2. 加载器依赖网络模块建立连接，发送请求并接收答复。
3. WebKit 接收到各种网页或者资源的数据，其中某些资源可能是同步或异步获取的。
4. 网页被交给 HTML 解释器转变成一系列的词语（Token）。
5. 解释器根据词语构建节点（Node），形成DOM树。
6. 如果节点是 JavaScript 代码的话，调用 JavaScript 引擎解释并执行。
7. JavaScript 代码可能会修改 DOM 树的结构。
8. 如果节点需要依赖其他资源，例如图片、CSS、视频等，调用资源加载器来加载它们，但是它们
是异步的，不会阻碍当前 DOM 树的继续创建；如果是 JavaScript 资源 URL（没有标记异步方
式），则需要停止当前 DOM 树的创建，直到 JavaScript 的资源加载并被 JavaScript 引擎执行
后才继续 DOM 树的创建。    

接下来就是 WebKit 利用 CSS 和 DOM 树构建 RenderObject 树直到绘图上下文，如图所示的过程。    

![render-process-2](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/render-process-2.png)    

这一阶段的具体过程如下：   

1. CSS 文件被 CSS 解释器解释成内部表示结构。
2. CSS 解释器工作完之后，在 DOM 树上附加解释后的样式信息，这就是 RenderObject 树。
3. RenderObject 节点在创建的同时，WebKit 会根据网页的层次结构创建 RenderLayer 树，
同时构建一个虚拟的绘图上下文。其实这中间还有复杂的内部过程，具体在后面专门的章节做详细介绍    

RenderObject 树的建立并不表示 DOM树 会被销毁，事实上，上述图中的四个内部表示结构一直存在，
直到网页被销毁，因为它们对于网页的渲染起了非常大的作用。    

最后就是根据绘图上下文来生成最终的图像，这一过程主要依赖 2D 和 3D 图形库：   

![render-process-3](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/render-process-3.png)    

这一阶段对应的具体过程如下：   

1. 绘图上下文是一个与平台无关的抽象类，它将每个绘图操作桥接到不同的具体实现类，也就是
绘图具体实现类。
2. 绘图实现类也可能有简单的实现，也可能有复杂的实现。在 Chromium 中，它的实现相当复杂，
需要 Chromium 的合成器来完成复杂的多进程和GPU加速机制，这在后面会涉及。
3. 绘图实现类将 2D 图形库或者 3D 图形库绘制的结果保存下来，交给浏览器来同浏览器界面一起显示。    

# 第 3 章 WebKit 架构和模块

## 3.1 WebKit 架构及模块

### 3.1.2 WebKit 架构

WebKit 的一个显著特征就是它支持不同的浏览器，因为不同浏览器的需求不同，所以在 WebKit 中，
一些代码可以共享，但是另外一部分是不同的，这些不同的部分称为 WebKit 的移植（Ports）。今
后笔者也用WebKit的移植指代该移植和依赖的WebKit的共享部分。     

![webkit-arc](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/webkit-arc.png)    

图中的WebKit架构，虚线框表示该部分模块在不同浏览器使用的WebKit内核中的实现是不一样的，
也就是它们不是普遍共享的。用实线框标记的模块表示它们基本上是共享的。    

JavaScriptCore 引擎是 WebKit 中的默认 JavaScript 引擎，也就是说一些 WebKit 的移植
使用该引擎。刚开始，它的性能不是很好，但是随着越来越多的优化被加入，现在的性能已变得非常
不错。之所以说它只是默认的，是因为它不是唯一并且是可替换的。事实上， WebKit 中对
JavaScript 引擎的调用是独立于引擎的。在 Google 的 Chromium 开源项目中，它被替换为 V8 引擎。    

在 WebCore 和 WebKit Ports 之上的层主要是提供嵌入式编程接口，这些嵌入式接口是提供给
浏览器调用的（当然也可以有其他使用者）。图中有左右两个部分分别是狭义 WebKit 的接口和
WebKit2 的接口。因为接口与具体的移植有关，所以有一个与浏览器相关的绑定层。绑定层上面
就是 WebKit 项目对外暴露的接口层。实际上接口层的定义也是与移植密切相关的，而不是 WebKit
有什么统一接口。    

### 3.1.3 WebKit 源代码结构

图显示的是主要的目录结构，包括一级目录和主要的二级目录，其中省去了一些次要目录。   

![source-code-dir](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/source-code-dir.png)    

![source-code-dir-2](https://raw.githubusercontent.com/temple-deng/markdown-images/master/browser/source-code-dir-2.png)    