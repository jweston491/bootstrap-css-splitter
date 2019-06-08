const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function requireAll(r) { r.keys().forEach(r); }

module.exports = {
  mode: 'development',
  entry: ['./src/index.js', ...glob.sync('./node_modules/bootstrap/scss/_*.scss')],
  plugins: [     
    new CleanWebpackPlugin()
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        //Sass
        test: /\.(scss)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    regExp: /([a-z0-9]+)\.scss$/,
                    name: 'css/[1].css',
                }

            },
            {
                loader: 'extract-loader'
            },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
            options: {
              data: '@import "functions"; @import "variables"; @import "mixins";',
              includePaths: [
                './node_modules/bootstrap/scss/**'
              ]
            }
          }
        ]
      }
    ]
  }
};
