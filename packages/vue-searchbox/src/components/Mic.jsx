import MicIcon from "../styles/MicIcon";

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
        url = "https://media.giphy.com/media/ZZr4lCvpuMP58PXzY1/giphy.gif";
        break;
      case STATUS.stopped:
        break;
      case STATUS.denied:
        url =
          "https://cdn3.iconfinder.com/data/icons/glypho-music-and-sound/64/microphone-off-512.png";
        break;
      default:
        url =
          "https://cdn3.iconfinder.com/data/icons/glypho-music-and-sound/64/microphone-512.png";
    }
    return (
      <img
        class={className}
        onClick={handleMicClick}
        src={url}
        style={{ width: "18px" }}
      />
    );
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
      <MicIcon
        showIcon={showIcon}
        iconPosition={iconPosition}
        showClear={applyClearStyle}
      >
        <Icon
          className={className}
          handleMicClick={handleMicClick}
          status={status}
        />
      </MicIcon>
    );
  }
};

export default Mic;
