
import React from 'react';
import MD5 from '../lib/MD5.js';
import $ from 'superagent';
import Constant from '../lib/Constant';
import CookieHelper from '../lib/CookieHelper';

import { Modal } from 'react-bootstrap'; 

export default class ButtonLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    close = () => { this.setState({ showModal: false }); }
    open = () => { this.setState({ showModal: true }); }

    // After the Modal displayed
    handleEntered = () => {
        // read from cookie for usernames & pwd
        var uName = CookieHelper.getCookie(Constant.CookieUserName);
        var uPwd = CookieHelper.getCookie(Constant.CookiePwd);

        if (uName !== "") {
            this.refs.r_UserName.value = uName;
            if (uPwd !== "") {
                this.refs.r_Pwd.value = uPwd;
                this.refs.r_CheckRemember.checked = true;
            } else
                this.refs.r_Pwd.focus();
        } else
            this.refs.r_UserName.focus();

    }

    invokeLogin = (userInfo) => {
        if (!userInfo.name || !userInfo.pwd || userInfo.name === "" || userInfo.pwd === "") {
            console.warn("用户名和密码不能为空!");
            return;
        }
        var md5 = MD5.hex_md5(userInfo.pwd);
        /**
         *  1. 登录
         *  http://10.8.6.29:8080/app/29/rest/loginservice/login/yinshi/fcea920f7412b5da7be0cf42b8c93759
         */
        var loginUrl = Constant.ServerUrl + 'loginservice/login/' + userInfo.name + '/' + md5;
        $.post(loginUrl, function (data) {

            CookieHelper.setCookie(Constant.CookieUserName, userInfo.name, 10);
            if (userInfo.rememberMe)
                CookieHelper.setCookie(Constant.CookiePwd, userInfo.pwd, 10);
            else
                CookieHelper.setCookie(Constant.CookiePwd, "", -10);
            CookieHelper.setCookie(Constant.CookieAuto, userInfo.autoLogin, 10);

            // 2. 请求导航栏
            var navUrl = Constant.ServerUrl + "loginservice/GetNavigationGroup/" + userInfo.name;
            $.get(navUrl, function (data) {
                console.log("登录结束：");
                console.log(JSON.stringify(data));
                var navs = data["GetNavigationGroupResult"];
                // 长度为0 需要重新登陆 & 删除无效的cookie
                if (navs.length === 0) {
                    CookieHelper.clearCookie(Constant.CookieUserName);
                    CookieHelper.clearCookie(Constant.CookiePwd);
                } else {
                    this.props.onLogin(navs, userInfo.name);
                    // analyNavGroup(navs); 
                }

            }.bind(this));
            this.setState({ showModal: false });
        }.bind(this))
            .fail(function (err) {   // 登录异常，显示错误信息  
                var errorZone = this.refs.errorZone;
                errorZone.innerHTML = '<strong> Op! </strong>状态码:' + err.status + '  描述:' + err.statusText;
                errorZone.style.display = "block";
            }.bind(this));
    }

    handleSubmit = (e) => {

        var name = e.target.name.value;
        var pwd = e.target.password.value;
        var rememberMe = e.target.remember.checked;
        var autoLogin = e.target.autoLogin.checked;

        this.invokeLogin({ name: name, pwd: pwd, rememberMe: rememberMe, autoLogin: autoLogin });

        e.preventDefault();
    }



    render() { 
        return (
            <li>
                <a href="#" className="glyphicon navbar-brand" onClick={this.open}>登录</a>

                <Modal show={this.state.showModal} onHide={this.close} onEntered={this.handleEntered}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title" style={{ fontWeight: 'bold' }}>
                            登录
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group alert alert-danger glyphicon glyphicon-warning-sign" id="errorZone" ref="errorZone" style={{ display: 'none' }}>

                            </div>
                            <div className="form-group">
                                <label htmlFor="name">用户名:</label>
                                <input type="text"
                                    ref="r_UserName"
                                    name="name"
                                    className="form-control"
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">密码:</label>
                                <input type="Password"
                                    ref="r_Pwd"
                                    name="password"
                                    className="form-control"
                                    required
                                    />
                            </div>
                            <div className="form-group">
                                <label>
                                    <input type="checkbox" name="remember" ref="r_CheckRemember" />
                                    <strong>记住我</strong>
                                </label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <label>
                                    <input type="checkbox" name="autoLogin" />
                                    <strong>自动登陆</strong>
                                </label>
                            </div>
                            <div className="form-actions no-color text-center">
                                <input type="submit"
                                    value="登录"
                                    className="btn btn-success"
                                    style={{ fontWeight: 'bold' }}
                                    />
                                &nbsp;&nbsp;&nbsp;
                                <input type="reset"
                                    value="重置"
                                    className="btn btn-warning"
                                    style={{ fontWeight: 'bold' }} />
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

            </li>
        );
    }
}  