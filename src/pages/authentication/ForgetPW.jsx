import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Forget.css";
import { Button } from "react-bootstrap";
import Authentication from "../../service/Service/Authentication";
import loading from "../../assets/images/icons/load.gif";
const ForgetPass = () => {
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState("");
  let history = useHistory();
  const validateEmail = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    const result = expression.test(String(email).toLowerCase());
    setShowErr(result);
    if (!result) {
      setShowErr(
        "Địa chỉ email không hợp lệ. Vui lòng thử lại <br/>(VD: abc@gmail.com)"
      );
    } else {
      setShowErr("");
    }
    return result;
  };

  const sendEmail = () => {
    if (validateEmail(email)) {
      setShow(true);
      try {
        Authentication.getForgotPass(email).then((response) => {
          setShow(false);

          if (response.data !== "") {
            history.push({
              pathname: "/sendotp",
              state: {
                email: email,
                number: response.data.number,
                idUser: response.data.idUser,
              },
            });
          } else {
            setShowErr("Email chưa được đăng ký");
          }
        });
      } catch (e) {
        setShowErr("Email chưa được đăng ký");
      }
    }
  };
  return (
    <div className="main">
      <section className="forget-password">
        <div className="container">
          <div className="logisic-logo">Logistic</div>
          <div className="forget-content">
            <div className="forget-form">
              <h2 className="form-title">Quên Mật Khẩu ?</h2>
              <div className="form-alert">
                Đừng lo lắng! Chỉ cần nhập email của bạn và chúng tôi sẽ gửi cho
                bạn mã OTP để đặt lại mật khẩu.
              </div>
              <div className="forget-input ">
                <input
                  required
                  type="email"
                  value={email}
                  placeholder="Nhập email của bạn..."
                  className="input"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="kUXNCx">
                {/* <Link to="/login" className="return-home">
                  Trở lại ?
                </Link> */}
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" onClick={sendEmail}>
                    Gửi xác nhận
                    {show && <img className="load" src={loading} alt="" />}
                  </Button>
                </div>

                <div className="d-grid gap-2">
                  <div className="messError" style={{ textAlign: "center" }}>
                    <div dangerouslySetInnerHTML={{ __html: showErr }} />
                  </div>
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

export default ForgetPass;
