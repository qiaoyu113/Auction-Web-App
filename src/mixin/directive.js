import Vue from 'vue'

Vue.directive('setTitle', {
    update: function(el, binding) {
        if(typeof document != "undefined") document.title = binding.value
    }

})

import InfiniteScroll from '../assets/js/common/infinite';
Vue.directive('InfiniteScroll', InfiniteScroll);

