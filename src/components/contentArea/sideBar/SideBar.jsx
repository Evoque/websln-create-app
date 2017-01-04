
import React from 'react';
import BarItem from './SideBarItem';
import './sidebar.css';


class SideBar extends React.Component { 

    render() {
        // <li><a className={this.props.sideModules.length > 0 ? "glyphicon glyphicon-th-list" : "glyphicon glyphicon-th-large"}> 导航</a></li>
        return (
            <div className="col-sm-3 col-md-2 sidebar" ref="ref_SideBar">
                <div className="showleft showbutton" onClick={this.handleSlideClick} ref="ref_Btn">
                    <span className="glyphicon glyphicon-chevron-left" aria-describedby="left-c"></span>
                </div>
                <div className="navleft-title">
                    <span className="glyphicon glyphicon-th-list">&nbsp;</span>
                    导航
                </div>
                <ul className="nav nav-sidebar">
                    {
                        this.props.sideModules.length > 0
                            ? this.props.sideModules.map(item =>
                                <BarItem key={item.Guid}
                                    barName={item.Name}
                                    url={item.Url}
                                    uid={item.Guid}
                                    isActive={item.Guid === this.props.activeId}
                                    onSideBarClick={this.props.onSideBarClick.bind(null)}
                                    />
                            )
                            : null
                    }
                </ul>
            </div>
        );
    }

    /**
     * 侧边栏隐藏 & 展开
     */
    /**
    handleSlideClick = () => {

        var sideBar = this.refs.ref_SideBar;
        var leftBtn = this.refs.ref_Btn;
        var sideWidth = $(sideBar).outerWidth();
        var mainWidth = $('.main').outerWidth();

        var isLeft = $(leftBtn).find('span').hasClass('glyphicon-chevron-left');
        if (isLeft) {
            $(sideBar).animate({ left: -sideWidth + 15 }, "slow");

            $('.main').animate({ 'margin-left': '0px', 'width': '99%' }, "slow", function () {
                $(this).removeClass('col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2')
                    .addClass('col-sm-12 col-md-12').removeAttr('style');

                $(leftBtn).find('span').removeClass('glyphicon-chevron-left')
                    .addClass('glyphicon-chevron-right');
            });

        } else {
            $(sideBar).animate({ left: '0px' }, "slow");

            $('.main').animate({ 'margin-left': sideWidth, 'width': mainWidth }, "slow", function () {
                $(this).removeClass('col-sm-12 col-md-12')
                    .addClass('col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2')
                    .removeAttr('style');

                $(leftBtn).find('span').removeClass('glyphicon-chevron-right')
                    .addClass('glyphicon-chevron-left');
            })
        }
    }

     */


}

export default SideBar;