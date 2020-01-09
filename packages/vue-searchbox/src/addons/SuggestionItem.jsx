import { escapeRegExp } from "../utils/helper";

const SuggestionItem = {
  props: ["suggestion", "currentValue"],
  render() {
    const { suggestion, currentValue } = this.$props;
    const { label, value } = suggestion;
    const modSearchWords = currentValue
      .split(" ")
      .map(word => escapeRegExp(word));
    const stringToReplace = modSearchWords.join("|");
    if (label) {
      // label has highest precedence
      return typeof label === "string" ? (
        <div
          class="trim"
          domPropsInnerHTML={label.replace(
            new RegExp(stringToReplace, "ig"),
            matched => {
              return `<mark class="highlight-class">${matched}</mark>`;
            }
          )}
        />
      ) : (
        label
      );
    }
    return value;
  }
};

export default SuggestionItem;
