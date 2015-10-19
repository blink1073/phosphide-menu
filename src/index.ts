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

export * from './constraints';
export * from './menuiteminterface';
export * from './menumanagerinterface';
export * from './menusolver';
export * from './menusolverfunctions';


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
 * The interface required for a menu item.
 */
export
interface IMenuExtension {
  pointName: string;
  item: MenuItem;
}

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

  extend(item: IMenuExtension): IDisposable {
    console.log('Adding item to menu via extension point...');
    var items = this._menuBar.items.map( x => x );
    items.push(item.item); // TODO - improve variable names
    this._menuBar.items = items; 

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

  isRuntimeLoaded(): boolean {
    return true;
  }

  id: string;
  private _menuExtensionPoint: IExtensionPoint;
}

