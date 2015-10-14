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
/**
 * Menu Extension Point
 */
var MenuExtensionPoint = (function () {
    function MenuExtensionPoint(id) {
        this.id = id;
        this._menuBar = new phosphor_menus_1.MenuBar();
        phosphor_widget_1.attachWidget(this._menuBar, document.body);
    }
    MenuExtensionPoint.prototype.extend = function (item) {
        this._menuBar.children.push(item.menu); // TODO
        return; // TODO
    };
    return MenuExtensionPoint;
})();
/**
 *
 */
var MenuPlugin = (function () {
    function MenuPlugin(id) {
        this.id = id;
        this._menuExtensionPoint = new MenuExtensionPoint('menu.top_level');
    }
    MenuPlugin.prototype.extensionPoints = function () {
        return [this._menuExtensionPoint];
    };
    MenuPlugin.prototype.extensions = function () {
        return [];
    };
    return MenuPlugin;
})();
exports.MenuPlugin = MenuPlugin;
//# sourceMappingURL=index.js.map