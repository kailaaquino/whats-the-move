import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sideQuesters: resolve(__dirname, 'friend-groups/side-questers/index.html'),
        sideQuestersActivities: resolve(__dirname, 'friend-groups/side-questers/activities.html'),
        sideQuestersAvailability: resolve(__dirname, 'friend-groups/side-questers/availability.html'),
        sideQuestersCreatePlan: resolve(__dirname, 'friend-groups/side-questers/create_plan.html'),
        sideQuestersMembers: resolve(__dirname, 'friend-groups/side-questers/members.html'),
        sideQuestersPlans: resolve(__dirname, 'friend-groups/side-questers/plans.html'),
        roomies: resolve(__dirname, 'friend-groups/roomies/index.html'),
        roomiesActivities: resolve(__dirname, 'friend-groups/roomies/activities.html'),
        roomiesAvailability: resolve(__dirname, 'friend-groups/roomies/availability.html'),
        roomiesCreatePlan: resolve(__dirname, 'friend-groups/roomies/create_plan.html'),
        roomiesMembers: resolve(__dirname, 'friend-groups/roomies/members.html'),
        roomiesPlans: resolve(__dirname, 'friend-groups/roomies/plans.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
})