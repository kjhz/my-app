import React from "react";
import UserList from "./UserList";
import {UserDetail} from "./UserDetail";

class UserListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            users: [],
            currentUserId: null
        }
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleSetCurrentUser = this.handleSetCurrentUser.bind(this);
    }

    componentDidMount(){
        var that = this;
        fetch('/path/to/user-api')
            .then(function(response) {
                response.json()
            })
            .then(function(data) {
                that.setState({users: data})
            });
    }

    handleAddUser(user) {
        var that = this;
        fetch('/path/to/save-user-api', {
            method: 'POST',
            body: JSON.stringify({'username': user})
        }).then(function(response) {
            response.json().then(function(newUser) {
                that.setState((preState) => ({users: preState.users.concat([newUser])}));
            });
        });
    }

    handleSetCurrentUser(userId) {
        this.setState({
            currentUserId: userId
        });
    }

    render() {
        //根据 currentUserId 筛选出当前用户对象
        const filterUsers = this.state.users.filter((user) => (user.id === this.state.currentUserId));
        const currentUser = filterUsers.length > 0 ? filterUsers[0] : null;
        return (
            <div>
                <UserList users={this.state.users}
                        currentUserId={this.state.currentUserId}
                        onAddUser={this.handleAddUser}
                        onSetCurrentUser={this.handleSetCurrentUser}
                />
                <UserDetail currentUser={currentUser} />
            </div>
        )
    }
}

export default UserListContainer;