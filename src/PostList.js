import React, { Component } from "react";
import {PostItem} from "./PostItem";

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.timer = null;
        this.handlerVote = this.handlerVote.bind(this);
    }

    componentDidMount() {
        //模拟异步从服务端获取数据
        this.timer = setTimeout(() => {
            this.setState({
                posts: [
                    {id:1, title: "大家一起来讨论React", author: "张三", date: "2018-9-2",vote:0 },
                    {id:2, title: "前端框架", author: "李四", date: " 2018-9-2" ,vote: 0},
                    {id:3, title: "web App", author: "王五", date: "2018-9-2",vote:0 }
                ]
            });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    handlerVote(id) {
        //根据id进行过滤，找到待修改 vote 属性的贴子，返回新的posts对象
        const posts = this.state.posts.map(item => {
            const newItem = item.id === id ? {...item, vote: ++item.vote} : item;
            return newItem;
        });
        this.setState({
            posts
        });
    }
    
    render() {
        return (
            <div>
                贴子列表
                <ul>
                    { this.state.posts.map(item =>
                        <PostItem
                            post={item}
                            onVote={this.handlerVote}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export default PostList;