import SubNav from './part/subNav/'

export default {
    name: 'v-menu-nav',
    props: {
        nav: Array,
        direction: String
    },
    components: { SubNav },
    data () {
        return {
            mainNavIndex: -1,
            mainNav: {},
            subNavs: [],
            overflow: ''
        }
    },
    watch: {
        mainNavIndex (val, old) {
            if (old > -1) this.toggleClasses(old)

            if (val > -1) this.toggleClasses(val)
        },

        nav (val) {
            this.formatNav(val)
        }
    },
    mounted: function () {
        this.setGlobalEvt()
    },
    methods: {
        formatNav (obj) {
            let loop = obj => {
                // 对于没有内容的 不处理
                if (!Object.keys(obj).length) return

                obj.forEach(val => {
                    if (!val.hasOwnProperty('classes')) {
                        this.$set(val, 'classes', {})
                    } else {
                        val.classes = {}
                    }
    
                    if (val.children) {
                        // 如果有子集显示效果
                        if (!val.hasOwnProperty('childLayer')) {
                            this.$set(val, 'childLayer', {
                                visibility: 'hidden'
                            })
                        }
                        
                        loop( val.children )
                    }
                })
            }

            loop(obj)
        },
        
        selectedNav (i, evt) {
            let nav = this.nav[i]

            if (this.mainNavIndex === i) {
                this.mainNavIndex = -1
                return
            } 

            this.mainNavIndex = i

            if ( nav.children ) {
                this.mainNav = evt.target.getBoundingClientRect()
                this.mainNav.height = evt.target.scrollHeight

                this.$nextTick(() => {
                    let _p = this.$refs.thisSubNav.computePosition(this.mainNav, evt, true)
                    
                    Object.assign(nav.childLayer, _p)
                })
            }
        },

        toggleClasses (index) {
            let nav = this.nav[index]

            if (!nav) return

            if (
                Array.isArray( nav.classes ) && 
                nav.classes.includes('current')
            ) {
                nav.classes = []
                this.subNavs = []
                this.overflow = ''

            } else {
                if (index === this.mainNavIndex) {
                    nav.classes = ['current']
                    this.subNavs = [nav]
                    this.overflow = 'hidden'
                }
            }
        },
        setGlobalEvt () {
            document.documentElement.addEventListener('click',() => {
                if (this.mainNavIndex > -1 && this.nav.length > this.mainNavIndex) {
                    this.nav[this.mainNavIndex].classes = []
                }
                this.subNavs = []
            })
        }
    }
}