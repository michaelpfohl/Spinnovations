import React from 'react';
import userData, { User } from '../Helpers/Data/userData';

class Users extends React.Component {
    state = {
        users: []
    };

    componentDidMount(): void {
        userData.getAllUsers().then((response : User[]) => {
            this.setState({ 
                users: response 
            })
        });
    }

    render() : JSX.Element {
        const { users } = this.state;

        const userCard = (user: User) => {
            return (
                <div key={user.id}>
                    <h1>{user.first_Name}</h1>
                </div>
            )
        }
        console.log("users", users)
        const cards = users.map(userCard);
        console.log("users", users)

        return (
            <>
            <h2>Users</h2>
            {cards}
            </>
        )
    }
}

export default Users;