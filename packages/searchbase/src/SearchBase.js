// @flow
import SearchComponent from './SearchComponent';
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
  _components: { [string]: SearchComponent };

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
  register = (
    componentId: string,
    component: SearchComponent | Object
  ): SearchComponent => {
    if (!componentId) {
      throw new Error(errorMessages.invalidComponentId);
    }
    if (this._components[componentId]) {
      // return existing instance
      return this._components[componentId];
    }
    let componentInstance = component;
    if (component && !(component instanceof SearchComponent)) {
      // create instance from object with all the options
      componentInstance = new SearchComponent({
        ...component,
        id: componentId,
        index: component.index || this.index,
        url: component.url || this.url,
        credentials: component.credentials || this.credentials,
        headers: component.headers || this.headers,
        transformRequest: component.transformRequest || this.transformRequest,
        transformResponse:
          component.transformResponse || this.transformResponse,
        appbaseConfig: component.appbaseConfig || this.appbaseConfig
      });
    } else {
      // set the id property on instance
      componentInstance.id = componentId;
    }
    // register component
    this._components[componentId] = componentInstance;
    // set the search base instance as parent
    componentInstance.setParent(this);
    return componentInstance;
  };

  // To un-register a component
  unregister = (componentId: string) => {
    if (componentId) {
      delete this._components[componentId];
    }
  };

  // To get component instance
  getComponent = (componentId: string): SearchComponent => {
    return this._components[componentId];
  };

  // To get the list of registered components
  getComponents = (): { [string]: SearchComponent } => {
    return this._components;
  };
}

export default SearchBase;
