<template>
    <div class="main-nav">
        <ul class="v-menu-top-bar">
            <li 
                v-for="(menu, index) in formatNav" 
                :key="index"
                :class="menu.classes"
                @click="selectedNav(index, $event)"
            >
                <a v-if="menu.href" :href="menu.href" :target="menu.target">{{ menu.title }}</a>
                <router-link 
                    v-else-if="menu.to"
                    :to="menu.to"
                >{{ menu.title }}</router-link>
                <span v-else href="menu.to">{{ menu.title }}</span>
            </li>
        </ul>

        <SubNav ref="thisSubNav" :subNavs="subNavs" :mainNav="mainNav" />
    </div>
</template>

<script src="./main.js"></script>
<style src="./layout.less" lang="less" scoped></style>
