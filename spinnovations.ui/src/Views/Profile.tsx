import React from "react";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import { Link } from "react-router-dom";
import UpdateProfileModal from '../Components/Modals/UpdateProfileModal';
import userData from '../Helpers/Data/userData';


type UserProps = {
  user: User;
};

class Profile extends React.Component<UserProps> {

  state = {
    user: this.props.user,
  }

  onUpdate = (): void => {
    userData.getUserByFirebaseUid(this.state.user.firebase_Uid).then((response) => {
      this.setState({ user: response})
    })
  }

  render(): JSX.Element {
    const { user } = this.state;
    return (
      <div id="profilePage">
        {user != null && (
          <div className="profileCard">
            <div className="editBtn">
              <a href="/">
                <i className="fas fa-pencil-alt">...</i>
              </a>
            </div>
            <img src={user.image_Url} className="profilePhoto" />
            <div>
              <h3 className="userName">{user.display_Name}</h3>
              <div className="row d-flex justify-content-center">
                <div className="col-6">
                  <p>First Name: {user.first_Name|| "Not yet added"}</p>
                  <p>Last Name: {user.last_Name|| "Not yet added"}</p>
                  <p>Email: {user.email}</p>
                  <p>User Since: {user.user_Created_Date}</p>      
                </div>
                <div className="col-6">
                  <p>Address: {user.address || "Not yet added"}</p>
                  <p>City: {user.city || "Not yet added"}</p>
                  <p>State: {user.state || "Not yet added"}</p>
                  <p>Postal Code: {user.postal_Code || "Not yet added"}</p>
                  <p>Country: {user.country || "Not yet added"}</p>
                </div>  
              </div>
              <div className="buttonGroup">
                <UpdateProfileModal user={user} onUpdate={this.onUpdate}/> 
                <Link
                  to={{
                    pathname: "/orders",
                    state: {
                      user: user,
                    },
                  }}
                >
                  My Orders
                </Link>
                <a href="/" id="submitinnovation">
                  Submit an innovation
                </a>
              </div>
              <div className="buttonGroupTwo">
                <a href="/">My Payments</a>
                <a href="/">My Spins</a>
                <a href="/">Help</a>
              </div>
            </div>
            <div className="tailInfo">
              <h5>©2021 Spinnovations inc. 100 Spin Street, Suite 400</h5>
              <h5>Nashville, TN 37027</h5>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
