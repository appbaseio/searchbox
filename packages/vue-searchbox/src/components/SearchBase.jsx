import { SearchBase as Headless } from '@appbaseio/searchbase';
import VueTypes from 'vue-types';
import { LIBRARY_ALIAS } from '../../../searchbase/src/utils';
import { types } from '../utils/types';

const SearchBase = {
	name: 'search-base',
	props: {
		index: VueTypes.string,
		url: types.url,
		mongodb: VueTypes.object,
		credentials: VueTypes.string,
		headers: types.headers,
		appbaseConfig: types.appbaseConfig,
		transformRequest: VueTypes.func,
		transformResponse: VueTypes.func
	},
	provide() {
		const headers = {
			...this.$props.headers,
			...(!this.$props.mongodb ? { 'x-search-client': 'Searchbox Vue' } : {})
		};
		this.searchbase = new Headless({
			index: this.$props.index,
			url: this.$props.url,
			credentials: this.$props.credentials,
			mongodb: this.$props.mongodb,
			headers,
			appbaseConfig: this.$props.appbaseConfig,
			transformRequest: this.$props.transformRequest,
			transformResponse: this.$props.transformResponse,
			libAlias: LIBRARY_ALIAS.VUE_SEARCHBOX
		});
		return {
			searchbase: this.searchbase
		};
	},
	render() {
		return <div>{this.$slots.default}</div>;
	}
};

SearchBase.install = function(Vue) {
	Vue.component(SearchBase.name, SearchBase);
};

export default SearchBase;
