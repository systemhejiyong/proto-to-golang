# proto-to-golang

**前置要求:**
gopath中需要先安装protoc相关工具
![Alt text](https://osspublic.iot-aithings.com/public/plugin/img4.png)


**当前激活的proto文件生成go代码**
![img1](https://osspublic.iot-aithings.com/public/plugin/img1.png)

**目录结构:**
目前支持将gen/xxx/下的proto文件生成到protosService中
目前支持将ext/下的proto文件生成到protosService中
![Alt text](https://osspublic.iot-aithings.com/public/plugin/img2.png)

**生成后的文件需要手动去除 _ "/api"的导入**
![Alt text](https://osspublic.iot-aithings.com/public/plugin/img3.png)