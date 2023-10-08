<template>
  <div>
    <div class="chat-box" ref="chatBox">
      <div :class="message.source === 'user' ? 'user-message' : 'server-message'" v-for="(message, index) in messages" :key="index">
        <div class="message-source" v-if="message.source === 'user'">You: </div>
        <div class="message-source" v-if="message.source === 'server'">ChatGPT: </div>
        <div class="message-content">{{ message.text }}</div>
      </div>
    </div>
    <div class="input-box">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === "") return;
      const userMessage = { text: this.newMessage, source: 'user' };
      console.log(userMessage);
      this.messages.push(userMessage);

      // 模拟后端API响应
      const response = { text: this.newMessage  + " -> responded", source: 'server' };
      console.log(response);
      this.messages.push(response);
      this.newMessage = "";

      console.log(this.messages);
      // 滚动到底部
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        chatBox.scrollTop = chatBox.scrollHeight;
      });

      // 发送消息到后端API
      // 假设您有一个名为sendMessageToApi的方法发送消息到后端
      // 这里只是一个示例
      // sendMessageToApi(this.newMessage)
      //   .then((response) => {
      //     // 在前端添加发送的消息到聊天窗口
      //     this.messages.push({ text: this.newMessage, id: Date.now() });
      //     this.newMessage = "";
      //   })
      //   .catch((error) => {
      //     console.error("Error sending message:", error);
      //   });
    },
  },
};
</script>

<style scoped>
/* 样式可以根据您的需要自行定义 */

/* 对话框容器 */
.chat-box {
  border: 1px solid #ccc;
  padding: 10px;
  height: 300px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

/* 服务器响应的消息 */
.server-message
 {
  align-self: flex-end; /* 右对齐 */
  background-color: #DCF8C6; /* 示例背景颜色 */
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  display: flex;
  flex-direction: row; /* 水平布局 */
}

/* 用户输入的消息 */
.user-message {
  align-self: flex-start; /* 左对齐 */
  background-color: #EAEAEA; /* 示例背景颜色 */
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  display: flex;
  flex-direction: row; /* 水平布局 */
}

/* 消息来源文本样式 */
.message-source {
  font-weight: bold;
  margin-right: 5px;
}

.input-box {
  display: flex;
  margin-top: 10px;
}

input {
  flex: 1;
  padding: 5px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>