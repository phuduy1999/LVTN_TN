import moment from 'moment';

export default function formatDate(str, withTime) {
  if (str) {
    let newStr = moment(str).format('DD/MM/YYYY ');
    if (withTime) {
      newStr += str.substring(
        str.indexOf("T") + 1,
        str.lastIndexOf("Z")
      )
    }
    return newStr;
  }
  return '';
}
