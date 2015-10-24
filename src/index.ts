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
  IExtension
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


/**
 * The interface required for menu items.
 */
export
interface IItems {
  items: ICommandMenuItem[];
}


export
function receiveItems(extension: IExtension<IItems>): IDisposable {
  if (extension.object && extension.object.hasOwnProperty('items')) {
    console.log('got items', extension.object.items.length);
    menuItems = menuItems.concat(extension.object.items);
  } 
  if (extension.data && extension.data.hasOwnProperty('items')) {
    menuItems = menuItems.concat(extension.data.items);
  }
  if (menuBar) detachWidget(menuBar);
  menuBar = MenuSolver.solve(menuItems);
  attachWidget(menuBar, document.body);
  console.log('attached', menuItems.length);
  return void 0;
}


export
function initialize(): IDisposable {
  return void 0;
}


var menuItems: ICommandMenuItem[] = [];
var menuBar: MenuBar = null;
