<template>
  <div class="container mx-auto p-6">
    <div class="flex">
      <div class="w-8/12">
        <div class="flex items-center justify-between">
          <h1 class="page-main-title m-0">Your Tasks</h1>
          <a-button type="primary" @click="createTask" :loading="loadingTask"
            >New Task</a-button
          >
        </div>
        <div class="mt-4">
          <div v-if="!tasks_loading">
            <nuxt-link
              v-for="(task, index) in tasks"
              :key="index"
              class="bg-white p-4 rounded mb-2 hover:shadow-lg block"
              :to="{ name: 'tasks-id', params: { id: task.id } }"
            >
              <Task :task="task" />
            </nuxt-link>
          </div>
          <div v-else>
            <div class="bg-white p-4 rounded hover:shadow-lg">
              <a-skeleton active :paragraph="{ rows: 3 }" />
            </div>
            <div class="mt-3 bg-white p-4 rounded hover:shadow-lg">
              <a-skeleton active :paragraph="{ rows: 4 }" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-4/12 pl-4">
        <h1 class="page-main-title m-0">Account Summary</h1>
        <div class="mt-4">
          <div class="mb-2">
            <div>
              <div
                class="bg-white rounded p-4 border border-gray-200 hover:shadow-lg grid grid-cols-4 gap-4"
              >
                <div class="col-span-2">
                  <a-statistic title="Tokens Used" :value="'11.2k'" />
                </div>
                <div class="col-span-2">
                  <a-statistic title="Estimated Cost" :value="'0.232 $'" />
                </div>
                <div class="col-span-2">
                  <a-statistic title="Words Remained" :value="139" />
                </div>
                <div class="col-span-2">
                  <a-statistic title="Total Words" :value="1231" />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded mb-2 border border-gray-200 px-1">
            <div class="text-center m-0 pt-4">
              Number of words you've learned in this week.
            </div>
            <apexchart
              type="area"
              height="250"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
          <div class="bg-white p-4 rounded border border-gray-200">
            <div class="text-center text-gray-800 font-semibold">
              Weekly Activity
            </div>
            <div class="my-2 text-[12px] text-gray-700 text-center">
              May 2023
            </div>
            <div class="flex items-center justify-between">
              <div
                v-for="(day, index) in days"
                :key="index"
                class="flex flex-col items-center justify-center py-2 px-1 rounded-full min-w-[40px] hover:bg-gray-50"
                :class="
                  index === 5 ? 'bg-sky-600 text-white hover:bg-sky-600' : ''
                "
              >
                <span>
                  {{ day }}
                </span>
                <span
                  class="p-1 rounded-full w-[30px] h-[30px] flex items-center justify-center text-[10px] mt-2 font-semibold"
                  :class="index < 5 ? 'bg-lime-100' : ''"
                >
                  {{ 17 + index + 1 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/index/Task.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      loadingTask: false,
      days: ["M", "T", "W", "T", "F", "S", "S"],
      tasks: [],
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69],
        },
      ],
      chartOptions: {
        colors: ["#57a6f1"],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        grid: {
          borderColor: "#f6f6f6",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0,
          },
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
            fontFamily: "DM Sans",
          },
          x: {
            show: false,
          },
          y: {
            formatter: (val) => `${val} new words learned.`,
            title: {
              formatter: () => "",
            },
          },
        },
      },
      tasks_loading: false,
    };
  },
  methods: {
    loadMore() {
      console.log("helloooo");
    },
    createTask() {
      this.loadingTask = true;
    },
    async fetchTasks() {
      try {
        this.tasks_loading = true;
        const response = await this.$axios.$get("user-tasks/all");
        this.tasks = response;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.tasks_loading = false;
      }
    },
  },
  mounted() {
    this.fetchTasks();
  },
  components: {
    Task,
  },
};
</script>

<style lang="less" scoped>
::v-deep .apexcharts-tooltip {
  background: #171d2f !important;
  color: #ffffff !important;
  border: none !important;
  box-shadow: none;
  span {
    font-weight: 400 !important;
    margin: 0 !important;
  }
}

::v-deep .apexcharts-tooltip-marker {
  display: none !important;
}

::v-deep .apexcharts-xaxistooltip {
  display: none !important;
}
</style>
