import CancelSvg from "../styles/CancelSvg";
import InputIcon from "../styles/InputIcon";
import SearchSvg from "../styles/SearchSvg";
import { getClassName } from "../utils/helper";
import Mic from "./Mic.jsx";

const SearchIcon = {
  props: ["showIcon", "icon"],
  render() {
    const { showIcon, icon } = this.$props;
    if (showIcon) {
      return icon || <SearchSvg />;
    }
    return null;
  }
};

const Icons = {
  props: [
    "clearValue",
    "iconPosition",
    "showClear",
    "clearIcon",
    "currentValue",
    "handleSearchIconClick",
    "showIcon",
    "icon",
    "enableVoiceSearch",
    "innerClass",
    "getMicInstance",
    "micStatus",
    "handleMicClick"
  ],
  render() {
    const {
      clearValue,
      iconPosition,
      showClear,
      clearIcon,
      currentValue,
      handleSearchIconClick,
      showIcon,
      icon,
      enableVoiceSearch,
      innerClass,
      micStatus,
      handleMicClick
    } = this.$props;

    return (
      <div>
        {currentValue && showClear && (
          <InputIcon
            onClick={clearValue}
            iconPosition="right"
            clearIcon={iconPosition === "right"}
            showIcon={showIcon}
            isClearIcon
          >
            {clearIcon || <CancelSvg />}
          </InputIcon>
        )}
        {enableVoiceSearch && (
          <Mic
            iconPosition={iconPosition}
            className={getClassName(innerClass, "mic") || null}
            status={micStatus}
            handleMicClick={handleMicClick}
            applyClearStyle={!!currentValue && showClear}
            showIcon={showIcon}
          />
        )}
        <InputIcon
          showIcon={showIcon}
          onClick={handleSearchIconClick}
          iconPosition={iconPosition}
        >
          <SearchIcon showIcon={showIcon} icon={icon} />
        </InputIcon>
      </div>
    );
  }
};

export default Icons;
