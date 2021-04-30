import React, { Component } from 'react';

class Profile extends Component {
  state = {
    userInformation: [],
  };

  render(): JSX.Element {
    return (
      <div id="profilePage">
        <div className="profileCard">
          <div className="editBtn">
            <a href="/"><i className="fas fa-pencil-alt">...</i></a>
          </div>
          <img
            src="https://lh3.googleusercontent.com/-GyoqBrE6u-4/XO97O2dokeI/AAAAAAAAASI/Gtg8XpPC5QYy98jtJEeM0N9K6x8GXW7dwCEwYBhgLKtQDAL1OcqzvFe8tSXllHyZmJKnzL75CAwdtktiphGSNtQEkn-p1AJ0S5WJ5AuH5FDE9JlBU9XOJJPlZa7XH36o8VcLyczkGEYfJHKUYBLz4vGQZIscr-vzYr4h-0A7efuyh5AbRD6Ztnletd8ytQPs_QRT1Ocrw8AtlNOrN_kog_szu0LNnSlRSuzNolXlGxpG8mO9W6T6G7Xe6O9pv0Hr_pwkN1zZRmGMh5Bj1yRWv9X8JNXD54xI9t1Ha7Xtx6fkcejzzOfljSrTZHTqoSEh3yb3pS-B2JLbJGYTBX9kKcG7V9dYD7UtMZO-RLPwfXzUz05FWxp9kHSDe3WVtZ3Cn0qvL-2X-QsvCfQY2yYwya8iEY0--rS7d2TrDQ6ioWcDO70Jurm57fJsboWpL_gzUVrUMhlYJ7-zb4LyZ8O_XKAoe1UIptLJ8oYmPDoJo3dh6BfqqfNc48OehbjEFYm4FdavC2lHgXgoKndiuS62-JpcotUde4_0tMVrXdaStkJAIUQXyRmQVhBPAURhCzMoxk6s43MX4gsU5VKnOrGkFg_LWYTvF4Jzm5c6HWCIjL_kTawTdrcjbfg36OCKf93QF_jtdJMa2rLpcH03eaHa9n5ro-DuTMM-gnoQG/w140-h140-p/download20190503024143.png"
            className="profilePhoto"
          />
          <div>
            <h3 className="userName">Bailey Dennis</h3>
            <div className="buttonGroup">
              <a href="/" id="acctinfo">
                Account Information
              </a>
              <a href="/" id="myorders">
                My Orders
              </a>
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
      </div>
    );
  }
}

export default Profile;
