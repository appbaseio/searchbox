(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{32:function(e,t,a){"use strict";t.__esModule=!0;var r=f(a(1)),l=f(a(35)),s=f(a(36)),n=f(a(37)),i=f(a(38)),o=f(a(39)),c=f(a(40)),u=f(a(45)),d=f(a(33)),m=f(a(34));function f(e){return e&&e.__esModule?e:{default:e}}t.default=function(){return r.default.createElement(c.default,null,r.default.createElement(l.default,null),r.default.createElement(s.default,{title:"Searchbox libraries",description:"Build consistent, cross-platform search UIs that delight your users",cards:[{title:"React",image:"../../searchbox/images//Searchbox_React@1x.png",links:[{text:"Get Started",link:"https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/",buttonProps:{inverse:!0}},{text:"Demo",link:"https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/react-searchbox/examples/basic"}]},{title:"Vue",image:"../../searchbox/images//Searchbox_Vue@3x.png",links:[{text:"Get Started",link:"https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/",buttonProps:{inverse:!0}},{text:"Demo",link:"https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/vue-searchbox/examples/basic"}]},{title:"Javascript",image:"../../searchbox/images//Searchbox_JS@3x.png",links:[{text:"Get Started",link:"https://docs.appbase.io/docs/reactivesearch/searchbox/Quickstart/",buttonProps:{inverse:!0}},{text:"Docs",link:"https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/searchbox/examples/searchbar-with-style"}]}]}),r.default.createElement(n.default,{title:"Benefits",description:"Lightweight, performance optimized and built for creating production grade search experiences",features:[{image:{src:"../../icons/elasticsearch.svg",alt:"Elasticsearch compatible"},title:"Elasticsearch compatible",description:"Connect to an ElasticSearch index hosted anywhere. Supports v5, v6 and v7."},{image:{src:"../../icons/color_pallete.svg",alt:"Configurable styles"},title:"Configurable styles",description:"Styled searchbox component with rich theming and CSS class-injection support."},{image:{src:"../../icons/search_click_analytics.svg",alt:"Search & Click Analytics"},title:"Search & Click Analytics",description:"Record search and click analytics with appbase.io to understand the business impact of search."},{image:{src:"../../icons/voice_search.svg",alt:"Voice Search"},title:"Voice Search",description:"Enable searching with voice input."},{image:{src:"../../icons/autosuggestions.svg",alt:"Autosuggestions"},title:"Auto suggestions",description:"Use built-in auto suggestions and highlighting with keyboard accessibility."},{image:{src:"../../icons/promote_results.svg",alt:"Promote Results"},title:"Promote Results",description:"use appbase.io to merchandise and feature banners or results on specific search terms."}]}),r.default.createElement(i.default,null),r.default.createElement(o.default,null),r.default.createElement(m.default,{title:"Get started in minutes"},r.default.createElement("div",{className:"text-center"},r.default.createElement(d.default,{href:"https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/"},"Build my first app"))),r.default.createElement(u.default,null))}},33:function(e,t,a){"use strict";t.__esModule=!0;var r,l=a(1),s=(r=l)&&r.__esModule?r:{default:r};t.default=function(e){var t=e.className,a=void 0===t?"":t,r=e.big,l=void 0!==r&&r,n=e.theme,i=void 0===n?"pink":n,o=e.inverse,c=void 0!==o&&o,u=e.ghost,d=void 0!==u&&u,m=e.asLink,f=void 0!==m&&m,g=e.href,p=e.onClick,h=e.children,x="inline-flex items-center justify-center px-3 py-2 text-base font-medium rounded-md "+function(e){var t=e.big,a=e.theme,r=e.ghost,l=e.className,s=e.inverse,n=e.asLink,i="";return t&&(i+=" lg:px-6 lg:py-3 lg:text-lg"),r?i+" bg-transparent text-white hover:text-gray-300 "+l:n?i+" bg-transparent text-"+a+"-400 hover:text-"+a+"-200 "+l:a&&s?i+" text-"+a+"-500 shadow bg-white text-white hover:bg-"+a+"-500 hover:text-white focus:outline-none focus:shadow-outline transition duration-150 ease-in-out "+l:a?i+" bg-"+a+"-500 text-white hover:bg-"+a+"-400 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out "+l:i+" "+l}({big:l,theme:i,ghost:d,className:a,inverse:c,asLink:f});return g?s.default.createElement("a",{href:g,target:"_blank",rel:"noopener noreferrer",className:x},h):s.default.createElement("button",{tabIndex:"0",className:x,onClick:p},h)}},34:function(e,t,a){"use strict";t.__esModule=!0;var r,l=a(1),s=(r=l)&&r.__esModule?r:{default:r};t.default=function(e){var t=e.children,a=e.className,r=e.subtitle,l=e.title,n=e.description,i=e.showInfo,o=void 0===i||i;return s.default.createElement("div",{className:"relative pt-16 pb-20 px-4 xs:px-6 lg:pt-24 lg:pb-28 lg:px-8 "+(a||"")},s.default.createElement("div",{className:"max-w-6xl mx-auto"},o?s.default.createElement("div",{className:"text-center"},r?s.default.createElement("p",{className:"text-base mb-2 leading-6 text-pink-500 font-semibold tracking-wide uppercase"},r):null,s.default.createElement("h3",{className:"text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"},l),s.default.createElement("p",{className:"mt-4 text-xl leading-7 text-gray-500 lg:mx-auto"},n)):null,t))}},35:function(e,t,a){"use strict";t.__esModule=!0;var r=s(a(1)),l=s(a(33));function s(e){return e&&e.__esModule?e:{default:e}}t.default=function(){return r.default.createElement("main",{className:"header px-4 xs:px-6 lg:px-8 sm:max-h-full"},r.default.createElement("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-16 mx-auto max-w-6xl w-full pt-16 pb-20 text-center lg:text-left lg:py-32"},r.default.createElement("div",{className:"pr-4 sm:pr-8 xl:pr-16"},r.default.createElement("h2",{className:"text-4xl tracking-tight leading-10 font-extrabold text-pink-500 sm:leading-none lg:text-5xl xl:text-6xl"},"Searchbox for Elasticsearch"),r.default.createElement("p",{className:"mt-3 mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl"},"Lightweight and performance focused search UI library to query and display results from Elasticsearch."),r.default.createElement("div",{className:"mt-8 flex-wrap items-center flex lg:justify-start justify-center"},r.default.createElement(l.default,{href:"https://github.com/appbaseio/searchbox/tree/master/packages/react-searchbox",className:"mr-3",big:!0},"Get Started"),r.default.createElement(l.default,{href:"https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/",asLink:!0,big:!0},"Docs"))),r.default.createElement("div",{className:"h-0 md:h-64"},r.default.createElement("img",{className:"hidden mx-auto md:block object-cover lg:ml-auto",src:"../../images/hero.svg",alt:"Woman on her phone"}))))}},36:function(e,t,a){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},l=i(a(1)),s=i(a(34)),n=i(a(33));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.title,a=e.subtitle,i=e.description,o=e.cards;return l.default.createElement(s.default,{className:"bg-gray-100",title:t,subtitle:a,description:i},l.default.createElement("div",{className:"mt-12 grid gap-10 mx-auto justify-center md:grid-cols-2 lg:grid-cols-3 lg:max-w-none"},o.map((function(e){return l.default.createElement("div",{className:"flex flex-col text-center rounded-sm border shadow-sm hover:shadow-md transition ease-in-out duration-150 overflow-hidden"},l.default.createElement("div",{className:"flex-shrink-0 p-2 bg-white"},l.default.createElement("img",{className:"w-full",src:e.image,alt:""})),l.default.createElement("div",{className:"flex-1 bg-white p-6 flex flex-col justify-between"},l.default.createElement("div",{className:"flex-1"},l.default.createElement("div",null,l.default.createElement("h3",{className:"mt-2 text-xl leading-7 font-semibold text-gray-900"},e.title),e.description?l.default.createElement("p",{className:"mt-3 text-base leading-6 text-gray-500"},e.description):null),e.links?l.default.createElement("div",{className:"mt-2 sm:flex sm:justify-center"},l.default.createElement("div",{className:"mt-2 flex justify-center"},e.links.map((function(e,t){return l.default.createElement("div",{className:0!==t?"ml-3":"",key:e.text},l.default.createElement(n.default,r({},e.buttonProps||{asLink:!0},{href:e.link}),e.text))})))):null)))}))))}},37:function(e,t,a){"use strict";t.__esModule=!0;var r=s(a(1)),l=s(a(34));function s(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.features,a=e.title,s=e.subtitle,n=e.description;return r.default.createElement(l.default,{className:"bg-white",title:a,subtitle:s,description:n},r.default.createElement("div",null,t?r.default.createElement("div",{className:"mt-5 lg:mt-10"},r.default.createElement("div",{className:"py-10 lg:py-12 bg-white"},r.default.createElement("div",{className:"text-center grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-3 md:grid-cols-2"},t.map((function(e){return r.default.createElement("div",{className:"mt-10 lg:mt-0"},r.default.createElement("div",{className:"flex items-center justify-center h-12 w-12 mx-auto rounded-md text-white"},r.default.createElement("img",{src:e.image.src,alt:e.image.alt})),r.default.createElement("div",{className:"mt-5"},r.default.createElement("h5",{className:"text-lg leading-6 font-medium text-gray-900"},e.title),r.default.createElement("p",{className:"mt-2 text-base leading-6 text-gray-500"},e.description)))}))))):null))}},38:function(e,t,a){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},l=n(a(1)),s=n(a(34));n(a(33));function n(e){return e&&e.__esModule?e:{default:e}}var i=[{srcSet:"../../searchbox/images/testimonials/dol/logo@1x.png 1x, ../../searchbox/images/testimonials/dol/logo@2x.png 2x,../../searchbox/images/testimonials/dol/logo@3x.png 3x",alt:"US Department of Labor"},{srcSet:"../../searchbox/images/testimonials/fbresearch/logo@1x.png 1x, ../../searchbox/images/testimonials/fbresearch/logo@2x.png 2x,../../searchbox/images/testimonials/fbresearch/logo@3x.png 3x",alt:"Facebook Research"},{srcSet:"../../searchbox/images/testimonials/rumbleon/rumbleon@1x.png 1x, ../../searchbox/images/testimonials/rumbleon/rumbleon@2x.png 2x,../../searchbox/images/testimonials/rumbleon/rumbleon@3x.png 3x",alt:"RumbleOn"},{srcSet:"../../searchbox/images/testimonials/betagov/logo@1x.png 1x, ../../searchbox/images/testimonials/betagov/logo@2x.png 2x,../../searchbox/images/testimonials/betagov/logo@3x.png 3x",alt:"beta.gouv.fr"},{srcSet:"../../searchbox/images/testimonials/nasa/Nasa@1x.png 1x, ../../searchbox/images/testimonials/nasa/Nasa@2x.png 2x,../../searchbox/images/testimonials/nasa/Nasa@3x.png 3x",alt:"Nasa"},{srcSet:"../../searchbox/images/testimonials/reactioncommerce/logo@1x.png 1x, ../../searchbox/images/testimonials/reactioncommerce/logo@2x.png 2x,../../searchbox/images/testimonials/reactioncommerce/logo@3x.png 3x",alt:"ReactionCommerce"}];t.default=function(){return l.default.createElement(s.default,{title:"Trusted by these awesome folks",className:"bg-gray-100"},l.default.createElement("div",{className:"mt-10 gap-8 sm:gap-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"},i.map((function(e){return l.default.createElement("div",{className:"col-span-1 h-24 flex justify-center items-center"},l.default.createElement("img",r({className:"h-100"},e)))}))))}},39:function(e,t,a){"use strict";t.__esModule=!0;var r=s(a(1)),l=s(a(33));function s(e){return e&&e.__esModule?e:{default:e}}t.default=function(){return r.default.createElement("div",{className:"text-center grid grid-cols-1 lg:grid-cols-2"},r.default.createElement("div",{className:"bg-indigo-800 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"},r.default.createElement("h2",{className:"mt-2 text-white text-3xl leading-9 font-medium sm:text-4xl sm:leading-10"},"Build a live search app in a minute"),r.default.createElement("p",{className:"mt-3 text-lg leading-7 text-gray-400"},"Check out our 1-min interactive guide to get started with building your first search app."),r.default.createElement("div",{className:"mt-8"},r.default.createElement("div",{className:"inline-flex rounded-md shadow"},r.default.createElement(l.default,{href:"https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/"},"Get Started")),r.default.createElement("div",{className:"ml-3 inline-flex rounded-md"},r.default.createElement(l.default,{href:"https://docs.appbase.io/",ghost:!0},"Docs")))),r.default.createElement("div",{className:"bg-indigo-900 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"},r.default.createElement("h2",{className:"mt-2 text-white text-3xl leading-9 font-medium sm:text-4xl sm:leading-10"},"Get dedicated support"),r.default.createElement("p",{className:"mt-3 text-lg leading-7 text-gray-400"},"We offer dedicated support for Searchbox. Work with us to bring your dream project to life."),r.default.createElement("div",{className:"mt-8"},r.default.createElement("div",{className:"inline-flex rounded-md shadow"},r.default.createElement(l.default,{href:"https://appbase.io/pricing#support"},"Support Plans")),r.default.createElement("div",{className:"ml-3 inline-flex rounded-md"},r.default.createElement(l.default,{href:"https://appbase.io/contact",ghost:!0},"Get in Touch")))))}},40:function(e,t,a){"use strict";t.__esModule=!0;var r=n(a(1)),l=n(a(41)),s=n(a(44));function n(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.children;return r.default.createElement("div",{className:"relative"},r.default.createElement(l.default,null),t,r.default.createElement(s.default,null))}},41:function(e,t,a){"use strict";t.__esModule=!0;var r=o(a(1)),l=a(12),s=o(a(33)),n=o(a(42)),i=o(a(43));function o(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var d=function(e){function t(){var a,r;c(this,t);for(var l=arguments.length,s=Array(l),n=0;n<l;n++)s[n]=arguments[n];return a=r=u(this,e.call.apply(e,[this].concat(s))),r.state={isFixed:!1,navHeight:0,isMobileMenu:!1},r.handleScroll=function(){var e=document.getElementById("navbar");window.pageYOffset<=100?r.setState({isFixed:!1}):e.classList.contains("fixed")||r.setState({isFixed:!0,navHeight:e.clientHeight})},r.toggleMobileMenu=function(){r.setState((function(e){return{isMobileMenu:!e.isMobileMenu}}))},u(r,a)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.componentDidMount=function(){document.addEventListener("scroll",this.handleScroll)},t.prototype.componentWillUnmount=function(){document.removeEventListener("scroll",this.handleScroll)},t.prototype.render=function(){var e=this.state,t=e.isFixed,a=e.navHeight,o=e.isMobileMenu;return r.default.createElement(r.default.Fragment,null,t?r.default.createElement("div",{style:{height:a}}):null,r.default.createElement("div",{id:"navbar",className:(t?"fixed top-0 left-0 right-0 z-10 shadow-lg":"")+" bg-white"},r.default.createElement("div",{className:"px-4 xs:px-6 lg:px-8"},r.default.createElement("div",{className:"flex max-w-6xl mx-auto justify-between items-center py-6 md:justify-start md:space-x-10"},r.default.createElement("div",{className:"w-0 flex-1 flex"},r.default.createElement(l.Link,{to:"/",className:"flex items-center"},r.default.createElement("img",{className:"h-8 w-auto sm:h-10",src:"../../searchbox/images/RSlogo.svg",alt:"Workflow"}),r.default.createElement("span",{className:"ml-2 text-xl text-gray-800"},"Searchbox"))),r.default.createElement("div",{className:"block xs:hidden"},r.default.createElement(s.default,{theme:"gray",asLink:!0,onClick:this.toggleMobileMenu},r.default.createElement("svg",{viewBox:"0 0 20 20",fill:"currentColor",className:"w-5 h-5"},r.default.createElement("path",{fillRule:"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",clipRule:"evenodd"})))),r.default.createElement("div",{className:"hidden items-center justify-end space-x-2 sm:space-x-4 xs:flex  xs:flex-1"},r.default.createElement(n.default,null),r.default.createElement(s.default,{href:"https://appbase.io/#support"},r.default.createElement("svg",{viewBox:"0 0 24 24",stroke:"currentColor",className:"h-5 w-5 mr-2",fill:"none"},r.default.createElement("path",{strokeLinecap:"round",className:"mr-2",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"})),"Support")),r.default.createElement(i.default,{visible:o,onToggle:this.toggleMobileMenu})))))},t}(r.default.Component);t.default=d},42:function(e,t,a){"use strict";t.__esModule=!0;var r=s(a(1)),l=s(a(33));function s(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var o=function(e){function t(){var a,r;n(this,t);for(var l=arguments.length,s=Array(l),o=0;o<l;o++)s[o]=arguments[o];return a=r=i(this,e.call.apply(e,[this].concat(s))),r.state={githubStarCount:0},i(r,a)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.componentDidMount=function(){var e=this;fetch("https://api.github.com/repos/appbaseio/searchbox").then((function(e){return e.json()})).then((function(t){e.setState({githubStarCount:t.stargazers_count||9})})).catch((function(e){return console.log(e)}))},t.prototype.render=function(){var e=this.state.githubStarCount,t=this.props.className;return r.default.createElement(l.default,{inverse:!0,className:"relative "+(t||""),href:"https://github.com/appbaseio"},r.default.createElement("svg",{className:"h-5 w-5 mr-2",fill:"currentColor",viewBox:"0 0 24 24"},r.default.createElement("path",{fillRule:"evenodd",d:"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",clipRule:"evenodd"})),r.default.createElement("span",{className:"mr-10"},"Github"),r.default.createElement("div",{className:"absolute right-0 top-0 h-full flex px-3 py-3 items-center align-center rounded-md font-medium bg-opacity-50 bg-pink-100 rounded-tl-none rounded-bl-none lg:px-4 md:py-0"},e))},t}(r.default.Component);t.default=o},43:function(e,t,a){"use strict";t.__esModule=!0;var r,l=a(1),s=(r=l)&&r.__esModule?r:{default:r};t.default=function(e){var t=e.onToggle,a=e.visible;return s.default.createElement("div",{className:"absolute top-0 inset-x-0 p-2 transition transform origin-top-right xs:hidden "+(a?"block":"hidden")},s.default.createElement("div",{className:"rounded-lg shadow-md"},s.default.createElement("div",{className:"rounded-lg bg-white shadow-xs overflow-hidden",role:"menu","aria-orientation":"vertical","aria-labelledby":"main-menu"},s.default.createElement("div",{className:"px-5 pt-4 flex items-center justify-between"},s.default.createElement("div",null,s.default.createElement("img",{className:"h-8 w-auto",src:"../../searchbox/images/RSlogo.svg",alt:"Searchbox"})),s.default.createElement("div",{className:"-mr-2"},s.default.createElement("button",{type:"button",className:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out","aria-label":"Close menu",onClick:t},s.default.createElement("svg",{className:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},s.default.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"}))))),s.default.createElement("div",{className:"px-2 pt-2 pb-3"},s.default.createElement("a",{href:"https://github.com/appbaseio/searchbox",className:"flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out",role:"menuitem",target:"_blank",rel:"noopener noreferrer"},s.default.createElement("svg",{className:"h-5 w-5 mr-2",fill:"currentColor",viewBox:"0 0 24 24"},s.default.createElement("path",{fillRule:"evenodd",d:"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",clipRule:"evenodd"})),"Github"),s.default.createElement("a",{href:"https://appbase.io/#support",className:"mt-1 flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out",role:"menuitem",target:"_blank",rel:"noopener noreferrer"},s.default.createElement("svg",{viewBox:"0 0 24 24",stroke:"currentColor",className:"h-5 w-5 mr-2",fill:"none"},s.default.createElement("path",{strokeLinecap:"round",className:"mr-2",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"})),"Support")))))}},44:function(e,t,a){"use strict";t.__esModule=!0;var r,l=a(1),s=(r=l)&&r.__esModule?r:{default:r};t.default=function(){return s.default.createElement("div",{className:"bg-gray-900"},s.default.createElement("div",{className:"max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"},s.default.createElement("div",{className:"xl:grid xl:grid-cols-3 xl:gap-8 justify-center text-center lg:text-left lg:justify-start"},s.default.createElement("div",{className:"xl:col-span-1"},s.default.createElement("img",{className:"h-10 mx-auto lg:mx-0",src:"https://opensource.appbase.io/reactivesearch/images/logo.svg",alt:"Appbase.io"}),s.default.createElement("a",{href:"mailto:info@appbase.io",target:"_blank",rel:"noopener noreferrer",className:"mt-2 block text-gray-400 hover:text-gray-500 text-base leading-6 hover:underline"},"info@appbase.io"),s.default.createElement("div",{className:"mt-2 flex justify-center lg:justify-start"},s.default.createElement("a",{href:"https://github.com/appbaseio",target:"_blank",rel:"noopener noreferrer",className:"text-gray-400 hover:text-gray-500"},s.default.createElement("span",{className:"sr-only"},"GitHub"),s.default.createElement("img",{srcSet:"../../images/footer/Github@3x.svg 3x, ../../images/footer/Github@2x.png 2x, ../../images/footer/Github@1x.png"})),s.default.createElement("a",{href:"https://medium.appbase.io",target:"_blank",rel:"noopener noreferrer",className:"ml-2 text-gray-400 hover:text-gray-500"},s.default.createElement("span",{className:"sr-only"},"Medium"),s.default.createElement("img",{srcSet:"../../images/footer/Medium@3x.svg 3x, ../../images/footer/Medium@2x.png 2x, ../../images/footer/Medium@1x.png"})),s.default.createElement("a",{href:"https://twitter.com/appbaseio",target:"_blank",rel:"noopener noreferrer",className:"ml-2 text-gray-400 hover:text-gray-500"},s.default.createElement("span",{className:"sr-only"},"Twitter"),s.default.createElement("img",{srcSet:"../../images/footer/Twitter@3x.svg 3x, ../../images/footer/Twitter@2x.png 2x, ../../images/footer/Twitter@1x.png"})))),s.default.createElement("div",{className:"mt-12 grid grid-cols-1 xs:grid-cols-2 gap-8 xl:mt-0 xl:col-span-2"},s.default.createElement("div",{className:"md:grid md:grid-cols-2 md:gap-8"},s.default.createElement("div",null,s.default.createElement("h4",{className:"text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase"},"Reactivesearch"),s.default.createElement("ul",{className:"mt-4"},s.default.createElement("li",null,s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.appbase.io/docs/reactivesearch/v3/overview/quickstart/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"React")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.appbase.io/docs/reactivesearch/vue/overview/QuickStart/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Vue.JS")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Reactive Maps")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.appbase.io/docs/reactivesearch/native/overview/QuickStart/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"React Native")))),s.default.createElement("div",{className:"mt-12 md:mt-0"},s.default.createElement("h4",{className:"text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase"},"Searchbox"),s.default.createElement("ul",{className:"mt-4"},s.default.createElement("li",null,s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"React Searchbox")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Vue Searchbox")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.appbase.io/docs/reactivesearch/searchbox/Quickstart/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Javascript Searchbox")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.appbase.io/docs/reactivesearch/searchbase/overview/QuickStart/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Searchbase"))))),s.default.createElement("div",{className:"md:grid md:grid-cols-2 md:gap-8"},s.default.createElement("div",null,s.default.createElement("h4",{className:"text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase"},"Community"),s.default.createElement("ul",{className:"mt-4"},s.default.createElement("li",null,s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/appbaseio/searchbox/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Github")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://stackoverflow.com/questions/tagged/reactivesearch",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Stackoverflow")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://twitter.com/appbaseio",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Twitter")))),s.default.createElement("div",{className:"mt-12 md:mt-0"},s.default.createElement("h4",{className:"text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase"},"More"),s.default.createElement("ul",{className:"mt-4"},s.default.createElement("li",null,s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://medium.appbase.io/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Medium Publication")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://docs.appbase.io/",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Appbase.io Docs")),s.default.createElement("li",{className:"mt-4"},s.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"mailto:support@appbase.io",className:"text-base leading-6 text-gray-500 hover:text-gray-400 hover:underline"},"Support Email")))))))))}},45:function(e,t,a){"use strict";t.__esModule=!0;var r=s(a(1)),l=s(a(34));function s(e){return e&&e.__esModule?e:{default:e}}var n=[{text:"Documentation",image:"../../images/support/Documentation.svg",description:"Dive in to learn all about Search UI development for all platforms",link:"https://docs.appbase.io/docs/reactivesearch/gettingstarted/"},{text:"Tutorials",image:"../../images/support/Tutorials.svg",description:"Get inspiration with these tutorial guides.",link:"https://medium.appbase.io/tagged/javascript"},{text:"Support",image:"../../images/support/Support.png",description:"Get first-class support from appbase.io for your search.",link:"https://appbase.io/support"},{text:"Gitter",image:"../../images/support/Gitter.svg",description:"Join our community on Gitter.",link:"https://gitter.im/appbaseio/reactivesearch"}];t.default=function(){return r.default.createElement(l.default,{className:"bg-gray-100",title:"Need Help?",description:"Resources to get help with ReactiveSearch."},r.default.createElement("div",{className:"grid grid-cols-1 gap-8 justify-center sm:grid-cols-2 lg:grid-cols-4 lg:justify-start mt-8 rounded-sm"},n.map((function(e){var t=e.text,a=e.image,l=e.description,s=e.link;return r.default.createElement("a",{href:s,rel:"noopener noreferrer",target:"_blank",className:"text-center bg-white p-4 border border-gray-50 hover:shadow-md focus:border transition ease-in duration-200"},r.default.createElement("img",{src:a,alt:t,className:"my-4 h-24 mx-auto"}),r.default.createElement("h6",{className:"text-lg leading-6 font-medium mt-5 text-gray-900"},t),r.default.createElement("p",{className:"mt-2 text-base leading-6 text-gray-500"},l))}))))}}}]);