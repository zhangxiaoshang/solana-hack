import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/Home' },
    { path: '/hash-pool', component: '@/pages/Pool' },

    { path: '*', component: '@/pages/Home' },
  ],
  fastRefresh: {},
});
