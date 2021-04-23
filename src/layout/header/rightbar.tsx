import React, { Fragment, useState } from "react";
import man from "../../assets/images/dashboard/profile.jpg";
import {
  FileText,
  LogIn,
  Mail,
  User,
  Bell,
} from "react-feather";
// import i18next from "i18next";

const Rightbar = () => {
  // const [langdropdown, setLangdropdown] = useState(false);
  // const [selected, setSelected] = useState(i18next.language);
  const [notificationDropDown, setNotificationDropDown] = useState(false);

  // const handleSetLanguage = (key) => {
  //   i18next.changeLanguage(key);
  //   setSelected(key);
  // };

  // const LanguageSelection = (language) => {
  //   if (language) {
  //     setLangdropdown(!language);
  //   } else {
  //     setLangdropdown(!language);
  //   }
  // };

  return (
    <Fragment>
      <div className="nav-right col-10 pull-right right-header p-0">
        <ul className="nav-menus">
          {/* <li className="language-nav">
            <div
              className={`translate_wrapper ${langdropdown ? "active" : ""}`}
            >
              <div className="current_lang">
                <div
                  className="lang"
                  onClick={() => LanguageSelection(langdropdown)}
                >
                  <i
                    className={`flag-icon flag-icon-${
                      selected === "en"
                        ? "us"
                        : selected === "vi"
                        ? "vn"
                        : selected
                    }`}
                  ></i>
                  <span className="lang-txt">{selected}</span>
                </div>
              </div>
              <div className={`more_lang ${langdropdown ? "active" : ""}`}>
                <div className="lang" onClick={() => handleSetLanguage("vi")}>
                  <i className="flag-icon flag-icon-vn"></i>
                  <span className="lang-txt">Vietnamese</span>
                </div>
                <div className="lang" onClick={() => handleSetLanguage("en")}>
                  <i className="flag-icon flag-icon-us"></i>
                  <span className="lang-txt">
                    English<span> {"(US)"}</span>
                  </span>
                </div>
              </div>
            </div>
          </li> */}
          <li className="onhover-dropdown">
            <div
              className="notification-box"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <Bell />
              <span className="badge badge-pill badge-secondary">2</span>
            </div>
            <ul
              className={`notification-dropdown onhover-show-div ${
                notificationDropDown ? "active" : ""
              }`}
            >
              <li>
                <Bell />
                <h6 className="f-18 mb-0">Notification</h6>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-primary"> </i>Delivery
                  Processing<span className="pull-right">{"10 min."}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-success"></i>Order
                  Complete<span className="pull-right">{"1 hr"}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-info"></i>Tickets
                  Generated<span className="pull-right">{"3 hr"}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-danger"></i>Delivery
                  Complete<span className="pull-right">{"6 hr"}</span>
                </p>
              </li>
              <li>
                <button className="btn btn-primary">
                  Check All Notification
                </button>
              </li>
            </ul>
          </li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={man} alt="" />
              <div className="media-body">
                <span>{"Emay Walter"}</span>
                <p className="mb-0 font-roboto">
                  Admin <i className="middle fa fa-angle-down"></i>
                </p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li>
                <User />
                <span>Account </span>
              </li>
              <li>
                <Mail />
                <span>Inbox</span>
              </li>
              <li>
                <FileText />
                <span>Taskboard</span>
              </li>
              <li>
                <LogIn />
                <span>Log Out</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default Rightbar;
