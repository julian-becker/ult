/*
* This file provides a test framework for ULT.
*/

import _ = require('lodash');
import Ult = require('react-ult');
import {TestContainer} from './TestContainer';
import {TestListView} from './TestListView';
import TestRegistry from './TestRegistry';

interface AppState {
  selectedTest: string;
  runAll: boolean;
}

class App extends Ult.Component<Ult.CommonProps, AppState> {
  constructor(props: Ult.CommonProps) {
    super(props);
    this.state = {
      selectedTest: '',
      runAll: false
    };
  }

  render(): Ult.Types.ReactNode {
    if (this.state.selectedTest) {
      return (
        <TestContainer
          key={this.state.selectedTest}
          test={this.state.selectedTest}
          prevResult={TestRegistry.getResult(this.state.selectedTest)}
          autoRun={this.state.runAll}
          onBack={this._onBack}
        />
      );
    } else {
      return (
        <TestListView
          onSelectTest={this._onSelectTest}
          onRunAll={this._onRunAll}
        />
      );
    }
  }

  private _onBack = () => {
    if (this.state.runAll) {
      let testPaths = _.keys(TestRegistry.getAllTests());
      let curTestIndex = _.indexOf(testPaths, this.state.selectedTest);

      // If there are more tests to run, move on to the next one.
      if (curTestIndex + 1 < testPaths.length) {
        console.log('state selectedTest moving to: ', testPaths[curTestIndex + 1]);
        this.setState({selectedTest: testPaths[curTestIndex + 1]});
        return;
      }
    }

    // Clear the selected test.
    this.setState({runAll: false, selectedTest: ''});
  }

  private _onSelectTest = (path: string) => {
    this.setState({selectedTest: path});
  }

  private _onRunAll = () => {
    let firstTest = _.first(_.keys(TestRegistry.getAllTests()));
    this.setState({runAll: true, selectedTest: firstTest || ''});
  }
}

export = App;
