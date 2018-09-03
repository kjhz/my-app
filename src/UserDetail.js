import React from "react";

export function UserDetail(props) {
    return (
        <div>
            {props.currentUser ? 
                (<div>
                    <div>用户姓名：{props.currentUser.name}</div>
                    <div>用户年龄：{props.currentUser.age}</div>
                    <div>用户联系方式：{props.currentUser.phone}</div>
                    <div>家庭地址：{props.currentUser.address}</div>
                </div>)
                : ''
            }
        </div>
    );
}