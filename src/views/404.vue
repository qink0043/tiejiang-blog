<template>
  <div class="px-6 lg:px-12 min-h-[90vh] flex items-center pt-20">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
      <!-- Big Error Code Backdrop -->
      <div class="lg:col-span-8 relative animate-reveal">
        <h1
          class="text-[12rem] md:text-[24rem] font-black leading-none tracking-tighter opacity-[0.03] dark:opacity-[0.05] absolute -top-20 -left-10 pointer-events-none italic"
        >
          404.
        </h1>
        <div class="relative z-10 space-y-8">
          <div
            class="text-[10px] font-black tracking-[0.5em] text-accent uppercase"
          >
            SYSTEM_CRITICAL_ERROR
          </div>
          <h2
            class="text-6xl md:text-9xl font-black italic uppercase italic leading-none"
          >
            Page
            <br />
            <span class="text-raw">Broken_Link.</span>
          </h2>
          <p
            class="max-w-md text-sm font-mono text-primary-400 leading-relaxed border-l-4 border-primary-200 dark:border-primary-800 pl-6"
          >
            目标地址已从当前系统索引中移除或从未存在。请校对路由器参数或执行紧急系统回退。
          </p>
        </div>
      </div>

      <!-- Action Area -->
      <div
        class="lg:col-span-4 space-y-12 animate-content-fade"
        style="animation-delay: 200ms"
      >
        <div class="card-raw p-10 space-y-6">
          <div class="flex items-center gap-3">
            <span class="w-8 h-[2px] bg-accent"></span>
            <span class="text-xs font-black uppercase">Operation_Guide</span>
          </div>
          <ul
            class="space-y-4 font-mono text-xs text-primary-600 dark:text-primary-400"
          >
            <li>> 执行命令: cd /home</li>
            <li>> 状态码: [0x404]</li>
            <li>> 建议操作: 返回主分支预览最新日志。</li>
          </ul>
          <router-link to="/" class="btn-action w-full flex justify-center">
            REBOOT_TO_HOME
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
