/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var phosphor_menus_1 = require('phosphor-menus');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
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
        this._menuBar.children.push(item.menu); // TODO
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
        return;
    };
    return MenuPlugin;
})();
exports.MenuPlugin = MenuPlugin;
//# sourceMappingURL=index.js.map