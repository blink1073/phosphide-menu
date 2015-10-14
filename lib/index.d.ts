import { IExtension, IExtensionPoint } from 'phosphide';
/**
 *
 */
export declare class MenuPlugin {
    constructor(id: string);
    extensionPoints(): IExtensionPoint[];
    extensions(): IExtension[];
    id: string;
    private _menuExtensionPoint;
}
