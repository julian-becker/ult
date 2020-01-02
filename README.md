# ULT · The Ultimate Dev Stack

<a alt="ULT Website" href="https://ult.dev">
  <img align="right" width="373" src="https://raw.githubusercontent.com/kat-tax/ult/master/_layouts/banner.png">
</a>

#### Cross-platform development with a single code base!

To create a new project, run `npx ult [project]` 

After everything installs, use `npm run [task]`

*For more details, visit the [documentation](https://docs.ult.dev)*


| Task          | Description                                         |
| --------------| --------------------------------------------------- |
| web           | Start Web Development                               |
| android       | Start Android Development                           |
| ios           | Start iOS Development                               |
| macos         | Start MacOS Development                             |
| windows       | Start Windows Development                           |
| build         | Build Production Web Bundle                         |
| test          | Run Unit Tests                                      |
| analyze       | Analyze Web Bundle                                  |

### Stack

- [TypeScript](https://www.typescriptlang.org/) *(Language)*
- [React](https://reactjs.org/) *(View Abstraction)*
- [Redux](https://redux.js.org/) *(State Management)*
- [React Native](https://facebook.github.io/react-native/) *(iOS & Android Support)*
- [React Native Windows](https://github.com/Microsoft/react-native-windows) *(Windows Support)*
- [Webpack](https://webpack.js.org/) *(Web Bundler)*
- [Metro](https://facebook.github.io/metro/) *(Native Bundler)*

### Community

Join our [Discord](https://discord.gg/TzhDRyj)!

### Sponsors

Help ULT's development by [sponsoring me](https://github.com/sponsors/Cavitt)!

### FAQ

<details>
  <summary>Why choose React over XYZ?</summary>
  <ul>
    <li>Most other options are specific to the web.</li>
    <li>Flutter doesn't support desktop, and while the code is native, it only emulates native UI.</li>
    <li>No other framework lets us natively target desktop and mobile, while maintaining web support.</li>
  </ul>
</details>
<details>
  <summary>Why choose Redux over XYZ?</summary>
  <ul>
    <li>A leading problem people seem to have is the <em>boilerplate</em>, which has been reduced down as much as possible.</li>
    <li>It's simple, intuitive, allows hot-reloading, time-traveling, and of course supports <a href="https://github.com/reduxjs/redux-devtools" rel="nofollow">redux-devtools</a>!</li>
    <li>It's necessary to be able to snapshot the state of the app.</li>
    <li>If you love Observables, this project is not for you.</li>
  </ul>
</details>
