import React from 'react';
import ProfileForm from '../Components/Forms/ProfileForm';
import { User } from '../Helpers/Interfaces/UserInterfaces';

type UpdateProfileProps = {
    user: User,
}

class UpdateProfile extends React.Component<UpdateProfileProps> {
    render() : JSX.Element {
        const { user } = this.props;
        return (
            <>
                <h1>Profile Information</h1>
                <ProfileForm user={user}/>
            </>
        )
    }
}

export default UpdateProfile;