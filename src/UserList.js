import React from "react";

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({newUser: e.target.value});
    }
    //通过props调用父组件的方法，新值用户
    handleClick() {
        if(this.state.newUser && this.state.newUser.length > 0) {
            this.props.onAddUser(this.state.newUser);
        }
    }
    //通过props 调用父组件的方法，设置当前选中的用户
    handleUserClick(userId) {
        this.props.onSetCurrentUser(userId);
    }

    render() {
        return (
            <div>
                <ul className="user-list">
                    {this.props.users.map((user) => {
                        return (
                            <li key={user.id}
                                className={(this.props.currentUserId == user.id) ? 'current' : ''}
                                onClick={this.handleUserClick.bind(this, user.id)}
                            >
                                <span>{user.name}</span>
                            </li>
                        );
                    })}
                </ul>
                <input onChange={this.handleChange} value={this.state.newUser} />
                <button onClick={this.handleClick}>新增</button>
            </div>
        )
    }
}

export default UserList;