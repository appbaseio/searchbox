import IconWrapper from "../styles/IconWrapper";
import ListenSvg from '../styles/ListenSvg';
import MuteSvg from '../styles/MuteSvg';
import MicSvg from '../styles/MicSvg';

const STATUS = {
  inactive: "INACTIVE",
  stopped: "STOPPED",
  active: "ACTIVE",
  denied: "DENIED"
};

const Icon = {
  props: ["status", "handleMicClick", "className", "applyClearStyle"],
  render() {
    const { status, className, handleMicClick } = this.$props;
    let url;
    if (!window.SpeechRecognition) {
      url =
        "https://cdn3.iconfinder.com/data/icons/glypho-music-and-sound/64/microphone-off-512.png";
    }

    switch (status) {
      case STATUS.active:
        return <ListenSvg className={className} handleMicClick={handleMicClick} />;
      case STATUS.stopped:
      case STATUS.denied:
        return <MuteSvg className={className} handleMicClick={handleMicClick} />;
      default:
        return <MicSvg className={className} handleMicClick={handleMicClick} />;
    }
    // switch (status) {
    //   case STATUS.active:
    //     url = "https://media.giphy.com/media/ZZr4lCvpuMP58PXzY1/giphy.gif";
    //     break;
    //   case STATUS.stopped:
    //     break;
    //   case STATUS.denied:
    //     url =
    //       "https://cdn3.iconfinder.com/data/icons/glypho-music-and-sound/64/microphone-off-512.png";
    //     break;
    //   default:
    //     url =
    //       "https://cdn3.iconfinder.com/data/icons/glypho-music-and-sound/64/microphone-512.png";
    // }
    // return (
    //   <img
    //     class={className}
    //     onClick={handleMicClick}
    //     src={url}
    //     style={{ width: "18px" }}
    //   />
    // );
  }
};

const Mic = {
  props: [
    "iconPosition",
    "handleMicClick",
    "className",
    "status",
    "showIcon",
    "applyClearStyle"
  ],
  render() {
    const {
      iconPosition,
      className,
      handleMicClick,
      status,
      applyClearStyle,
      showIcon
    } = this.$props;

    return (
      <IconWrapper>
     <Icon
          className={className}
          handleMicClick={handleMicClick}
          status={status}
        />
    </IconWrapper>


    );
  }
};

export default Mic;
