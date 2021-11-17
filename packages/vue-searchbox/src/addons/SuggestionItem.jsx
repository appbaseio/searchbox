import { escapeRegExp } from '../utils/helper';

const SuggestionItem = {
	props: ['suggestion', 'currentValue'],
	render() {
		const { suggestion, currentValue } = this.$props;
		const { label, value } = suggestion;
		const modSearchWords = currentValue
			.split(' ')
			.map(word => escapeRegExp(word));
		const stringToReplace = suggestion._category
			? `in ${  suggestion._category}`
			: modSearchWords.join('|');

		if (label) {
			// label has highest precedence
			if (typeof label === 'string') {
				try {
					return (
            <div
              class="trim"
              domPropsInnerHTML={
                /<[a-z][\s\S]*>/i.test(suggestion.label) // contains any html from backend, eg: highlight
                  ? label
                  : label.replace(
                      new RegExp(stringToReplace, 'ig'),
                      matched => {
                        return `<mark class="highlight-class">${matched}</mark>`;
                      }
                    )
              }
            />
          );
				} catch (e) {
					return label;
				}
			}
			return label;
		}
		return value;
	}
};

export default SuggestionItem;
