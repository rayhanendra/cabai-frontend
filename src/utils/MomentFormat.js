import moment from 'moment';
import 'moment/locale/id';

// moment().tz('Asia/Jakarta');
moment.locale('id');
moment.updateLocale('id', {
  months: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
});

export const today = moment().format();

export function getMonth(date) {
  return moment(date).format('MM');
}

export function getYear(date) {
  return moment(date).format('YYYY');
}

export function getDateFormat(localDate) {
  return moment(localDate).format();
}
export function momentFormat(date) {
  return moment(date).format('LL');
}
export function momentAdd(date, options) {
  return moment(date).add(options);
}
export function dateDifference(dateTo, dateFrom, measurement = 'seconds') {
  return moment(dateTo).diff(moment(dateFrom), measurement);
}
export function getYearMonthFormat(date) {
  return moment(date).format('YYYY-MM');
}
