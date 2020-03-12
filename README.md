# ULT · The Ultimate Dev Stack

<a alt="ULT Website" href="https://ult.dev">
  <img align="right" width="373" src="https://raw.githubusercontent.com/kat-tax/ult/master/_layouts/banner.png">
</a>

#### Cross-platform development with a single code base!

To create a new project, run `npx ult [project]` 

After everything installs, use `npm run [task]`

*For more details, visit the [documentation](https://docs.ult.dev)*

*If you have questions, [create an issue](https://github.com/kat-tax/ult/issues/new/choose)*


| Task          | Description                                         |
| --------------| --------------------------------------------------- |
| web           | Start the Web development server                    |
| android       | Start the Android development server                |
| ios           | Start the iOS development server                    |
| macos         | Start the MacOS development server                  |
| windows       | Start the Windows development server                |
| build         | Build a production Web bundle                       |
| build-android | Build a production Android app                      |
| build-ios     | Build a production iOS app                          |
| build-macos   | Build a production MacOS app                        |
| build-windows | Build a production Windows executable               |

### Features
- Native cross-platform UI
- Flexible architecture
- Great accessibility
- Small bundle size
- Typed styles
- Animations
- Extensions
- Components
  - [View](https://docs.ult.dev/components/view) (container for other components)
  - [Scroll](https://docs.ult.dev/components/scroll-view) (container that supports scrolling off-screen content)
  - [Gesture](https://docs.ult.dev/components/gesture-view) (container with advanced gesture support)
  - [Button](https://docs.ult.dev/components/button) (container with advanced input support)
  - [Text](https://docs.ult.dev/components/text) (displays basic text)
  - [TextInput](https://docs.ult.dev/components/text-input) (a single and multi-line text input)
  - [Link](https://docs.ult.dev/components/link) (displays a hyperlink)
  - [Picker](https://docs.ult.dev/components/picker) (a control that allows the user to pick from a list)
  - [Spinner](https://docs.ult.dev/components/spinner) (displays an animated “spinner”)
  - [Image](https://docs.ult.dev/components/image) (displays a local or remote image)
  - [SVG](https://docs.ult.dev/components/svg) (displays scalable vector graphics)
  - [Video](https://docs.ult.dev/components/video) (cross-platform video player with playback controls)
  - [WebView](https://docs.ult.dev/components/web-view) (displays HTML contents in an embedded browser or iframe)
  - [Virtualize](https://docs.ult.dev/components/virtual-view) (performant scrolling for a large number of items in a list)
- Services
  - [App](https://docs.ult.dev/services/app)
  - [Platform](https://docs.ult.dev/services/platform)
  - [International](https://docs.ult.dev/services/international)
  - [Accessibility](https://docs.ult.dev/services/accessibility)
  - [Clipboard](https://docs.ult.dev/services/clipboard)
  - [Storage](https://docs.ult.dev/services/storage)
  - [Location](https://docs.ult.dev/services/location)
  - [Linking](https://docs.ult.dev/services/linking)
  - [Alert](https://docs.ult.dev/services/alert)
  - [Modal](https://docs.ult.dev/services/modal)
  - [Popup](https://docs.ult.dev/services/popup)
  - [StatusBar](https://docs.ult.dev/services/status-bar)
  - [UserInput](https://docs.ult.dev/services/user-input)
  - [UserInterface](https://docs.ult.dev/services/user-interface)
  - [UserPresence](https://docs.ult.dev/services/user-presence)
  - [Network](https://docs.ult.dev/services/network)
  - [Navigator](https://docs.ult.dev/services/navigator)

### Technologies

- [TypeScript](https://www.typescriptlang.org/) *(Language)*
- [Webpack](https://webpack.js.org/) *(Web Bundler)*
- [Metro](https://facebook.github.io/metro/) *(Native Bundler)*
- [React](https://reactjs.org/) *(View Abstraction)*
- Bring your own state library!
  - [Redux](https://redux.js.org/)
  - [MobX](https://mobx.js.org/)
  - [XState](https://xstate.js.org/)

### Community

Join the discussion in [Discord](https://discord.gg/TzhDRyj)!

### Sponsors

Fund development by being a [Sponsor](https://github.com/sponsors/Cavitt)!

### FAQ

<details>
  <summary>Why choose React over XYZ?</summary>
  <ul>
    <li>Most other options are specific to the web.</li>
    <li>Flutter doesn't support desktop, and while the code is native, it only emulates native UI.</li>
    <li>No other framework lets us natively target desktop and mobile, while maintaining web support.</li>
  </ul>
</details>
