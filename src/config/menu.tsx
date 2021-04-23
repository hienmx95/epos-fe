import { appTranslation } from "app/app-translation";
import {
  PRODUCT_MASTER_ROUTE,
} from "config/route-consts";
import React, { ReactNode } from "react";
import { CreditCard, Server, ShoppingCart } from "react-feather";
export interface MenuItem {
  title?: string;
  icon?: ReactNode;
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
  Items?: MenuItem[];
  checkVisible?: (mapper: Record<string, number>) => boolean;
}

const translate = appTranslation.translate;

export const menu: Menu[] = [
  {
    menutitle: "Promotion",
    menucontent: "Quản lý khuyến mãi",
    Items: [
      {
        title: "Quản lý voucher",
        icon: <Server />,
        type: "sub",
        active: false,
        children: [
          {
            title: translate("Phát hành voucher"),
            path: PRODUCT_MASTER_ROUTE,
            type: "link",
            active: false,
          },
        ]
      },
    ],
  },
];
