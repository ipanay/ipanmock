console.log(9)
self.onmessage = function(data) {
    console.log('子线程收到主线程信息')
    self.postMessage("子线程消息")
}