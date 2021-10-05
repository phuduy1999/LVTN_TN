export default function chuanHoaChuoi(str) {
  if (str) {
    str = str.trim();
    str = str.replace(/\s+/g, ' ');
    return str;
  }
  return '';
}
