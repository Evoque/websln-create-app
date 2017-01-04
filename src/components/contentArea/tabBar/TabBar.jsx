

import React from 'react';
import TabBarItem from './TabBarItem.jsx';
import TabTool from './TabTool.jsx';


/**
*  生成内容页的tab标签：包括settings(关闭所有||其他) & 已经打开的页面
*/
export default ({tabItems, activeId, onTabBarClick, onCloseClick, onCloseOther, onCloseAll}) => {
    return (
        <ul className="nav nav-tabs">
            <TabTool onCloseOther={onCloseOther.bind(null)}
                onCloseAll={onCloseAll.bind(null)} />

            {
                tabItems.map(item =>
                    <TabBarItem key={item.uid} name={item.name} uid={item.uid}
                        isActive={item.uid === activeId}
                        onTabBarClick={onTabBarClick.bind(null, item.uid)}
                        onCloseClick={onCloseClick.bind(null, item.uid)}
                        />
                )
            }
        </ul>
    );
}


