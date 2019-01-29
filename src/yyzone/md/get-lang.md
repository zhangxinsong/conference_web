## 获取当前语言方法
``` javascript
import { getLang } from 'yyzone'
getLang({
    source: 'web', // source为web或mobile
    callback: function(data) {
        // data 为zhs（中文）、zht（繁体中文）、en（英文） 
    }
})
```

