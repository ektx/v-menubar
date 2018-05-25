<template>
    <div class="sub-main-nav">
        <template 
            v-if="showNav"
            v-for="(menu, mindex) in showNav"
        >
        <ul 
            class="vmenunav-subnav" 
            :style="menu.childLayer"
            :key="mindex"
        >
            <li 
                v-for="(sMenu, sindex) in menu.children" 
                :key="sindex"
                :class="sMenu.classes"
                @mouseover="mouseOverNav(sindex, $event, mindex)"
                @click="subClick(sindex, mindex, $event)"
            >
                <div v-if="!sMenu.type" class="vmenunav-link">
                    <div class="ico">{{ sMenu.ico }}</div>
                    
                    <div class="title">
                        <a 
                            v-if="sMenu.href" 
                            :href="sMenu.href" 
                            :target="sMenu.target"
                        >{{ sMenu.title }}</a>
                        
                        <span v-else-if="sMenu.fun || sMenu.children">{{ sMenu.title }}</span>

                        <router-link 
                            v-else-if="sMenu.to" 
                            :to="sMenu.to"
                        >{{ sMenu.title }}</router-link>
                    </div>
                    
                    <div class="help">
                        <em v-if="sMenu.children"></em>
                    </div>
                </div>
                
                <hr v-if="sMenu.type && sMenu.type === 'separator'" />
            </li>
        </ul>
        </template>    
    </div>
</template>

<script src="./main.js"></script>
<style src="./layout.less" lang="less" scoped></style>
