import React from 'react';
import userData from '../Helpers/Data/userData';
import { User } from '../Helpers/Interfaces/UserInterfaces';

type UserProps = {
    user: User | null
}

type UserState = {
    users?: User[],
    user?: User | null
}

class Users extends React.Component<UserProps, UserState> {
    state = {
        users: [],
        user: null
    };

    componentDidMount(): void {
        const { user } = this.props;
        userData.getAllUsers().then((response : User[]) => {
            this.setState({ 
                users: response 
            })
        });
        this.setState({ user: user })
    }

    render() : JSX.Element {
        const { users, user } = this.state;

        const userCard = (user: User) => {
            return (
                <div key={user.id}>
                    <h1>{user.first_Name}</h1>
                </div>
            )
        }
        const cards = users.map(userCard);
        console.log(user);
        return (
            <>
            <h2>Users</h2>
            {cards}
            </>
        )
    }
}

export default Users;