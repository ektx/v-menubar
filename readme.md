# VMenuBar 
仿 MacOS 主菜单效果
![](http://wx2.sinaimg.cn/large/9444af88gy1frnnyr2hc9g20m808njz4.gif)

## 使用
HTML
```html
<VMenuBar :nav="navs" />
```

JavaScript
```javascript
import VMenuBar from 'VMenuBar'

export default {
    data () {
        return {
            navs: [
                {
                    title: '计划',
                    to: '/todoList'
                },
                {
                    title: '通讯录',
                    to: '/addressBook'
                },
                {
                    title: 'Apple',
                    children: [
                        {
                            title: 'Mac',
                            children: [
                                {
                                    title: 'Macbook',
                                    href: '#'
                                },
                                {
                                    title: 'Macbook Air',
                                    href: '#'
                                },
                                {
                                    title: 'Macbook Pro',
                                    href: '#'
                                },
                                {
                                    type: 'separator'
                                },
                                {
                                    title: 'iMac',
                                    href: '#'
                                },
                                {
                                    title: 'iMac Pro',
                                    href: '#'
                                },
                                {
                                    title: 'Mac Pro',
                                    href: '#'
                                }
                            ]
                        },
                        {
                            title: 'iPhone',
                            href: '#'
                        },
                        {
                            title: 'iPad',
                            href: '#'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            title: 'help',
                            fun: () => {
                                alert('apple help')
                            }
                        }
                    ]
                },
                {
                    title: 'API',
                    href: '/apiTest',
                    target: '_blank'
                }
            ]
        }
    }
}
```

## Props
- nav `[array]` 菜单数据
    - title `[string]` 标题
    - ico `[string]` 小图标（暂支持字符串）
    - to `[string]` 路由跳转
    - href `[string]` html原生跳转（a 链接）
    - target `[string]` 可选，指定 A 链接的跳转方式