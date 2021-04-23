import React, { Fragment, ReactNode } from "react";
import "./AppFooter.scss";

export interface AppFooterProps {
  onSave?: () => void;
  onCancel?: () => void;
  childrenAction?: ReactNode;
  childrenStep?: ReactNode;
}
function AppFooter(props: AppFooterProps) {
  const { childrenAction, childrenStep } = props;

  return (
    <Fragment>
      <div style={{ opacity: 0, height: "75px", marginTop: "20px" }}></div>
      <footer className="app-footer">
        <div className="app-footer__full d-flex justify-content-between align-items-center">
          <div className="app-footer__steps">{childrenStep}</div>
          <div className="app-footer__actions d-flex justify-content-end mr-2">
            {childrenAction}
          </div>
        </div>
      </footer>
    </Fragment>
  );
}

export default AppFooter;
