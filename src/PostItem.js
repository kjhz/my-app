import React from "react";
import propTypes from "prop-types";
import like from "./favicon.ico"

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            post: props.post
        };
        this.handleVote = this.handleVote.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        //父组件更新post后，更新 PostItem的state
        if (this.props.post != nextProps.post) {
            this.setState({
                post: nextProps.post
            });
        }
    }
    //处理点赞事件
    handleVote() {
        this.props.onVote(this.props.post.id);
    }

    //保存/编辑按钮点击后的逻辑
    handleEditPost(){
        const editing = this.state.editing;
        //当前出于编辑态，调用父组件传递的 onSave 方法保存贴子
        if (editing) {
            this.props.onSave({
                ...this.state.post,
                date: this.getFormatDate()
            });
        }
        this.setState({
            editing: !editing
        });
    }

    handleTitleChange(event) {
        const newPost = { ...this.state.post, title: event.target.value};
        this.setState({
            post: newPost
        });
    }

    getFormatDate(){
        //省略
    }

    render() {
        const { post } = this.state;
        return (
            <li className="item">
                <div className="title">
                    {this.state.editing
                        ? <form>
                            <textarea 
                                value={post.title}
                                onChange={this.handleTitleChange}
                            />
                            </form>
                        : post.title
                    }
                </div>
                <div>
                    创建人：<span>{post.author}</span>
                </div>
                <div>
                    创建时间：<span>{post.date}</span>
                </div>
                <div className="like">
                    <span>
                        <img alt="vote" src={like} onClick={this.handleVote} />
                    </span>
                    <span>
                        {post.vote}
                    </span>
                </div>
                <div>
                    <button onClick={this.handleEditPost}>
                        {this.state.editing ? "保存" : "编辑"}
                    </button>
                </div>
            </li>
        );
    }
}

export  {PostItem};

