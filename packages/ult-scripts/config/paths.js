const fs = require('fs');
const url = require('url');
const path = require('path');
const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json'];
const envPublicUrl = process.env.PUBLIC_URL;
const appDirectory = fs.realpathSync(process.cwd());
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);
const resolveModule = (resolve, path) => {
  const extension = moduleFileExtensions.find(ext => fs.existsSync(resolve(`${path}.${ext}`)));
  if (extension) return resolve(`${path}.${extension}`);
  return resolve(`${path}.js`);
};

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

// We use `PUBLIC_URL` variable or "homepage" field to infer "public path"
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // this is empty on npm 3
  appTypeDeclarations: resolveApp('src/ult-app-env.d.ts'),
  ownTypeDeclarations: resolveOwn('lib/ult-app.d.ts'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
