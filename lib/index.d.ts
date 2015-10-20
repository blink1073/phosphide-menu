import { ICommandMenuItem } from './menuiteminterface';
import { IExtension, IExtensionPoint } from 'phosphide';
import { IDisposable } from 'phosphor-disposable';
import { MenuBar } from 'phosphor-menus';
import { Signal, ISignal } from 'phosphor-signaling';
export * from './constraints';
export * from './menuiteminterface';
export * from './menumanagerinterface';
export * from './menusolver';
export * from './menusolverfunctions';
export declare class MenuManager {
    static menuUpdatedSignal: Signal<MenuManager, MenuBar>;
    menuUpdated: ISignal<MenuManager, MenuBar>;
    constructor(input?: ICommandMenuItem[]);
    add(items: ICommandMenuItem[]): void;
    allMenuItems(): ICommandMenuItem[];
    private _items;
    private _solver;
}
/**
 * The interface required for a menu item.
 */
export interface IMenuExtension {
    pointName: string;
    item: ICommandMenuItem;
}
/**
 * Menu Extension Point
 */
export declare class MainMenuExtensionPoint {
    constructor(id: string);
    extend(items: IMenuExtension[]): IDisposable;
    private _onMenuUpdated(sender, value);
    id: string;
    private _menuBar;
    private _manager;
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
    private _mainMenuExtensionPoint;
}
