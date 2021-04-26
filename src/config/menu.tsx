import { appTranslation } from "app/app-translation";
import {
  PRODUCT_MASTER_ROUTE,
} from "config/route-consts";
import React, { ReactNode } from "react";
import { Gift } from "react-feather";

export interface MenuItem {
  title?: string;
  icon?: ReactNode;
  // render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
  type?: string;
  badge?: string;
  badgetxt?: string;
  active?: boolean;
  path?: string;
  children?: MenuItem[];
  bookmark?: boolean;
  isShow?: boolean;
}

export interface Menu {
  menutitle?: string;
  menucontent?: string;
  isShow?: boolean;
  key?: React.Key;
  Items?: MenuItem[];
  checkVisible?: (mapper: Record<string, number>) => boolean;
}

const translate = appTranslation.translate;

export const menu: Menu[] = [
  {
    menutitle: translate('menu.promotionManagement'),
    menucontent: "Voucher & Chương trình khuyến mại",
    Items: [
      {
        title: translate('menu.voucherManagement'),
        icon: <Gift/>,
        type: "sub",
        active: false,
        // key:'promotionManagement',
        children: [
          {
            title: translate('menu.voucherProgram'),
            path: PRODUCT_MASTER_ROUTE,
            type: "link",
            active: false,
          },
        ]
      },
    ],
  },
];
