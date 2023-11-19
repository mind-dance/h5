# 使用方法
## 如何提交代码？
使用git连接仓库
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
