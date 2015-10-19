/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var phosphor_menus_1 = require('phosphor-menus');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
__export(require('./constraints'));
__export(require('./menuiteminterface'));
__export(require('./menumanagerinterface'));
__export(require('./menusolver'));
__export(require('./menusolverfunctions'));
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
var MainMenuExtensionPoint = (function () {
    function MainMenuExtensionPoint(id) {
        this.id = id;
        this._menuBar = phosphor_menus_1.MenuBar.fromTemplate(MENU_BAR_TEMPLATE);
        phosphor_widget_1.attachWidget(this._menuBar, document.body);
    }
    MainMenuExtensionPoint.prototype.extend = function (item) {
        console.log('Adding item to menu via extension point...');
        var items = this._menuBar.items.map(function (x) { return x; });
        items.push(item.item); // TODO - improve variable names
        this._menuBar.items = items;
        return; // TODO
    };
    return MainMenuExtensionPoint;
})();
exports.MainMenuExtensionPoint = MainMenuExtensionPoint;
/**
 *
 */
var MenuPlugin = (function () {
    function MenuPlugin(id) {
        this.id = id;
        this._menuExtensionPoint = new MainMenuExtensionPoint('menu.main');
    }
    MenuPlugin.prototype.extensionPoints = function () {
        return [this._menuExtensionPoint];
    };
    MenuPlugin.prototype.extensions = function () {
        return [];
    };
    MenuPlugin.prototype.load = function () {
        console.log('Loading menu plugin');
        return;
    };
    MenuPlugin.prototype.unload = function () {
        console.log('Unloading menu plugin');
    };
    MenuPlugin.prototype.isRuntimeLoaded = function () {
        return true;
    };
    return MenuPlugin;
})();
exports.MenuPlugin = MenuPlugin;
//# sourceMappingURL=index.js.map