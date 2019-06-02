let app = getApp()
Page({
  data: {},
  onLoad() {
    this._getMenus()
  },
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
});
