// @flow
import Component from './Component';
import Base from './Base';
import { errorMessages } from './utils';
import type { SearchBaseConfig } from './types.js.flow';

/**
 * SearchBase class will act like the ReactiveBase component.
 * It works as a centralized store that will have the info about active/registered components.
 */
class SearchBase extends Base {
  /* ------ Private properties only for the internal use ----------- */
  // active components
  _components: { [string]: Component };

  constructor({
    index,
    url,
    credentials,
    headers,
    appbaseConfig
  }: SearchBaseConfig) {
    super({
      index,
      url,
      credentials,
      headers,
      appbaseConfig
    });
    this._components = {};
  }

  // To register a component
  register = (componentId: string, component: Component | Object) => {
    if (!componentId) {
      throw new Error(errorMessages.invalidComponentId);
    }
    let componentInstance = component;
    if (component && !(component instanceof Component)) {
      // create instance from object with all the options
      componentInstance = new Component({
        ...component,
        id: componentId,
        index: component.index || this.index,
        url: component.url || this.url,
        credentials: component.credentials || this.credentials,
        headers: component.headers || this.headers,
        transformRequest: component.transformRequest || this.transformRequest,
        transformResponse: component.transformResponse || this.transformResponse
      });
    } else {
      // set the id property on instance
      componentInstance.id = componentId;
    }
    // register component
    this._components[componentId] = componentInstance;
    // set the search base instance as parent
    componentInstance.setParent(this);
  };

  // To un-register a component
  unregister = (componentId: string) => {
    if (componentId) {
      delete this._components[componentId];
    }
  };

  // To get component instance
  getComponent = (componentId: string): Component => {
    return this._components[componentId];
  };

  // To get the list of registered components
  getComponents = (): { [string]: Component } => {
    return this._components;
  };
}

export default SearchBase;
