let app = getApp()
Page({

  data: {},

  // 初始化页面显示正在加载（因为需要异步加载用户信息）
  onLoad() {
    my.showLoading({
      content: '正在加载...',
    });
  },

  // 显示指定当前用户的图片列表
  onShow() {
    basement.user.getInfo().then(res => {
      if (res.success) {
        const user = res.result;
        console.log('res',res)
        this.setData({ user });
        this._getMenus();
        my.hideLoading();
      }
      //小程序自定义埋点用法，详见 https://docs.alipay.com/mini/api/report
      my.reportAnalytics('miniDemo', {
        demoName: 'gallery-basement',
        res: res
      });
    }).catch(console.error);
  },

  // 获取特定用户的图片列表
  _getMenus() {
    basement.db.collection('menus')
      .find({ mac: app.globalData.mac }, { sort: { uploadTime: -1 } })
      .then(({ result: menus }) => {
        console.log('menus',menus)
        menus.map((item) => {
          // item.uploadTime = new Date(item.uploadTime).toDateString();
          return item;
        })
        const noMenus = menus && menus.length === 0 ? true : false;
        this.setData({ menus, noMenus });
      })
      .catch(console.error);
  },

  // 预览图片
  preview(e) {
    const dataset = e.target.dataset;
    my.previewImage({
      current: 0,
      urls: [
        dataset.imageUrl,
      ],
    });
  },

  // 变更图片名称的事件处理
  rename(e) {
    const dataset = e.target.dataset;

    my.prompt({
      title: '修改名称',
      message: '请输入新的菜单名称：',
      placeholder: '',
      okButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.ok) {
          basement.db.collection('menus').updateOne(
            { _id: dataset.itemId },
            {
              $set: {
                ch_name: result.inputValue,
              }
            }
          ).then(() => {
            this._getMenus();
          }).catch(console.error);
        }
      },
    });
  },

  // 删除图片的事件处理
  delete(e) {
    const dataset = e.target.dataset;

    // 确认和删除图片
    my.confirm({
      title: '删除图片',
      content: '是否确认删除该图片?',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          basement.db.collection('menus').deleteOne({
            '_id': dataset.itemId,
            'mac': app.globalData.mac,
          }).then(() => {
            // 刷新任务列表
            this._getMenus();
          }).catch(console.error);
        }
      },
    });
  },

  // 前往添加新的图片
  add() {
    my.navigateTo({ url: '/pages/add-image/add-image' });
  },

  // 前往查看个人信息
  showMe() {
    my.navigateTo({ url: '../me/me' });
  }
});
