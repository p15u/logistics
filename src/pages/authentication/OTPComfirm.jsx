import React, { useState } from "react";
import "./Forget.css";
import Authentication from "../../service/Service/Authentication";
import loading from "../../assets/images/icons/load.gif";
const OtpComfirm = (props) => {
  const [show, setShow] = useState(false);
  const [styleMess, setStyleMess] = useState("messNormal");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(
    `Vui lòng nhập OTP để xác thực tài khoản của bạn`
  );

  const sendOTP = () => {
    console.log(props.location.state);
    if (otp == props.location.state.number) {
      setMessage("");
      props.history.push({
        pathname: "/resetpass",
        state: {
          idUser: props.location.state.idUser,
        },
      });
    } else {
      setStyleMess("messError");
      setMessage("Mã xác thực không chính xác. Vui lòng kiểm tra lại");
    }
  };
  const reSendOTP = async () => {
    setShow(true);
    setOtp("");
    setMessage("Vui lòng chờ trong giây lát... ");
    await Authentication.getForgotPass(props.location.state.email).then(
      (response) => {
        setShow(false);
        if (response.data != null) {
          setMessage("Vui lòng kiểm tra email ");
          props.location.state.number = response.data.number;
        } else {
          setMessage("Xảy ra lỗi vui lòng thử lại sau");
        }
      }
    );
  };
  return (
    <div className="main">
      <section className="forget-password">
        <div className="container">
          <div className="logisic-logo">Logistic</div>
          <div className="forget-content">
            <div className="forget-form">
              <h2 className="form-title">Xác Nhận OTP ?</h2>
              <div className="form-alert">
                Mã OTP (mật khẩu dùng một lần) đã được gửi đến
                <text className="email">
                  {" " + props.location.state.email}
                </text>
                <br />
              </div>
              <div className={styleMess}>
                <div dangerouslySetInnerHTML={{ __html: message }} />
              </div>

              <div className="forget-input ">
                <input
                  type="number"
                  value={otp}
                  placeholder="Nhập mã OTP của bạn..."
                  className="input"
                  onChange={(value) => setOtp(value.target.value)}
                />
              </div>
              <div className="kUXNCx">
                <button className="ffwHVz" onClick={sendOTP}>
                  Tiếp Tục
                </button>
                <div className="repeat-otp">
                  <text onClick={reSendOTP}>Giử lại OTP</text>
                  {show && <img className="load-otp" src={loading} alt="" />}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img className="nav-blue" src={BlueOther} alt="" />
        <img className="nav-last" src={blue} alt="" /> */}
      </section>
    </div>
  );
};

export default OtpComfirm;
