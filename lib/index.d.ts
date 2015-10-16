import { IExtension, IExtensionPoint } from 'phosphide';
import { IDisposable } from 'phosphor-disposable';
import { MenuItem } from 'phosphor-menus';
/**
 * The interface required for a menu item.
 */
export interface IMenuExtension {
    pointName: string;
    item: MenuItem;
}
/**
 * Menu Extension Point
 */
export declare class MainMenuExtensionPoint {
    constructor(id: string);
    extend(item: IMenuExtension): IDisposable;
    id: string;
    private _menuBar;
}
/**
 *
 */
export declare class MenuPlugin {
    constructor(id: string);
    extensionPoints(): IExtensionPoint[];
    extensions(): IExtension[];
    load(): IDisposable;
    unload(): void;
    isRuntimeLoaded(): boolean;
    id: string;
    private _menuExtensionPoint;
}
