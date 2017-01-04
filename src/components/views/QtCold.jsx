
import React from 'react';


class QtCold extends React.Component {

    render() {
        return (
            <div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr className="success"> 
                            <th><a href="#">内存</a></th>
                            <th><a href="#">冷轧冷轧</a></th>
                            <th><a href="#">PID</a></th>
                            <th><a href="#">冷轧的啦</a></th>
                            <th><a href="#">状态</a></th>
                            <th><a href="#">冷轧冷轧</a></th>
                            <th>
                                <a className="btn btn-info btn-sm">刷新</a>
                                <a className="btn btn-success btn-sm">启动ALL</a>
                                <a className="btn btn-danger btn-sm">停止ALL</a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <nav>
                    <ul className="pager">
                        <li className="previous disabled"><a href="#">qt210_Pre</a></li>
                        <li className="next disabled"><a href="#">qt210_Next</a></li>
                    </ul>
                </nav>
            </div>
        );
    }

}


export default QtCold;