import React, { Component } from 'react';
import IconWrapper from '../styles/IconWrapper';
import MicSvg from '../styles/MicSvg';
import MuteSvg from '../styles/MuteSvg';
import ListenSvg from '../styles/ListenSvg';
import { hasCustomRenderer as hcr, getComponent as gc } from '../utils/helper';

const STATUS = {
  inactive: 'INACTIVE',
  stopped: 'STOPPED',
  active: 'ACTIVE',
  denied: 'DENIED'
};

const Icon = props => {
  const { status, ...rest } = props;

  switch (status) {
    case STATUS.active:
      return <ListenSvg {...rest} />;
    case STATUS.stopped:
    case STATUS.denied:
      return <MuteSvg {...rest} />;
    default:
      return <MicSvg {...rest} />;
  }
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
      <IconWrapper>
        {hasCustomRenderer ? (
          getComponent()
        ) : (
          <Icon className={className} onClick={onClick} status={status} />
        )}
      </IconWrapper>
    );
  }
}

export default Mic;
