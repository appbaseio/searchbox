import CancelSvg from '../styles/CancelSvg';
import IconWrapper from '../styles/IconWrapper';
import IconGroup from '../styles/IconGroup';
import SearchSvg from '../styles/SearchSvg';
import { getClassName } from '../utils/helper';
import Mic from './Mic.jsx';

const SearchIcon = {
	props: ['showIcon', 'icon'],
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
		'clearValue',
		'iconPosition',
		'showClear',
		'clearIcon',
		'currentValue',
		'handleSearchIconClick',
		'showIcon',
		'icon',
		'enableVoiceSearch',
		'innerClass',
		'getMicInstance',
		'micStatus',
		'handleMicClick'
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
				<IconGroup groupPosition="right" positionType="absolute">
					{currentValue && showClear && (
						<IconWrapper onClick={clearValue} showIcon={showIcon} isClearIcon>
							{clearIcon || <CancelSvg />}
						</IconWrapper>
					)}
					{enableVoiceSearch && (
						<Mic
							className={getClassName(innerClass, 'mic') || null}
							status={micStatus}
							handleMicClick={handleMicClick}
						/>
					)}

					{iconPosition === 'right' && (
						<IconWrapper
							showIcon={showIcon}
							onClick={handleSearchIconClick}
							iconPosition={iconPosition}
						>
							<SearchIcon showIcon={showIcon} icon={icon} />
						</IconWrapper>
					)}
				</IconGroup>

				<IconGroup groupPosition="left" positionType="absolute">
					{iconPosition === 'left' && (
						<IconWrapper
							showIcon={showIcon}
							onClick={handleSearchIconClick}
							iconPosition={iconPosition}
						>
							<SearchIcon showIcon={showIcon} icon={icon} />
						</IconWrapper>
					)}
				</IconGroup>
			</div>
		);
	}
};

export default Icons;
