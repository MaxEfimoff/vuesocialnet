import Vue from 'vue';
import moment from 'moment';

const filters = () => {

  Vue.filter('formatDate', function (value, formatType = 'Do MMM YY') {
    if (!value) return '';

    return moment(value).format(formatType);
  })

  Vue.filter('fromNow', function (value) {
    if (!value) return '';

    return moment(value).fromNow();
  })
}

export default filters;
