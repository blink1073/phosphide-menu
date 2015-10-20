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
var menusolver_1 = require('./menusolver');
var phosphor_signaling_1 = require('phosphor-signaling');
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
var MenuManager = (function () {
    function MenuManager(input) {
        this._items = input || [];
        this._solver = new menusolver_1.MenuSolver();
    }
    Object.defineProperty(MenuManager.prototype, "menuUpdated", {
        get: function () {
            return MenuManager.menuUpdatedSignal.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    MenuManager.prototype.add = function (items) {
        for (var i = 0; i < items.length; ++i) {
            this._items.push(items[i]);
        }
        var menuBar = this._solver.solve(this._items);
        this.menuUpdated.emit(menuBar);
    };
    MenuManager.prototype.allMenuItems = function () {
        return this._items;
    };
    MenuManager.menuUpdatedSignal = new phosphor_signaling_1.Signal();
    return MenuManager;
})();
exports.MenuManager = MenuManager;
/**
 * Menu Extension Point
 */
var MainMenuExtensionPoint = (function () {
    function MainMenuExtensionPoint(id) {
        this.id = id;
        this._manager = new MenuManager();
        this._manager.menuUpdated.connect(this._onMenuUpdated, this);
    }
    MainMenuExtensionPoint.prototype.extend = function (items) {
        console.log('Adding items to menu via extension point...');
        var stripped = items.map(function (x) { return x.item; });
        this._manager.add(stripped);
        return; // TODO - disposable.
    };
    MainMenuExtensionPoint.prototype._onMenuUpdated = function (sender, value) {
        if (this._menuBar) {
            phosphor_widget_1.detachWidget(this._menuBar);
        }
        this._menuBar = value;
        phosphor_widget_1.attachWidget(this._menuBar, document.body);
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
        this._mainMenuExtensionPoint = new MainMenuExtensionPoint('menu.main');
    }
    MenuPlugin.prototype.extensionPoints = function () {
        return [this._mainMenuExtensionPoint];
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