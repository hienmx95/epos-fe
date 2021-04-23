import { Model } from "@react3l/react3l/core";
import { commonService } from "@react3l/react3l/services";
import { ACTION_URL_REGEX, MENU_URL_REGEX } from "config/consts";
import { Menu, menu, MenuItem } from "config/menu";
import { LOGIN_ROUTE } from "config/route-consts";
// import * as Cookie from "js-cookie";
import { Reducer, useCallback, useEffect, useReducer } from "react";
import { forkJoin, Subscription } from "rxjs";
import appMessageService, { messageType } from "services/app-message-service";
import authenticationService from "services/authentication-service";
import { AppAction, AppActionEnum, appReducer, AppState } from "./app-store";

export default function useApp() {
  const [subscription] = commonService.useSubscription();
  // reducer
  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(
    appReducer,
    {
      isLoggedIn: false,
      isSuccess: false,
      successMessage: false,
      isError: false,
      errorMessage: "",
      loading: false,
      isErrorModalVisible: false,
      toggleMenu: false,
      displayFooter: false,
      displayOverlay: false,
      extendPageMaster: false,
      user: undefined,
      isCheckingAuth: true,
    },
  );

  const {
    isLoggedIn,
    isSuccess,
    successMessage,
    isError,
    errorMessage,
    loading,
    isErrorModalVisible,
    toggleMenu,
    displayFooter,
    displayOverlay,
  } = state;

  const currentPath = `${LOGIN_ROUTE}?redirect=${window.location.pathname}`;

  useEffect(() => {
    const subscription = new Subscription();
    subscription.add(
      forkJoin([authenticationService.checkAuth(), authenticationService.getConfiguration()]).subscribe((results: [Model, any]) => {
        if (results[0] && results[1]) {
          const stringValue = JSON.stringify(results[1]);
          localStorage.setItem('dataConfiguration', stringValue);
          dispatch({ type: AppActionEnum.LOG_IN, user: results[0] });
        } else {
          window.location.href = currentPath;
        }
      })
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [currentPath]);

  useEffect(() => {
    const successSubscription: Subscription = appMessageService
      ._success()
      .subscribe(
        appMessageService.handleNotify({
          type: messageType.SUCCESS,
          title: "thanh cong",
        }),
      ); // subscribe success

    const errorSubscription: Subscription = appMessageService
      ._error()
      .subscribe(
        appMessageService.handleNotify({
          type: messageType.ERROR,
          title: "that bai",
        }),
      ); // subscribe error

    subscription.add(successSubscription);
    subscription.add(errorSubscription);
  }, [subscription]); // subcribe appMessageService

  const handleToggleOverlay = useCallback(() => {
    dispatch({
      type: AppActionEnum.SET_OVERLAY,
      displayOverlay: !displayOverlay,
    });
  }, [displayOverlay]); // handle turn off overlay


  const handleCloseErrorModal = useCallback(() => {
    dispatch({ type: AppActionEnum.CLOSE_ERROR_MODAL });
  }, []); // handle close error modal

  return {
    isLoggedIn,
    isSuccess,
    successMessage,
    isError,
    errorMessage,
    loading,
    isErrorModalVisible,
    toggleMenu,
    displayFooter,
    displayOverlay,
    handleToggleOverlay,
    handleCloseErrorModal,
    dispatch,
    appMessageService, // service instance
    state,
  };
}

export function useAuthorizedApp() {
  const [
    {
      permissionPaths,
      authorizedMenus,
      authorizedAction,
      authorizedMenuMapper,
    },
    dispatch,
  ] = useReducer<Reducer<AppState, AppAction>>(appReducer, {
    permissionPaths: [],
    authorizedMenus: [],
    authorizedAction: [],
    authorizedMenuMapper: null,
  });

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      authenticationService.listPath().subscribe((response) => {
        if (response.length > 0) {
          const menuMapper: Record<string, number> = {};
          const actions: string[] = [];
          response.forEach((path: string, index: number) => {
            if (path.match(MENU_URL_REGEX))
              menuMapper[`/${path as string}`] = index;
            if (path.match(ACTION_URL_REGEX)) actions.push(path);
          });
          dispatch({
            type: AppActionEnum.SET_PERMISSION,
            permissionPaths: [...response],
            authorizedMenus: menu.map((item: Menu) => {
              item.isShow = item.checkVisible(menuMapper);
              mapTreeMenu(item.Items, menuMapper);
              return item;
            }),
            authorizedAction: actions,
            authorizedMenuMapper: menuMapper,
          });
          return;
        }
        dispatch({
          type: AppActionEnum.SET_PERMISSION,
          authorizedMenuMapper: {
            hasAnyPermission: 0,
          },
        });
      },
        (err) => {
          dispatch({
            type: AppActionEnum.SET_PERMISSION,
            permissionPaths: [],
            authorizedMenus: [...menu],
            authorizedAction: [],
            authorizedMenuMapper: {},
          });
        }
      );
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    permissionPaths,
    authorizedMenus,
    authorizedMenuMapper,
    authorizedAction,
  };
}

const mapTreeMenu = (tree: MenuItem[], mapper: Record<string, number>) => {
  if (tree && tree.length > 0) {
    tree.forEach((item: MenuItem) => {
      const { path, children } = item;
      item.isShow = false;
      switch (item.type) {
        case 'sub':
          if (mapper.hasOwnProperty(path as string)) item.isShow = true;
          if (children) {
            mapTreeMenu(children, mapper);
          }
          break;
        case 'link':
          if (mapper.hasOwnProperty(path as string)) item.isShow = true;
          break;
      }
    });
  }
};