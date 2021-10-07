import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // { path: '/', component: '@/pages/Home' },
    {
      path: '/',
      component: '@/layouts/Basic',
      routes: [
        { path: '/pool', component: '@/pages/Pool' },
        { path: '/mbtc', component: '@/pages/Mbtc' },
        { path: '/swap', component: '@/pages/Swap' },
        { path: '/income', component: '@/pages/Income' },
      ],
    },

    { path: '*', component: '@/pages/pool' },
  ],
  fastRefresh: {},
});
