export default {
    name: 'v-menu-bar-subnav',
    props: [ 'subNavs', 'mainNav' ],
    data () {
        return {
            // 显示效果
            showNav: [],
            // 懒加载菜单
            lazyShow: null,
            // 缓存菜单状态
            holdItem: {}
        }
    },
    watch: {
        subNavs (val) {
            if (val) this.showNav = val
        }
    },
    methods: {
        mouseOverNav (i, evt, level, item) {
            evt.stopPropagation()
            let nav = null
            let appendChild = () => {
                if ( nav.children && evt.target.tagName === 'LI' ) {
                    this.showNav.push( nav )
                   
                    this.$nextTick(() => {
                        Object.assign(
                            nav.childLayer, 
                            this.computePosition(this.mainNav, evt)
                        )
                    })
                    
                }
            }
            
            clearTimeout(this.lazyShow)

            // 如果状态缓存中有同级值
            let _HoldItem = this.holdItem[level]
            if (_HoldItem) {
                _HoldItem.item.classes = null
                item.classes = ['current']
            }
            item.classes = ['current']
            // 缓存目前状态效果
            this.holdItem[level] = {item, index: i}

            // 为父级添加选中效果
            this.showNav[level].classes = ['current']

            this.lazyShow = setTimeout(() => {
                // 添加显示效果
                this.showNav[level].children.forEach((val, index) => {
                    if (i === index) nav = val
                })
            
                // 删除不必要的菜单内容
                this.showNav.splice( level+1 )

                this.$nextTick(appendChild)

            }, 100)
        },

        mouseoutItem (item) {
            item.classes = null
        },

        subClick (i, level, evt) {
            evt.stopPropagation()
            let root = this.showNav[0]
            let nav = this.showNav[level].children[i]

            // 隐藏所有菜单
            this.$parent.mainNavIndex = -1
            
            if (nav.hasOwnProperty('fun')) {
                nav.fun()
            }
        },

        /**
         * 计算菜单位置
         * @param {object} mainNavInfo 主菜单信息
         * @param {event} evt 事件
         * @param {boolean} isRoot 是否为根元素
         */
        computePosition (mainNavInfo, evt, isRoot = false) {
            let positionInfo = evt.target.getBoundingClientRect()
            let UL = evt.target.parentElement.parentElement.querySelector('.vmenunav-subnav:last-child')
            let ulInfo = UL.getBoundingClientRect()

            // 设置默认值
            let x = 0
            let y = 0
            let width = ulInfo.width + 'px'
            ulInfo.height = UL.scrollHeight + 'px'
            // 高度可用空间
            let heightLast = window.innerHeight - mainNavInfo.height

            if (isRoot) {
                x = mainNavInfo.x
                y = mainNavInfo.height
            } else {
                x = positionInfo.x + positionInfo.width
                y = positionInfo.y
            }

            // 开始位置
            let xStart = x
            // 剩余空间
            let xLast = window.innerWidth - xStart

            // x 轴剩下空间小于菜单所属宽度时
            if (xLast < ulInfo.width) {
                // 取最大的空间显示
                if (xStart > xLast) {
                    // xstart
                    x = xStart - ulInfo.width + (isRoot ? mainNavInfo.width : 0)
                } else {
                    // xlast
                    width = xLast + 'px'
                }
            }
            // 菜单需要空间高度大小
            let needUlH = ulInfo.height + ulInfo.top
            
            if (needUlH > heightLast) {
                // 如果自身的高度比剩余可用空间还大
                // 我们此时要修改到y轴的位置
                if (ulInfo.height >= heightLast) {
                    y = mainNavInfo.height
                    height = heightLast + 'px'
                } 
            }

            return {
                visibility: 'visible',
                transform: `translate3D(${x}px, ${y}px, 0px)`,
                height: ulInfo.height,
                width
            }
        }
    }
}