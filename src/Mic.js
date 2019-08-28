// @flow

import Observable from "./observable";

const STATUS = {
  inactive: "INACTIVE",
  stopped: "STOPPED",
  active: "ACTIVE",
  denied: "DENIED"
};

type StatusField =
  | STATUS.inactive
  | STATUS.stopped
  | STATUS.active
  | STATUS.denied;

class Mic {
  _status: StatusField;
  language: string;
  stateChanges: Observable;

  //change events
  onMicStatusChange: (next: string, prev: string) => void;
  onError: (error: any) => void;
  onResults: (next: string, prev: string) => void;
  onNoMatch: (next: string, prev: string) => void;

  constructor({ status, language }) {
    this._status = status || STATUS.inactive;
    this.language = language || "en-US";
    this._results = [];
    this._instance =
      window.webkitSpeechRecognition || window.SpeechRecognition || null;
    if (!this._instance) {
      console.error(
        "SpeechRecognition is not supported in this browser. Please check the browser compatibility at https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#Browser_compatibility."
      );
    }
  }
  //getters
  get micStatus() {
    return this._status;
  }

  get micInstance() {
    return this._instance;
  }

  get micActive() {
    return this._status === STATUS.active;
  }

  get micStopped() {
    return this._status === STATUS.stopped;
  }

  get micInactive() {
    return this._status === STATUS.inactive;
  }

  get micDenied() {
    return this._status === STATUS.denied;
  }

  _applyOptions(
    key: string,
    prevValue: any,
    nextValue: any,
    stateChanges = true
  ): void {
    // Trigger events
    if (key === "value" && this.onMicStatusChange)
      this.onMicStatusChange(prevValue, nextValue);

    if (key === "error" && this.onError) this.onError(prevValue);

    if (key === "no-match" && this.onNoMatch) this.onNoMatch(prevValue);

    if (key === "results" && this.onResults)
      this.onResults(prevValue, nextValue);

    if (stateChanges) {
      this.stateChanges.next(
        {
          [key]: {
            prev: prevValue,
            next: nextValue
          }
        },
        key
      );
    }
  }

  stopMic = () => {
    if (this._instance) {
      const prev = this._status;
      this._status = STATUS.inactive;
      this._instance.stop();
      this._instance = null;
      this._applyOptions("value", prev, this._status);
    }
  };

  onMicClick = () => {
    const prevResults = this._results;
    this._results = [];
    const prevStatus = this._status;
    if (window.SpeechRecognition && prevStatus !== STATUS.denied) {
      if (status === STATUS.active) this._status = prevStatus;
      const { SpeechRecognition } = window;
      if (this._instance) {
        this._applyOptions("results", prevResults, this._results);
        this.stopMic();
        return;
      }
      this._instance = new SpeechRecognition();
      this._instance.continuous = true;
      this._instance.interimResults = true;
      this._instance.lang = this.language;
      this._instance.start();
      this._instance.onstart = () => {
        this._status = STATUS.active;
        this._applyOptions("value", prevStatus, this._status);
      };
      this._instance.onresult = ({ results, timeStamp }) => {
        if (results && results[0] && results[0].isFinal) {
          this.stopMic();
        }
        this._applyOptions("results", prevResults, { results, timeStamp });
        this._results.push({ results, timeStamp });
      };
      this._instance.onnomatch = e => this._applyOptions("no-match", e);
      this._instance.onerror = e => {
        if (e.error === "no-speech" || e.error === "audio-capture") {
          this._status = STATUS.inactive;
        } else if (e.error === "not-allowed") {
          this._status = STATUS.denied;
        }
        this._applyOptions("value", prevStatus, this._status);
        console.error(e);
        this._applyOptions("error", e);
      };
    }
  };
}

export default Mic;
