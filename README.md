# 使用方法
如果需要代理，可以使用这个[onedrive链接下载clash汉化版](https://p74h-my.sharepoint.com/:u:/g/personal/minddance_p74h_onmicrosoft_com/ETlh6wlF3QVHtXjAh-7TxIIBXQRWEVZFze7QXjQy-feEOw?e=MgBe8u)

## 如何提交代码？
使用git连接仓库，首先`git init`在目标位置初始化仓库。如果第一次使用git还需要设置用户名和邮箱
```
git config --global user.email "your email"
git config --global user.name "your name"
```
连接本仓库使用命令如下
```
git add origin https://github.com/mind-dance/h5.git
git pull origin main
```
需要在git终端设置代理。
我使用的是HTTPS连接，ssh连接请自行寻找方法。
例如clash开启局域网代理后，混合代理端口为7890。则我的命令如下
```
git config --global https.proxy=https://127.0.0.1:7890
```

仅对github设置代理（socks5）
```
git config --global http.https://github.com.proxy socks5://127.0.0.1:7890
```

若需要取消代理则使用
```
git config --global --unset https.proxy
```
