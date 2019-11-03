import Vue from 'vue';
import moment from 'moment';

const filters = () => {

  Vue.filter('formatDate', function (value, formatType = 'Do MMM YY') {
    if (!value) return '';

    return moment(value).format(formatType);
  })

  Vue.filter('shortenText', (text, maxLength = 200) => {
    if(text && typeof text === 'string') {
      const finalChar = text.length > maxLength ? '...' : '';
      return text.substr(0, maxLength) + finalChar;
    }
  
    return ''
  })

  Vue.filter('fromNow', function (value) {
    if (!value) return '';

    return moment(value).fromNow();
  })

  Vue.filter('capitalize', function (value) {
    if (value && typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }

    return '';
  })
}

export default filters;
