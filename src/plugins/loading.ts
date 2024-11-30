import LoadingComponent from '@/components/LoadingComponent.vue';
import type { App } from 'vue';

interface LoadingState {
  visible: boolean;
}

const loadingPlugin = {
  install(app: App, options: LoadingState) {
    app.component('loading-component', LoadingComponent);
  }
};


export default loadingPlugin