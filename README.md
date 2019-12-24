# Money Pro Chart

Visualization for datas exported from Money Pro.

## Getting Started

1. Install the dependencies.
    ```bash
    cd money-pro-chart
    npm i
    ```
1. Export Money Pro datas.

    Reports->Transactions->(Filter Icon->Export Type->CSV)->Share Icon

    **Attention:** Only support **English** for parsing.
1. Move the exported file to `server/seeds` folder and rename it as `bills.csv`.
1. Run this program and open the browser to visit <localhost:{PORT}>
    ```
    npm run start
    ```

## Known Issues

- **All categories/sub-categories cannot include `:` and ` ` inside** (e.g. `Bus & Subway`). It may cause the wrong parsing results. And I haven't found any ways to avoid this because of the poor csv file.


## Attention

Parsing CSV from Money Pro is so boring. Thus I abandoned this project, and created a tool which can migrate datas from Money Pro to MoneyWiz3. See [MoneyPro2Wiz](https://github.com/pujiaxun/money-pro-to-wiz)
