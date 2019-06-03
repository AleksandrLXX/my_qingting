let app = getApp()
Page({
  data: {
    org: {}
  },
  onLoad() {
    my.showLoading({
      content: '正在加载...',
    });
    this._getMenus()
  },
  _getMenus() {
    basement.db.collection('orgs')
      .findOne({ mac: app.globalData.mac })
      .then(({ result: org }) => {
          
        console.log('org', org)
        this.setData({ org });
        my.hideLoading({
        });
      })
      .catch(console.error);
    basement.db.collection('menus')
      .find({ mac: app.globalData.mac }, { sort: { uploadTime: -1 } })
      .then(({ result: menus }) => {
        console.log('menus', menus)
        menus.map((item) => {
          // item.uploadTime = new Date(item.uploadTime).toDateString();
          return item;
        })
        const noMenus = menus && menus.length === 0 ? true : false;
        this.setData({ menus, noMenus });
      })
      .catch(console.error);
  },
});
