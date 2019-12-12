import { Button, ControlGroup } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';

import { AppState } from '../state';
import { AddressBar } from './commands-address-bar';
import { BisectHandler } from './commands-bisect';
import { EditorDropdown } from './commands-editors';
import { ElectronVersionChooser } from './commands-electron-chooser';
import { NodeVersionChooser } from './commands-node-chooser';
import { PublishButton } from './commands-publish-button';
import { Runner } from './commands-runner';

export interface CommandsProps {
  appState: AppState;
}

/**
 * The command bar, containing all the buttons doing
 * all the things
 *
 * @class Commands
 * @extends {React.Component<CommandsProps, {}>}
 */
@observer
export class Commands extends React.Component<CommandsProps, {}> {
  constructor(props: CommandsProps) {
    super(props);
  }

  public render() {
    const { appState } = this.props;
    const { isBisectCommandShowing: isBisectCommandShowing } = appState;

    return (
      <div className='commands'>
        <div>
          <ControlGroup fill={true} vertical={false}>
            {this.getVersionChooser()}
            <Runner appState={appState} />
          </ControlGroup>
          {
            // tslint:disable-next-line jsx-no-multiline-js
            isBisectCommandShowing &&
            (
              <ControlGroup fill={true} vertical={false}>
                <BisectHandler appState={appState} />
              </ControlGroup>
            )
          }
          <ControlGroup fill={true} vertical={false}>
            <Button
              active={appState.isConsoleShowing}
              icon='console'
              text='Console'
              onClick={appState.toggleConsole}
            />
            <Button
              active={appState.isNodeMode}
              icon='ninja'
              text='Node.js Mode'
              onClick={appState.toggleNodeMode}
            />
            <EditorDropdown appState={appState} />
          </ControlGroup>
        </div>
        <div>
          <AddressBar appState={appState} />
          <PublishButton appState={appState} />
        </div>
      </div>
    );
  }

  public getVersionChooser() {
    const { appState } = this.props;

    if (appState.isNodeMode) {
      return <NodeVersionChooser appState={appState} />;
    } else {
      return <ElectronVersionChooser appState={appState} />;
    }
  }
}
