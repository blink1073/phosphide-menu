/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IExtension, IExtensionPoint
} from 'phosphide';

import {
  IDisposable, DisposableDelegate
} from 'phosphor-disposable';

import {
  Menu, MenuBar, MenuItem
} from 'phosphor-menus';

import {
  attachWidget
} from 'phosphor-widget';


import './index.css';

var MENU_BAR_TEMPLATE = [
  {
    text: 'File',
    submenu: [
      {
        text: 'Demo',
        shortcut: 'Ctrl+D'
      }
    ]
  },
  {
    text: 'Edit',
    submenu: [
      {
        text: 'Undo'
      }
    ]
  }
];


/**
 * Menu Extension Point
 */
export
class MainMenuExtensionPoint { // Structurally implements IExtensionPoint
  constructor(id: string) {
    this.id = id;
    this._menuBar = MenuBar.fromTemplate(MENU_BAR_TEMPLATE);
    attachWidget(this._menuBar, document.body);
  }

  extend(item: any): IDisposable {
    this._menuBar.children.push(item.menu); // TODO

    return; // TODO
  }

  id: string;
  private _menuBar: MenuBar;
}


/**
 *
 */
export
class MenuPlugin { // Structurally implements IPlugin
  constructor(id: string) {
    this.id = id;
    this._menuExtensionPoint = new MainMenuExtensionPoint('menu.main');
  }

  extensionPoints(): IExtensionPoint[] {
    return [this._menuExtensionPoint];
  }

  extensions(): IExtension[] {
    return [];
  }

  load(): IDisposable {
    console.log('Loading menu plugin');
    return;
  }

  unload(): void {
    console.log('Unloading menu plugin');
  }

  id: string;
  private _menuExtensionPoint: IExtensionPoint;
}

