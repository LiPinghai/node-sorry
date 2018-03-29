module.exports = {
  templates: [{
      name: 'sorry',
      title: '为所欲为',
      desc: 'sorry,有钱真的是为所欲为！',
      defaultDialogue: ["好啊", "莫讲话我系一等良民", "就算想夹硬砌我生猪肉", "我都大把钱揾大状嚟帮我", "我谂我唔使旨意坐监", "你咪以为有钱大晒啊", "sorry 有钱真系大晒",'不过我谂佢唔会明呢个意境','哈哈哈']
    },
    {
      name: 'wangjingze',
      title: '王境泽',
      desc: '我王境泽就是饿死,也不吃你们一点东西!',
      defaultDialogue: ['我王境泽就算饿死', '死外边 从这里跳下去', '也不会吃你们一点东西', '真香']
    }
  ],
  statScript: `<script>
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?81512701524685db982762edff332855";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();
              </script>`
}