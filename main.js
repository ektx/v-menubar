import SubNav from './part/subNav/'

export default {
    name: 'v-menu-nav',
    props: [ 'nav' ],
    components: { SubNav },
    data () {
        return {
            mainNavIndex: -1,
            mainNav: {},
            subNavs: []
        }
    },
    watch: {
        mainNavIndex (val, old) {
            if (old > -1) this.toggleClasses(old)

            if (val > -1) this.toggleClasses(val)
        }
    },
    computed: {
        formatNav: function () {
            let loop = (obj) => {
                
                if (!Object.keys(obj).length) return

                obj.forEach(val => {
                    if (!val.hasOwnProperty('classes')) {
                        this.$set(val, 'classes', {})
                    }
    
                    if (val.children) {
                        if (!val.hasOwnProperty('childLayer')) {
                            this.$set(val, 'childLayer', {
                                visibility: 'hidden'
                            })
                        }

                        loop( val.children )
                    }
                })
            }

            loop(this.nav)

            return this.nav
        }
    },
    methods: {
        selectedNav (i, evt) {
            let nav = this.formatNav[i]

            if (this.mainNavIndex === i) {
                this.mainNavIndex = -1
                return
            } 

            this.mainNavIndex = i

            if ( nav.children ) {
                this.mainNav = evt.target.getBoundingClientRect()
                this.mainNav.height = evt.target.scrollHeight
                let y = this.mainNav.y + this.mainNav.height

                this.$nextTick(() => {
                    let _p = this.$refs.thisSubNav.computePosition(this.mainNav, evt, true)
                    Object.assign(nav.childLayer, _p)
                })
            }
        },
        toggleClasses (index) {
            let nav = this.formatNav[index]

            if (!nav) return

            if (
                Array.isArray( nav.classes ) && 
                nav.classes.includes('current')
            ) {
                this.$set(nav, 'classes', [])
                
                this.subNavs = []
            } else {
                if (index === this.mainNavIndex) {
                    this.$set(nav, 'classes', ['current'])
                    this.subNavs = [nav]
                }
            }
        }

    }
}