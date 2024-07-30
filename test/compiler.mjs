import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// from https://webpack.js.org/contribute/writing-a-loader/#testing
export default (fixture, options = {}) => {
  const compiler = webpack({
    context: dirname,
    entry: `./${fixture}`,
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /manifest\.json$/,
          use: {
            loader: path.resolve(dirname, '../index.mjs'),
            options,
          },
        },
      ],
    },
    output: {
        publicPath: '/some-publicpath/',
        assetModuleFilename: '[name]-processed[ext][query]',
    }
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      else if (stats.hasErrors()) reject(stats.toJson().errors);
      else resolve(stats);
    });
  });
};
