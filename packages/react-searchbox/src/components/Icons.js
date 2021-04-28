import React from 'react';
import CancelSvg from '../styles/CancelSvg';
import IconGroup from '../styles/IconGroup';
import IconWrapper from '../styles/IconWrapper';
import InputIcon from '../styles/InputIcon';
import SearchSvg from '../styles/SearchSvg';
import { getClassName } from '../utils/helper';
import Mic from './Mic';

const SearchIcon = props => {
  if (props.showIcon) {
    return props.icon || <SearchSvg />;
  }
  return null;
};

const Icons = props => {
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
    renderMic,
    getMicInstance,
    onMicClick,
    micStatus
  } = props;

  return (
    <div>
      <IconGroup groupPosition="right"
					positionType="absolute" >{enableVoiceSearch && (
        <Mic
          getInstance={getMicInstance}
          render={renderMic}
          className={getClassName(innerClass, 'mic') || null}
          onClick={onMicClick}
          status={micStatus}
        />
      )}{currentValue && showClear && (
        <IconWrapper
          onClick={clearValue}
        >
          {clearIcon || <CancelSvg />}
        </IconWrapper>
      )}</IconGroup>

<IconGroup groupPosition="left"
					positionType="absolute"> <IconWrapper

        onClick={handleSearchIconClick}

      >
        <SearchIcon showIcon={showIcon} icon={icon} />
      </IconWrapper></IconGroup>

    </div>
  );
};

export default Icons;
