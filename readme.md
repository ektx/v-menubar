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

| 属性      | 类型                         | 说明           | 默认值 |
| --------- | ---------------------------- | -------------- | ------ |
| nav       | Array                        | 菜单内容       | -      |
| direction | String,可选内容为['', 'end'] | 菜单的方向控制 | -      |
|           |                              |                |        |

### Nav 

| 属性   | 类型   | 说明                                                         | 默认值 |
| ------ | ------ | ------------------------------------------------------------ | ------ |
| title  | String | 显示文字                                                     | -      |
| ico    | String | 小图标地址                                                   | -      |
| to     | String | 路由地址                                                     | -      |
| href   | String | 外部地址；html原生跳转（a 链接）                             | -      |
| target | String | 指定跳转方式；可以参考 [html a target](http://www.w3school.com.cn/tags/att_a_target.asp) | -      |

