/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  ICommandMenuItem
} from './menuiteminterface';

import {
  IMenuManager
} from './menumanagerinterface'

import {
  MenuSolver
} from './menusolver';

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
  Signal, ISignal
} from 'phosphor-signaling';

import {
  attachWidget, detachWidget
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


export
class MenuManager { // implements IMenuManager ??
  static menuUpdatedSignal = new Signal<MenuManager, MenuBar>();

  get menuUpdated(): ISignal<MenuManager, MenuBar> {
    return MenuManager.menuUpdatedSignal.bind(this);
  }

  constructor(input?: ICommandMenuItem[]) {
    this._items = input || [];
    this._solver = new MenuSolver();
  }

  add(items: ICommandMenuItem[]): void { // TODO : should return IDisposable.
    for (var i = 0; i<items.length; ++i) {
      this._items.push(items[i]);
    }
    var menuBar = this._solver.solve(this._items);
    this.menuUpdated.emit(menuBar);
  }

  allMenuItems(): ICommandMenuItem[] {
    return this._items;
  }

  private _items: ICommandMenuItem[];
  private _solver: MenuSolver;
}


/**
 * The interface required for a menu item.
 */
export
interface IMenuExtension {
  pointName: string;
  item: ICommandMenuItem;
}

/**
 * Menu Extension Point
 */
export
class MainMenuExtensionPoint { // Structurally implements IExtensionPoint
  constructor(id: string) {
    this.id = id;
    this._manager = new MenuManager();
    this._manager.menuUpdated.connect(this._onMenuUpdated, this);
  }

  extend(items: IMenuExtension[]): IDisposable {
    console.log('Adding items to menu via extension point...');
    var stripped = items.map(function(x) { return x.item; });
    this._manager.add(stripped);
    return; // TODO - disposable.
  }

  private _onMenuUpdated(sender: IMenuManager, value: MenuBar) {
    if (this._menuBar) {
      detachWidget(this._menuBar);
    }
    this._menuBar = value;
    attachWidget(this._menuBar, document.body);
  }

  id: string;
  private _menuBar: MenuBar;
  private _manager: IMenuManager;
}


/**
 *
 */
export
class MenuPlugin { // Structurally implements IPlugin
  constructor(id: string) {
    this.id = id;
    this._mainMenuExtensionPoint = new MainMenuExtensionPoint('menu.main');
  }

  extensionPoints(): IExtensionPoint[] {
    return [this._mainMenuExtensionPoint];
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
  private _mainMenuExtensionPoint: IExtensionPoint;
}

