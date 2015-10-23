import { ICommandMenuItem } from './menuiteminterface';
import { IExtension } from 'phosphide';
import { IDisposable } from 'phosphor-disposable';
export * from './constraints';
export * from './menuiteminterface';
export * from './menumanagerinterface';
export * from './menusolver';
export * from './menusolverfunctions';
/**
 * The interface required for menu items.
 */
export interface IItems {
    items: ICommandMenuItem[];
}
export declare function receiveItems(extension: IExtension<IItems>): IDisposable;
export declare function initialize(): IDisposable;
