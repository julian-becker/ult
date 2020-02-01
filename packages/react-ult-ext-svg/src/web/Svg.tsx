﻿/*
 * Svg.tsx
 *
 * Web-specific implementation of the cross-platform abstraction for
 * SVG (scalable vector graphics) images.
 */

import * as React from 'react';
import {Styles as UltStyles} from 'react-ult';
import assert from '../common/assert';
import {SvgProps} from '../common/Types';

export class Svg extends React.Component<SvgProps, {}> {
  render() {
    assert(
      this.props.width && this.props.height,
      'The width and height on svg are mandatory.'
    );

    if (this.props.width > 0 && this.props.height > 0) {
      let combinedStyles = UltStyles.combine([{
        display: 'flex',
        position: 'relative'
      } as any, this.props.style]) as any;
      if (this.props.fillColor !== undefined)
        combinedStyles.fill = this.props.fillColor;
      if (this.props.fillOpacity !== undefined)
        combinedStyles.fillOpacity = this.props.fillOpacity.toString();
      if (this.props.strokeColor !== undefined)
        combinedStyles.stroke = this.props.strokeColor;
      if (this.props.strokeOpacity !== undefined)
        combinedStyles.strokeOpacity = this.props.strokeOpacity.toString();
      if (this.props.strokeWidth !== undefined)
        combinedStyles.strokeWidth = this.props.strokeWidth.toString();
      if (combinedStyles.flex === undefined)
        combinedStyles.flex = '0 0 auto';
      if (combinedStyles.overflow === undefined)
        combinedStyles.overflow = 'hidden';
      if (this.props.webShadow) {
        let aliases = UltStyles.getCssPropertyAliasesCssStyle();
        if (this._isFilterDropShadowSupported()) {
          let filterAlias = aliases['filter'] || 'filter';
          combinedStyles[filterAlias] = 'drop-shadow(' + this.props.webShadow + ')';
        }
      }

      return (
        <svg
          viewBox={this.props.viewBox}
          style={combinedStyles}
          height={this.props.height}
          width={this.props.width}>
          {this.props.children}
        </svg>
      );
    } else {
      return null;
    }
  }

  private _isFilterDropShadowSupported() {
    // Edge (actually, Windows 10) contains a bug where it renders this incorrectly.
    // We'll disable it specifically on Edge browsers for now.
    // Safari also has a bug where it renders this incorrectly (transparent background),
    // so we'll disable it there also.
    // For now, enable it in Chrome only.
    let isChrome = window.hasOwnProperty('chrome');
    // The latest versions of Edge implement the "chrome" global variable (presumably
    // for compatibility with Chrome browser), so we need to do one more check
    // to make sure it's really chrome.
    if (isChrome && navigator.appName === 'Netscape' && navigator.appVersion.indexOf('Edge') >= 0) {
      isChrome = false;
    }
    return isChrome;
  }
}

export default Svg;