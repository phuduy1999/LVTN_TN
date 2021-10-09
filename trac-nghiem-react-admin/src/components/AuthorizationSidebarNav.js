import { useHistory } from "react-router";
import InfoUserLogin from 'src/_infoUser';

export default function authorizationSidebarNav() {
  let toArr = []; // items
  let idArr = []; // titles

  const user = InfoUserLogin();
  if (user && user.accessToken) {
    if (user.MANQ === 'PGV') {
      idArr = ['nhap-lieu', 'soan-cht', 'dk-thi']
      toArr = ['/dashboard', '/khoa', '/giaovien', '/sinhvien', '/monhoc', '/lopmonhoc', '/bode', '/loaicauhoi', '/dangky'];
    }
    else if (user.MANQ === 'GV') {
      idArr = ['soan-cht', 'dk-thi']
      toArr = ['/dashboard', '/bode', '/loaicauhoi', '/dangky', '/lopmonhoc/ds-lopmonhoc'];
    }
    else if (user.MANQ === 'admin') {
      idArr = ['cs-dl'];
      toArr = ['/csdl'];
    }
    else if (user.MANQ === 'SV') {
      const history = useHistory();
      history.push('/500');
    }
  } else {
    idArr = ['tai-khoan']
    toArr = ['/login'];
  }

  return { idArr, toArr };
}
