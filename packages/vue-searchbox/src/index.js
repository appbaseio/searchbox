import SearchBox from './components/SearchBox.jsx';
import SearchBase from './components/SearchBase.jsx';
import SearchComponent from './components/SearchComponent.jsx';
import version from './components/Version/index';

const components = [SearchBox, SearchBase, SearchComponent];

const install = function(Vue) {
  components.map(component => {
    Vue.use(component);
    return null;
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { version, install, SearchBox, SearchBase, SearchComponent };

export default {
  version,
  install
};
