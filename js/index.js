;(function () {
  // 已有图片
  var existImgs = [
    './img/0.jpg',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './img/11.jpg',
    './img/12.jpg',
    './img/13.jpg',
    './img/14.jpg',
    './img/15.jpg',
    './img/16.jpg',
    './img/17.jpg',
    './img/18.jpg',
    './img/19.jpg',
    './img/20.jpg',
    './img/21.jpg',
    './img/22.jpg',
    './img/23.jpg',
    './img/24.jpg',
    './img/25.jpg',
    './img/26.jpg',
    './img/27.jpg',
    './img/28.jpg',
    './img/29.jpg',
    './img/30.jpg',
    './img/31.jpg',
    './img/32.jpg',
    './img/33.jpg',
    './img/34.jpg',
    './img/35.jpg',
    './img/36.jpg',
    './img/37.jpg',
    './img/38.jpg',
    './img/39.jpg',
    './img/40.jpg'
  ]
  // 单个图片宽度
  var imgWidth = 220
  // 布局信息对象
  var layoutConfig
  // 需要操作的DOM元素
  var container = document.querySelector('.container')
  // 初始化函数
  var init = function () {
    // 计算布局，初始化布局信息对象
    layoutConfig = calculateLayout()
    // 初始化已有图片
    addImgsToContainer(layoutConfig, existImgs)
  }

  // 定义根据窗口尺寸进行计算布局函数
  function calculateLayout() {
    // 清空容器
    container.innerHTML = ''
    // 容器宽度
    var containerWidth = document.body.clientWidth * 0.9
    containerWidth = containerWidth > imgWidth ? containerWidth : imgWidth
    // 计算一行的图片数量和空隙大小
    var length = Math.floor(containerWidth / imgWidth)
    var gapSize = (containerWidth % imgWidth) / (length + 1)

    // 初始化高度数组
    var heights = []
    for (var i = 0; i < length; i++) {
      heights[i] = 0
    }
    // 返回布局信息对象
    return { heights, gapSize }
  }
  // 定义根据布局信息插入图片的函数
  /**
   * 根据布局信息插入图片的函数
   * @param {Array} heights
   * @param {number} gapSize
   * @param {Array} imgs
   */
  function addImgsToContainer({ heights, gapSize }, imgs) {
    // 定义根据位置计算图片横向距离函数
    function _getPositionLeft(index) {
      return index * (imgWidth + gapSize) + gapSize
    }
    // 遍历imgs并创建图片对象(可优化，若不是新图片就无需重新创建并加载)
    for (var i = 0; i < imgs.length; i++) {
      var img = document.createElement('img')
      img.src = imgs[i]
      img.style.width = imgWidth + 'px'
      img.style.transition = 'all 0.3s linear'
      img.style.left = container.clientWidth / 2 - imgWidth / 2 + 'px'
      img.style.top = window.scrollY + 'px'
      // 监听图片加载情况(图片加载成功才能获取高度)
      ;(function (i) {
        img.addEventListener('load', function (e) {
          // 插入图片并更新已存在图片
          container.appendChild(this)
          if (existImgs.indexOf(imgs[i]) === -1) {
            existImgs.push(imgs[i])
          }
          // 强制reflow以触发transition过渡效果
          this.clientWidth
          // 根据高度数组中的最小值索引确定该图片插入位置
          var index = heights.indexOf(Math.min.apply(null, heights))
          this.style.top = heights[index] + 'px'
          this.style.left = _getPositionLeft(index) + 'px'

          // 更新高度数组
          
          heights[index] += this.clientHeight + gapSize
          // 使容器高度等于高度数组最大值
          container.style.height = Math.max.apply(null, heights) - gapSize + 'px'
        })
        img.addEventListener('error', function (e) {})
      })(i)
    }
  }
  // 从服务器获取新图片向已布局好的容器中添加图片并更新已有图片数组的函数
  function updateNewImgs() {
    // 从服务器获取的新图片
    var newImgs = [
      './img/0.jpg',
      './img/1.jpg',
      './img/2.jpg',
      './img/3.jpg',
      './img/4.jpg',
      './img/5.jpg',
      './img/6.jpg',
      './img/7.jpg',
      './img/8.jpg',
      './img/9.jpg',
      './img/10.jpg',
      './img/11.jpg',
      './img/12.jpg',
      './img/13.jpg',
      './img/14.jpg',
      './img/15.jpg',
      './img/16.jpg',
      './img/17.jpg',
      './img/18.jpg',
      './img/19.jpg',
      './img/20.jpg'
    ]
    // 加入新图片
    addImgsToContainer(layoutConfig, newImgs)
  }
  // 定义防抖函数
  function debounce(fn, duration) {
    var timer
    return function () {
      var curThis = this
      var curArgs = Array.prototype.slice.call(arguments)
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        fn.apply(curThis, curArgs)
      }, duration)
    }
  }
  init()
  // 为window添加resize事件
  window.addEventListener('resize', debounce(init, 500))
  // 滚动更新事件函数
  function scrollUpdate(e) {
    if (this.scrollY >= document.documentElement.offsetHeight - window.innerHeight - 20) {
      updateNewImgs()
    }
  }
  // 为window添加scroll事件
  window.addEventListener('scroll', debounce(scrollUpdate, 500))
})()
