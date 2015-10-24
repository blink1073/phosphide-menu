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
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
__export(require('./constraints'));
__export(require('./menuiteminterface'));
__export(require('./menumanagerinterface'));
__export(require('./menusolver'));
__export(require('./menusolverfunctions'));
function receiveItems(extension) {
    if (extension.object && extension.object.hasOwnProperty('items')) {
        menuItems = menuItems.concat(extension.object.items);
    }
    if (extension.data && extension.data.hasOwnProperty('items')) {
        menuItems = menuItems.concat(extension.data.items);
    }
    if (menuBar)
        phosphor_widget_1.detachWidget(menuBar);
    menuBar = menusolver_1.MenuSolver.solve(menuItems);
    phosphor_widget_1.attachWidget(menuBar, document.body);
    return void 0;
}
exports.receiveItems = receiveItems;
function initialize() {
    return void 0;
}
exports.initialize = initialize;
var menuItems = [];
var menuBar = null;
//# sourceMappingURL=index.js.map