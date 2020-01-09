import React, { Component } from 'react';
import MicIcon from '../styles/MicIcon';
import { hasCustomRenderer as hcr, getComponent as gc } from '../utils/helper';

const STATUS = {
  inactive: 'INACTIVE',
  stopped: 'STOPPED',
  active: 'ACTIVE',
  denied: 'DENIED'
};

const Icon = props => {
  const { status, ...rest } = props;
  let url;
  if (!window.SpeechRecognition) {
    url =
      'https://cdn3.iconfinder.com/data/icons/glypho-music-and-sound/64/microphone-off-512.png';
  }

  switch (status) {
    case STATUS.active:
      url = 'https://media.giphy.com/media/ZZr4lCvpuMP58PXzY1/giphy.gif';
      break;
    case STATUS.stopped:
      break;
    case STATUS.denied:
      url =
        'https://cdn3.iconfinder.com/data/icons/glypho-music-and-sound/64/microphone-off-512.png';
      break;
    default:
      url =
        'https://cdn3.iconfinder.com/data/icons/glypho-music-and-sound/64/microphone-512.png';
  }
  return <img {...rest} src={url} style={{ width: '18px' }} />;
};

class Mic extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.iconPosition !== this.props.iconPosition ||
      nextProps.className !== this.props.className ||
      nextProps.status !== this.props.status ||
      nextProps.applyClearStyle !== this.props.applyClearStyle ||
      nextProps.showIcon !== this.props.showIcon
    );
  }

  render() {
    const {
      iconPosition,
      className,
      onClick,
      status,
      applyClearStyle,
      showIcon
    } = this.props;

    const getComponent = () => {
      const data = {
        onClick,
        status
      };
      return gc(data, this.props);
    };

    const hasCustomRenderer = hcr(this.props);

    return (
      <MicIcon
        showIcon={showIcon}
        iconPosition={iconPosition}
        showClear={applyClearStyle}
      >
        {hasCustomRenderer ? (
          getComponent()
        ) : (
          <Icon className={className} onClick={onClick} status={status} />
        )}
      </MicIcon>
    );
  }
}

export default Mic;
