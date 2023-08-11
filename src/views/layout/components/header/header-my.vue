<template>
  <div>
    <m-popover class="flex items-center" placement="bottom-left">
      <template #reference>
        <div
          class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
        >
          <!-- 头像 -->
          <img
            class="w-3 h-3 rounded-sm"
            src="https://img0.baidu.com/it/u=3007123470,2609475842&fm=253&fmt=auto&app=138&f=PNG?w=350&h=371"
          />
          <!-- 下箭头 -->
          <m-svg-icon
            class="h-1.5 w-1.5 ml-0.5"
            name="down-arrow"
            fillClass="fill-zinc-900"
          ></m-svg-icon>
          <!-- vip标记 -->
          <m-svg-icon
            class="h-1.5 w-1.5 absolute right-[8px] bottom-0"
            name="vip"
            fillClass="fill-zinc-900"
          ></m-svg-icon>
        </div>
      </template>

      <!-- 气泡框 -->
      <div class="w-[50px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
          v-for="item in menuArr"
          :key="item.id"
        >
          <m-svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900"
          >
          </m-svg-icon>
          <span class="text-zinc-800 text-sm">{{ item.title }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
// 构建menu数据源
const menuArr = [
  {
    id: '0',
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: '1',
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: '2',
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
</script>

<style scoped></style>
