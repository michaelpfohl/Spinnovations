import React, { Component } from "react";
import { User } from "../../Helpers/Interfaces/UserInterfaces";
import userData from "../../Helpers/Data/userData";

type ProfileFormProps = {
    user: User;
    onUpdate?: () => void;
};

class ProfileForm extends Component<ProfileFormProps, User> {
  state: User = {
    id: this.props.user?.id,
    first_Name: this.props.user?.first_Name || "",
    last_Name: this.props.user?.last_Name || "",
    address: this.props.user?.address || "",
    city: this.props.user?.city || "",
    country: this.props.user?.country || "",
    postal_Code: this.props.user?.postal_Code || "",
    display_Name: this.props.user?.display_Name,
    image_Url: this.props.user?.image_Url || "",
    state: this.props.user?.state || "",
    user_Created_Date: this.props.user.user_Created_Date,
    firebase_Uid: this.props.user.firebase_Uid,
    email: this.props.user.email
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    userData.updateUser(this.state).then(() => {
        if (this.props.onUpdate) {
          this.props.onUpdate();
        }
      });
  };

  render(): JSX.Element {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <div className="product-form-container">
            <h1 className="product-form-header">Update Profile</h1>
            <div className="d-flex justify-content-center">
              <form onSubmit={this.handleSubmit} className="add-Product-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="first_Name"
                    value={this.state.first_Name}
                    onChange={this.handleChange}
                    placeholder="First Name"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={50}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="last_Name"
                    value={this.state.last_Name}
                    onChange={this.handleChange}
                    placeholder="Last Name"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={50}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="display_Name"
                    value={this.state.display_Name}
                    onChange={this.handleChange}
                    placeholder="Display Name"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={20}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                    placeholder="Address"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                    placeholder="City"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={50}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="state"
                    value={this.state.state}
                    onChange={this.handleChange}
                    placeholder="State"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={30}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleChange}
                    placeholder="Country"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={60}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="postal_Code"
                    value={this.state.postal_Code}
                    onChange={this.handleChange}
                    placeholder="Postal Code"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="image_Url"
                    value={this.state.image_Url}
                    onChange={this.handleChange}
                    placeholder="Profile Picture"
                    className="form-control form-control-lg m-2 modal-input"
                    maxLength={200}
                    required
                  />
                </div>
                <button className="btn btn-success form-button form-button-text mt-1 mb-1">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileForm;
