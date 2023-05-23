<template>
  <div class="sidebar-section">
    <div class="flex items-center flex-col h-full justify-between">
      <div>
        <div class="sidebar-item w-full flex items-center flex-col">
          <div class="p-2">
            <div class="flex items-center justify-center sidebar-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-moon-stars"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.25"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
                ></path>
                <path
                  d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"
                ></path>
                <path d="M19 11h2m-1 -1v2"></path>
              </svg>
            </div>
            <span class="sidebar-text text-[11px]"> Dark Mode </span>
          </div>
        </div>
      </div>
      <div class="h-full flex flex-col items-center justify-center">
        <nuxt-link
          v-for="(item, index) in sidebarItems"
          :to="item.to"
          :class="index !== 0 ? 'mt-3' : ''"
          :key="index"
          class="sidebar-item w-full flex items-center flex-col"
          :exact="item.to === '/' ? true : false"
        >
          <div class="p-2">
            <div
              class="flex items-center justify-center sidebar-icon"
              v-html="item.icon"
            ></div>
            <span class="sidebar-text text-[11px]">
              {{ item.text }}
            </span>
          </div>
        </nuxt-link>
      </div>
      <div>
        <div class="sidebar-item w-full flex items-center flex-col">
          <div class="p-2">
            <div class="flex items-center justify-center sidebar-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-logout"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.25"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                ></path>
                <path d="M9 12h12l-3 -3"></path>
                <path d="M18 15l3 -3"></path>
              </svg>
            </div>
            <span class="sidebar-text text-[11px]"> Logout </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarItems: [
        {
          text: "Dashboard",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dashboard" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
        <path d="M13.45 11.55l2.05 -2.05"></path>
        <path d="M6.4 20a9 9 0 1 1 11.2 0z"></path>
        </svg>`,
          to: "/",
        },
        {
          text: "Tasks",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list-details" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M13 5h8"></path>
            <path d="M13 9h5"></path>
            <path d="M13 15h8"></path>
            <path d="M13 19h5"></path>
            <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            </svg>`,
          to: "/tasks",
        },
        {
          text: "Grammar",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-books" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
            <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
            <path d="M5 8h4"></path>
            <path d="M9 16h4"></path>
            <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z"></path>
            <path d="M14 9l4 -1"></path>
            <path d="M16 16l3.923 -.98"></path>
            </svg>`,
          to: "/grammar",
        },
        {
          text: "Dictionary",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-vocabulary" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2z"></path>
   <path d="M12 5v16"></path>
   <path d="M7 7h1"></path>
   <path d="M7 11h1"></path>
   <path d="M16 7h1"></path>
   <path d="M16 11h1"></path>
   <path d="M16 15h1"></path>
</svg>`,
          to: "/dictionary",
        },
        {
          text: "Exams",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-certificate" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
   <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path>
   <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path>
   <path d="M6 9l12 0"></path>
   <path d="M6 12l3 0"></path>
   <path d="M6 15l2 0"></path>
</svg>`,
          to: "/exams",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.sidebar-section {
  width: 85px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #180600;
  color: #846e69;

  .sidebar-item {
    &:hover {
      color: #ffffff;
      cursor: pointer;
    }
  }

  .nuxt-link-active {
    color: #ffffff;
  }
}
</style>
