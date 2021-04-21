import React from 'react';
import userData from '../Helpers/Data/userData';

class Users extends React.Component {
    state = {
        users: [Users]
    };

    componentDidMount() {
        userData.GetAllUsers().then((data : User[]) => this.setState({ users:data }));
    }

    render() {
        let {users} = this.state;

        const userCard = (user) => {
            return (
                <div>
                    {user.first_name}
                </div>
            )
        };

        let cards = users.map(userCard);

        return (
            <>
            <h2>Users</h2>
            {cards}
            </>
        )
    }
}

export default Users;