import { IExtension, IExtensionPoint } from 'phosphide';
import { IDisposable } from 'phosphor-disposable';
/**
 * Menu Extension Point
 */
export declare class MainMenuExtensionPoint {
    constructor(id: string);
    extend(item: any): IDisposable;
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
    id: string;
    private _menuExtensionPoint;
}
