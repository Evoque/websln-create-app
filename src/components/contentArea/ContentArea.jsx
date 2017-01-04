
import React from 'react';
import SideBar from './sideBar/SideBar';
import TabBar from './tabBar/TabBar';
import ContentInfo from './rightContent/ContentInfo';
import update from 'immutability-helper';

import Qt210 from '../views/Qt210';
import Qt2250 from '../views/Qt2250';
import QtCold from '../views/QtCold';

export default class ContentArea extends React.Component {

    state = {
        // 临时用于在没有网络的情况下进行测试的
        sideModules: [
            {
                GroudID: 'e490d3ec-43d4-4213-8819-e1f387522507',
                GroupName: '质量追溯',
                Guid: '7b3dcc1c-c77a-475a-8933-2a428a2aeed8',
                Name: '210厂质量追溯',
                Url: '@Qt210?fuck'
            },
            {
                GroudID: 'e490d3ec-43d4-4213-8819-e1f387522507',
                GroupName: '质量追溯',
                Guid: '08757acc-d343-4870-a45b-970540805ade',
                Name: '2250厂质量追溯',
                Url: '@Qt2250?fuck'
            },
            {
                GroudID: 'e490d3ec-43d4-4213-8819-e1f387522507',
                GroupName: '质量追溯',
                Guid: 'd79e1942-8cc5-46bf-90ea-c700753e8aa0',
                Name: '冷轧厂质量追溯',
                Url: '@QtCold?fuck'
            },
            {
                GroudID: 'e490d3ec-43d4-4213-8819-e1f387522507',
                GroupName: '质量追溯',
                Guid: '6ccf30a9-54b4-4dc2-9f6b-73c49073cc4b',
                Name: '一炼轧厂质量追溯',
                Url: '@QtYi?fuck'
            }
        ],
        tabItems: [],
        pageInfos: [],
        MyComponents: {
            Qt210: Qt210,
            Qt2250: Qt2250,
            QtCold: QtCold
        }
    }


    // sideBar点击的处理Func
    // id, name, inforUrl, requestUrl
    handleSideBarClick = (info) => {

        var idx = info.url.indexOf('?');
        var infoUrl = info.url.substring(0, idx);
        var requestUrl = info.url.substring(idx + 1);

        if (this.state.activeId !== info.id) {
            this.setState({
                activeId: info.id
            });
        }

        var isClicked = false;
        this.state.tabItems.map(item => {
            if (item.uid === info.id) {
                isClicked = true;
            }
            return item;
        });
        if (!isClicked) {
            this.setState({
                tabItems: this.state.tabItems.concat({
                    uid: info.id,
                    name: info.name
                })
            });
 
            var cName = infoUrl.substr(infoUrl.indexOf('@') + 1); 
        }


    }

    // tabBar的点击事件
    handleTabBarClick = (id) => {

        if (this.state.activeId !== id) {
            this.setState({
                activeId: id
            });
        }
    }
    // 关闭tabItem
    handleTabClose = (id) => {
        console.log("关闭tabBar: --> " + id);

        var items = this.state.tabItems.filter(tab => tab.uid !== id);
        this.setState({
            activeId: items.length > 0 ? items[items.length - 1].uid : "",
            tabItems: items,
            pageInfos: this.state.pageInfos.filter(page => page.uid !== id)
        });
    }

    handleCloseAll = () => {
        this.setState({
            activeId: '',
            tabItems: [],
            pageInfos: []
        })
    }

    handleCloseOther = () => {
        console.log("关闭其他 ----> 执行!");
        this.setState({
            tabItems: this.state.tabItems.filter(item => item.uid === this.state.activeId),
            pageInfos: this.state.pageInfos.filter(page => page.uid === this.state.activeId)
        })
    }

    render() { 
        return (
            <div className="container-fluid">
                <div className="row">
                    <SideBar activeId={this.state.activeId} sideModules={this.state.sideModules} onSideBarClick={this.handleSideBarClick} />

                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

                        <TabBar activeId={this.state.activeId}
                            tabItems={this.state.tabItems}
                            onCloseAll={this.handleCloseAll}
                            onCloseOther={this.handleCloseOther}
                            onTabBarClick={this.handleTabBarClick}
                            onCloseClick={this.handleTabClose}
                            />
                        <ContentInfo MyComponent={this.state.MyComponents["Qt210"]}/>
                    </div>
                </div>
            </div>
        );
    }


}
