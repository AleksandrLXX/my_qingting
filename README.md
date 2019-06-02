## 概述

本示例演示如何使用 Basement 后端云服务来编写一个图片画廊（列表）小程序，功能涵盖云函数、数据存储和文件存储等 Basement 提供的服务。

## 环境准备

* Nodejs 10 或以上版本

## 使用步骤
  
1. 点击左侧面板开通云服务
2. 预览小程序：刷新预览，可以读取初始信息并且可以正常操作使用，可以认为我们已经将小程序跑起来了。
    ![截图](https://cdn.nlark.com/yuque/0/2018/png/84303/1536985350442-fc2f8bf3-7b17-4ea5-95aa-5b8dc7182435.png)

3. 调用服务：`basement` 是 Basement 服务的全局对象，内置在小程序中，可以直接调用对应服务实现程序功能。在本示例的小程序中，可以找到以下服务调用的对应处理。
    * 云函数：`basement.function`
    * 数据存储：`basement.db`
    * 文件存储：`basement.file`

## 资源

1. Basement 后端云服务相关信息，[请点击这里](https://docs.alipay.com/mini/cloud-service/qz65ug)
