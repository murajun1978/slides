---

# React hands-on
## Babel && Webpack

---

# Goal

## Babel と Webpac を
## ゆる〜く理解する

---

# Babel

http://babeljs.io/

---

# ES2015(ES6)

http://babeljs.io/learn-es2015/

---

## Arrow (=>)

```javascript
[1, 2, 3].map((n, i) => n + i )
#=> [1, 3, 5]

const fnc = (props) => {
  const { num } = props;
}
```

---

## Class

```javascript
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this._name = 'murajun1978';
  }

  render() {
    return (
      <h1>My name is {this._name}.</h1>
    );
  }
}
```

---

## ES2015を
## トランスパイルするための
## トランスパイラ

---

# Packages

---

## babel-core

### babelがtransformする為のcoreなplugin

http://babeljs.io/docs/core-packages/#core

---

## babel-polyfill

http://babeljs.io/docs/usage/polyfill/

### 古いブラウザが
### ES2015の標準オブジェクトに
### 対応できるように拡張してくれる

---

# Plugins

---

## Presets

### ライブラリなどの独自のpluginセット
* env（これ便利だよ)
* es2015
* react
* flow

---

## Stage-X

### Stage-0 〜 Stage-4
### Stage-4ではれて正式採用

---

## babel-loader

### BabelをWebpack使うためのplugin

https://github.com/babel/babel-loader

---

# .babelrc

http://babeljs.io/docs/usage/babelrc/

---

## plugin/presetやoptionを追記
```json
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
```

---

# babel-register

http://babeljs.io/docs/usage/babel-register/

---

## ES2015をトランスパイルできる
```javascript
// base.js
require("babel-register");
require('./app');

// app.js
const fnc = (props) => {
  ...
}
```

### テストコードをES2015で書いて
### テストフレームワークがES2015に
### 対応してないときに使ったり

---

# Webpack

https://webpack.js.org/

---

## assetを生成するビルドツール
### Sprocketsみたいやつ
### JavaScript, TypeScript, CSS, Image file

---

## webpack.config.js
### webpackの設定ファイル

---

## Entry Points
https://webpack.js.org/concepts/entry-points/

```javascript
// webpack.config.js
const config = {
  entry: {
    home: './app/home/index.js',
    order: './app/order/index.js',
    vendor: [
      'react',
      'react-dom',
    ],
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    ]
  }
};
module.exports = config;
```

---

## Output
https://webpack.js.org/concepts/output/

```javascript
// webpack.config.js
const { resolve } = require('path');
const config = {
  ...,
  output: {
    filename: 'bundle-[name].js',
    path: resolve(__dirname, 'dist'),
  }
};
module.exports = config;
```

#### `[hash]` , `[chunkhash]` などのオプションもある

---

## Loaders
https://webpack.js.org/concepts/loaders/

### CSSやTypeScripなどのModuleをrequire！
### CSS Modules

```javascript
// webpack.config.js
const config = {
  ...,
  module: {
    rules: [
      {test: /\.css$/, use: 'css-loader'},
      {test: /\.ts$/, use: 'ts-loader'}
    ]
  }
};
module.exports = config;
```

---

## Plugins
https://webpack.js.org/concepts/plugins/

```javascript
// webpack.config.js
const { resolve } = require('path');
const config = {
  ...,
  output: {
    filename: 'bundle-[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
module.exports = config;
```

---

## Targets
https://webpack.js.org/concepts/targets/

### Node.js(Server side)用にビルド

```javascript
// webpack.config.js
const config = {
  ...,
  target: 'node',
};
module.exports = config;
```

### target list
https://webpack.js.org/configuration/target/

---

## Hot Module Replacement
https://webpack.js.org/concepts/hot-module-replacement/

### ページリロードなしで
### Moduleの更新、追加、削除が可能

```javascript
// .babelrc
{
  "presets": [
    ["es2015", {"modules": false}],
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}

// webpack.config.js
const { resolve } = require('path');
const config = {
  ...,
  output: {
    filename: 'bundle-[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
};
module.exports = config;
```

---

## inline-source-map

### ビルド前のコードをブラウザで確認できる
```javascript
const config = {
  ...,
  devtool: 'inline-source-map',
};
module.exports = config;
```

---

## PostCSS
http://postcss.org/

### JavaScriptで書いたプラグインで
### CSSをトランスパイル

### Plugins
https://github.com/postcss/postcss/blob/master/docs/plugins.md

---

## まとめ

* ザックリとは把握してて欲しい
* けど、あまり詳しくなる必要はない
* ハマったり時間もったいないから [create-react-app](https://github.com/facebookincubator/create-react-app) とかで

---

## Thank you :smile:

---
