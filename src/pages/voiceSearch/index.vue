<template>
    <div class="voice-recorder">
        <!-- 录音控制 -->
        <button 
        @click="toggleRecording"
        :disabled="isRecording && !supportRecording"
        :class="{ 'recording': isRecording }"
        >
            {{ isRecording ? '录音中...' : '开始录音' }}
        </button>
        
        <!-- 音频播放 -->
        <div v-if="audioUrl" class="audio-controls">
            <audio :src="audioUrl" controls></audio>
            <button @click="downloadAudio">下载录音</button>
        </div>

        <!-- 状态提示 -->
        <p class="status">
            <span v-if="!supportRecording">⚠️ 当前浏览器不支持录音功能</span>
            <span v-else-if="recordingTime">已录制：{{ formattedTime }}</span>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isRecording: false,
            mediaRecorder: null,
            audioChunks: [],
            audioUrl: null,
            recordingTime: 0,
            timer: null,
            supportRecording: !!navigator.mediaDevices && !!window.MediaRecorder
        };
    },

    computed: {
        // 格式化录音时长 (秒 → 分:秒)
        formattedTime() {
            const minutes = Math.floor(this.recordingTime / 60);
            const seconds = this.recordingTime % 60;
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    },

    methods: {
        async toggleRecording() {
            // 环境检测
            if (location.protocol !== 'https:' && !location.hostname.match(/localhost|127\.0\.0\.1/)) {
                alert('请通过 HTTPS 或 localhost 访问本页面');
                return;
            }

            try {
                console.log("navigator.mediaDevices.enumerateDevices()===========>", navigator.mediaDevices.enumerateDevices());
                
                // 设备检测
                const devices = await navigator.mediaDevices.enumerateDevices();
                console.log("devices===============>", devices);
                
                const hasAudioInput = devices.some(d => d.kind === 'audioinput');
                
                if (!hasAudioInput) {
                    alert('未找到麦克风设备');
                    return;
                }

                // 请求权限
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: {
                    echoCancellation: true, // 启用降噪功能
                    noiseSuppression: true
                    }
                });
                
                this.setupRecorder(stream);
                this.startRecording();
            } catch (err) {
                console.error('录音错误:', err);
                if (err.name === 'NotAllowedError') {
                    alert('麦克风访问被拒绝，请检查浏览器设置');
                } else if (err.name === 'NotFoundError') {
                    alert('未找到可用麦克风');
                } else {
                    alert('录音功能初始化失败: ' + err.message);
                }
            }
        }
        },

  // 组件销毁时清理
    beforeDestroy() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
        }
        this.cleanup();
    }
};
</script>

<style scoped>
.voice-recorder {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    max-width: 400px;
}

button {
    padding: 8px 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #45a049;
}

button.recording {
    background: #f44336;
}

button.recording:hover {
    background: #d32f2f;
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.audio-controls {
    margin-top: 15px;
}

audio {
    width: 100%;
    margin-bottom: 10px;
}

.status {
    color: #666;
    font-size: 0.9em;
    margin-top: 10px;
}
</style>