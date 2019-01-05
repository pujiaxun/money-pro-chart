# Money Pro Chart

Money Pro 账单可视化图表。

## Getting Started

1. 安装依赖
    ```bash
    cd money-pro-chart
    npm i
    ```
1. 导出 Money Pro 数据

    Reports->Transactions->(Filter Icon->Export Type->CSV)->Share Icon

    **注意：** 目前仅支持解析**英文语言**的导出文件。
1. 将导出的文件移动到 `server/seeds` 文件夹，并重命名为`bills.csv`
1. 运行项目并打开浏览器访问 <localhost:{PORT}>
    ```
    npm run start
    ```

## 已知问题

- 所有的`类别/子类别`**都不能包含空格和英文冒号**（例如`公交 地铁`）。这会导致解析出错误的结果。而且我也还没想到有什么好办法规避这个问题，毕竟Money Pro能导出的CSV文件很简陋。
