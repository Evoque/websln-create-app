
import React from 'react';
import Constant from '../lib/Constant';
import CookieHelper from '../lib/CookieHelper';
import MD5 from '../lib/MD5.js';
import $ from 'superagent';

/** components */
import NaviLogin from './NaviLogin'; 
import NavBarItem from './NavBarItem';
import NavBarListItem from './NavBarListItem';  


export default class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            items: [],
            currentUser: ""
        }
    }

    /**
     * 自动登录， func: componentWillMount  & fetchData
     */
    componentWillMount = () => {
        var isAuto = CookieHelper.getCookie(Constant.CookieAuto);
        if (isAuto) {
            var uName = CookieHelper.getCookie(Constant.CookieUserName);
            var uPwd = CookieHelper.getCookie(Constant.CookiePwd);
            if (uName !== "" && uPwd !== "") {
                this.fetchData({ name: uName, pwd: uPwd })
            }
        }
    }

    fetchData = (userInfo) => {
        if (!userInfo.name || !userInfo.pwd || userInfo.name === "" || userInfo.pwd === "") {
            return;
        }
        var md5 = MD5.hex_md5(userInfo.pwd);
        var loginUrl = Constant.ServerUrl + 'loginservice/login/' + userInfo.name + '/' + md5;
        $.post(loginUrl, function (data) {
            var navUrl = Constant.ServerUrl + "loginservice/GetNavigationGroup/" + userInfo.name;
            $.get(navUrl, function (data) {
                var navs = data["GetNavigationGroupResult"];
                if (navs.length > 0) {
                    this.handleLogin(navs, userInfo.name);
                    // analyNavGroup(navs);  
                }
            }.bind(this));
        }.bind(this));
    }

    /**
     * 解析登录后获得的模块
     */
    handleLogin = (modules, user) => {
        // 解析items 
        var subModules = modules.filter(x => x.ParentID !== Constant.TopModuleID);
        var parentModules = modules.filter(x => x.ParentID === Constant.TopModuleID);

        subModules.map(mod => {
            var parentModule = parentModules.find(p => p.ID === mod.ParentID);
            if (parentModule) {
                parentModule.SubModules = parentModule.SubModules || [];
                parentModule.SubModules.push(mod);
            }
            return mod;
        });
        this.setState({
            isLogin: true,
            items: parentModules,
            currentUser: user
        });
    }

    handleLogout = () => {
        this.setState({
            isLogin: false,
            items: []
        });
    }

    handleClick = (groupId) => {
        console.log("GroupID: --> " + groupId);
        var reUrl = Constant.ServerUrl + 'loginservice/GetNavigationModule/' + CookieHelper.getCookie(Constant.CookieUserName) + "/" + groupId;
        console.log('开始请求侧边栏: --> ' + reUrl);
        $.get(reUrl, function (data) {
            var moduleArray = data["GetNavigationModuleResult"];
            if (this.props.onTopClick) {
                this.props.onTopClick(moduleArray);
            }
        }.bind(this));
    }


    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid navbar-evo">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                            aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand glyphicon glyphicon-home" href="#">.主页</a>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            {
                                this.state.items.map(item =>
                                    item.SubModules
                                        ? <NavBarListItem key={item.ID} id={item.ID} name={item.Name} subModules={item.SubModules} onTopClick={this.handleClick} />
                                        : <NavBarItem key={item.ID} id={item.ID} name={item.Name} onTopClick={this.handleClick} />
                                )
                            }
                        </ul>
                        <NaviLogin isLogin={this.state.isLogin}
                            currentUser={this.state.currentUser}
                            onLogin={this.handleLogin}
                            onLogout={this.handleLogout} />
                    </div>
                </div>
            </nav>
        );
    }


} 