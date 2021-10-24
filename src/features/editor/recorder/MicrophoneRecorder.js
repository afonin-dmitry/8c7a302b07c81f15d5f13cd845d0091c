import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

class Microphone {
    constructor() {
        this.stream = null;
        const getUserMedia =  navigator.mediaDevices.getUserMedia ||
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia

        if (!getUserMedia) {
            throw new Error('getUserMedia is not available on this page')
        }

        this.getUserMedia = getUserMedia.bind(navigator);
    }

    async init() {
        if (!await this.checkPermissions()) {
            await this.requestPermissions();
        }
    }

    async checkPermissions() {
        if (!navigator.permissions) {
            return false;
        }

        const permission = await navigator.permissions.query({ name:'microphone' });

        if (permission.state === 'granted') {
            return true;
        }

        if (permission.state === 'prompt') {
            return false;
        }

        throw new Error('Permissions denied');
    }

    async requestPermissions() {
        // current browser API can't request for permissions
        // we can just toggle microphone stream to do it
        await this.startStream();
        this.stopStream();
    }

    async startStream() {
        return this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }

    stopStream() {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
    }
}

class MicrophoneRecorder {
    constructor() {
        this.microphone = new Microphone();
        this.recorder = null;
        this.inited = false;
    }

    async init() {
        if (this.inited)return;
        this.inited = true;
        await this.microphone.init();
        await register(await connect());
    }

    async start(cb, ms) {
        const stream = await this.microphone.startStream();
        this.recorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });

        this.recorder.ondataavailable = cb;
        this.recorder.start(ms);
    }

    stop() {
        this.recorder.stop();
        this.recorder = null;
        this.microphone.stopStream();
    }
}

export default new MicrophoneRecorder();