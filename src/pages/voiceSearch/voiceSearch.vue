<template>
    <div class="pages-style">
        <h3>语音搜索</h3>
        <!-- <el-button @click="pageInfo">开始语音搜索</el-button> -->
        <!-- <el-input v-model="text" placeholder="Enter text" />
        <el-button @click="speak">语音转文字</el-button>
        <div>
            <h3>文字转语音</h3>
            <button @click="speakText">转换为语音</button>
            <vue-speech ref="speech"></vue-speech>
        </div>
        <div>
            <button @click="toggleRecording">
                {{ isRecording ? '停止录音' : '开始录音' }}
            </button>
            <div v-if="resultText">
                <h3>识别结果：</h3>
                <p>{{ resultText }}</p>
            </div>
            <div v-if="errorMessage" style="color: red;">
                {{ errorMessage }}
            </div>
            <button v-if="errorMessage" @click="requestMicrophonePermission">
                重新请求麦克风权限
            </button>
        </div>
        <div>
            <button @click="start" :disabled="isRecording">开始录音</button>
            <button @click="stop" :disabled="!isRecording">停止</button>
            <button @click="download" :disabled="!audioUrl">下载</button>
        </div> -->
        <ly/>
    </div>
</template>
<script>
import VueSpeech from 'vue-speech'
import ly from './index'
export default {
    components: {
        ly
    },
    data() {
        return {
            // recognition: null,
            recognizedText: '',
            text: '',
            isRecording: false,
            isMicSupported: true, // 是否支持麦克风
            statusText: '',       // 状态提示（如“正在录音...”）
            resultText: '',       // 语音识别结果
            errorMessage: '',     // 错误信息
            mediaRecorder: null,  // 录音对象
            audioChunks: [],       // 录音数据块
            audioUrl: null,
            isRecording: false,
            mediaRecorder: null,
            audioChunks: [],
        }
    },
    created() {
        // this.recognition = webkitSpeechRecognition ? new webkitSpeechRecognition() : null;
        // if (this.recognition) {
        //     this.recognition.continuous = true;
        //     this.recognition.interimResults = true;

        //     this.recognition.onstart = () => {
        //         this.recognitionStatus = 'Recognition started';
        //     };
        //     this.recognition.onend = () => {
        //         this.recognitionStatus = 'Recognition ended';
        //     };
        //     this.recognition.onresult = (event) => {
        //         console.log("event==========>", event);
                
        //         const recognized = event.results[event.results.length - 1][0].transcript;
        //         this.recognizedText = recognized;
        //     };
        // }  else {
        //     this.recognitionStatus = 'Recognition not supported';
        // }
    },
    methods: {
        pageInfo() {
            console.log('pageInfo');
            if ('webkitSpeechRecognition' in window) {
                console.log("webkitSpeechRecognition====================>");
                this.recognition = new webkitSpeechRecognition(); // 对于非Chrome浏览器使用webkit前缀的API
            } else if ('SpeechRecognition' in window) {
                console.log("SpeechRecognition====================>");
                
                this.recognition = new SpeechRecognition(); // 标准API
            } else {
                alert('浏览器不支持语音识别');
                return;
            }
            this.recognition.continuous = false; // 是否持续监听语音输入
            this.recognition.interimResults = true; // 是否返回临时结果（部分识别结果）
            this.recognition.lang = 'cmn-Hans-CN'; // 普通话（中国大陆）
            // this.recognition.lang = 'zh-CN'; // 设置语言为中文
            debugger
            this.recognition.onresult = (event) => {
                console.log("event================>", event);
                
                const transcript = Array.from(event.results)
                .map(result => result[0]) // 获取每个结果的第一个片段（通常是最终的片段）
                .map(result => result.transcript) // 获取文本片段的文本内容
                .join('\n'); // 将结果连接成字符串
                this.recognizedText = transcript; // 更新数据模型中的文本
                console.log("this.recognizedText==============>", this.recognizedText); 
            };
            this.recognition.onend = () => {
                console.log("this.recognizedText==============>", this.recognizedText); 
                console.log('语音识别结束');
                this.recognition = null; // 重置recognition对象，以便下次使用
            };
            console.log("this.recognition=============>", this.recognition);
            this.recognition.start(); // 开始语音识别
        },
        speak() {
            let utterThis = new SpeechSynthesisUtterance();
            utterThis.text = this.text;
            utterThis.lang = 'zh';
            utterThis.rate = 0.7 // 语速 0.1~10
            utterThis.pitch = 0.3 // 音高 0~2
            utterThis.volume = 0.7 // 音量 0~1
            window.speechSynthesis.speak(utterThis)
            // const synth = window.speechSynthesis;
            // const utterThis = new SpeechSynthesisUtterance(this.text);
            // synth.speak(utterThis);
        },
        speakText() {
            const speech = this.$refs.speech
            speech.text = "这是要转换为语音的文本"
            speech.speak()
        },
        // 开始/停止录音
        async toggleRecording() {
            if (this.isRecording) {
                this.stopRecording();
            } else {
                await this.startRecording();
            }
        },

        // 开始录音
        async startRecording() {
            try {
                // 请求麦克风权限
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                // 初始化录音器
                this.mediaRecorder = new MediaRecorder(stream);

                // 收集录音数据
                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        this.audioChunks.push(event.data);
                    }
                };

                // 录音停止后的处理
                this.mediaRecorder.onstop = async () => {
                    await this.sendAudioToServer();
                    stream.getTracks().forEach(track => track.stop()); // 关闭麦克风
                };

                this.mediaRecorder.start();
                this.isRecording = true;

            } catch (error) {
                console.error('录音失败:', error);
                debugger
                if (error.name === 'NotAllowedError') {
                    this.errorMessage = '麦克风权限被拒绝，请允许访问！';
                } else {
                    this.errorMessage = '录音初始化失败：' + error.message;
                }
            }
        },

        // 停止录音
        stopRecording() {
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
                this.isRecording = false;
            }
        },

        // 将音频发送到后端
        async sendAudioToServer() {
            try {
                // 合并录音数据
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const formData = new FormData();
                formData.append('audio', audioBlob, 'recording.wav');

                // 调用后端接口
                const response = await fetch('http://localhost:3000/api/recognize', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                this.resultText = data.text;

            } catch (error) {
                this.errorMessage = '识别失败：' + error.message;
            }
        },

        // 重新请求麦克风权限
        async requestMicrophonePermission() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.errorMessage = ''; // 清除错误提示
            } catch (error) {
                this.errorMessage = '麦克风权限被拒绝，请手动允许！';
            }
        },
        // 开始录音
        async start() {
            try {
                console.log("navigator.mediaDevices======>", navigator.mediaDevices.getUserMedia({audio: true}));
                debugger
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                
                this.mediaRecorder.ondataavailable = e => {
                this.audioChunks.push(e.data);
                };

                this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.audioUrl = URL.createObjectURL(blob);
                };

                this.mediaRecorder.start();
                this.isRecording = true;
            } catch (error) {
                alert('需要允许麦克风权限！');
            }
        },

        // 停止录音
        stop() {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.audioChunks = [];
        },

        // 下载录音
        download() {
            const a = document.createElement('a');
            a.href = this.audioUrl;
            a.download = `recording_${Date.now()}.webm`;
            a.click();
        }
    },
    beforeDestroy() {
        // 组件销毁前停止录音
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
        }
    }
}
</script>
<style scoped>
    .speech-container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        text-align: center;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    button.recording {
        background: #f44336;
    }

    button:disabled {
        background: #cccccc;
        cursor: not-allowed;
    }

    .status {
        color: #666;
        margin: 10px 0;
    }

    .result {
        margin-top: 20px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 5px;
        text-align: left;
    }

    .error {
        color: #dc3545;
        margin-top: 15px;
        padding: 10px;
        background: #ffeef0;
        border-radius: 5px;
    }
</style>

