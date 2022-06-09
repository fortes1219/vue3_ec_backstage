/* 列舉每個權限的id */

export enum PermissionType {
  // 首頁
  home_dashboard = 'home_dashboard',

  // 訂單管理
  order_manage_page = 'order_manage_page',
  order_manage_edit = 'order_manage_edit',
  order_manage_del = 'order_manage_del',

  // 商品管理
  goods_manage_page = 'goods_manage_page',
  goods_manage_add = 'goods_manage_add',
  goods_manage_edit_goods = 'goods_manage_edit_goods',
  goods_manage_del = 'goods_manage_del',
  goods_manage_edit_type = 'goods_manage_edit_type',

  // 會員管理
  member_manage_page = 'member_manage_page',
  member_manage_detail = 'member_manage_detail',
  member_manage_del = 'member_manage_del',

  // 管理員列表
  admin_manage_page = 'admin_manage_page',
  admin_manage_add = 'admin_manage_add',
  admin_manage_edit = 'admin_manage_edit',
  admin_manage_del = 'admin_manage_del'
}

export const checkPermissionsId = (obj: any, id): boolean => {
  return obj.hasOwnProperty(id) ? obj[id].Activity : false
}
