import { defineConfig } from 'umi';

export default defineConfig({
  outputPath: 'docs',
  publicPath: '/solana-hack/',
  hash: true,
  history: { type: 'hash' },

  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': '#1ce9dd',
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

    { path: '*', component: '@/pages/' },
  ],

  fastRefresh: {},
});
