import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useUserStore } from 'src/stores/user-store';
import { supabase } from 'src/boot/supabase';
import { setDataExpire } from 'src/util/storeLocal';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const userStore = useUserStore();
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    // if (to.meta.requiresAuth && !isAuthenticated) {
    //   next({ name: 'home' });

    //   return {
    //     path: '/login',
    //     query: { redirect: to.fullPath },
    //   };
    // }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (to.matched.some((res) => res.meta.requiresAuth)) {
      console.log(
        '🚀 ~ file: index.ts:51 ~ Router.beforeEach ~ session:',
        user
      );
      if (user) {
        setDataExpire('logged', 1, 160 * 4);
        next();
        return;
      }
      next({ name: 'Login' });
      return;
    }

    const isAuthenticated = userStore.logged;
    if (!isAuthenticated && to.name !== 'Login') next({ name: 'Login' });
    if (isAuthenticated && to.name == 'Login') next({ name: 'home' });
    else next();
  });

  return Router;
});
