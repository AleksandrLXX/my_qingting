let app = getApp()
Page({

  data: {
   ch_name:'',
   url:'',
   en_name:'',
  },

  onBlur(e) {
    let {id} = e.target.dataset
    this.setData({
      [id]: e.detail.value,
    });
  },

  // 将新的图片内容添加到当前用户的图片列表中
  add() {
    let mac = app.globalData.mac;
    let {ch_name,url,en_name,imageUrl} = this.data
    // 如果图片名称没有填，或者没有上传图片，则进行提示
    if (!this.data.ch_name || !this.data.url || !this.data.en_name || !this.data.imageUrl) {
      my.alert({
        title: '添加失败',
        content: '请确认所有项目都已填上',
        buttonText: '我知道了',
      });

      // 正常情况，写入数据存储
    } else {
          basement.db.collection('menus').insertOne({
            mac,
            ch_name,
            en_name,
            imageUrl,
            url
          }).then(() => {
            my.navigateBack();
          }).catch(console.error);
        }
     
  },

  // 选择并上传图片，获得图片 URL
  attach() {
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const path = res.apFilePaths[0];
        const options = {
          filePath: path,
          headers: {
            contentDisposition: 'attachment',
          },
        };
        basement.file.uploadFile(options).then((image) => {
          this.setData({
            imageUrl: image.fileUrl,
          });
        }).catch(console.error);
      },
    });
  },
});
