import React, { useState, useEffect } from "react";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import anhbiasignup from "../../assets/images/anhbia.png";

import ProfileApi from "../../service/Service/profileService";
import "bootstrap/dist/css/bootstrap.min.css";
//import blue from "../assets/images/blue.png";
//import BlueOther from "../assets/images/orderblue.png";
import "./SignUp.css";
import Select from "react-select";

import Alert from "@material-ui/lab/Alert";
import Authentication from "../../service/Service/Authentication";

//import CompanyApi from "../service/Service/Authentication";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gpkd, setGpkd] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const [error, setError] = useState("");

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    ProfileApi.getProvince().then((res) => {
      setListProvince(res.data);
    });
    ProfileApi.getDistrict().then((res) => {
      setListDistrict(res.data);
    });
    ProfileApi.getWards().then((res) => {
      setListWards(res.data);
    });
  }, []);
  const handleRegister = async (e) => {
    const re =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    const pass = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/;
    const phoneNum =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (
      (email || name || tax || phone || password || passwordComfirm || gpkd) ===
      ""
    ) {
      setError("Vui l??ng kh??ng ????? tr???ng");
    } else if (email === "") {
      setError("Vui l??ng nh???p Email");
    } else if (name === "") {
      setError("Xin vui l??ng nh???p t??n");
    } else if (tax === "") {
      setError("Xin vui l??ng nh???p M?? S??? Thu???");
    } else if (phone === "") {
      setError("Xin vui l??ng nh???p S??? ??i???n Tho???i");
    } else if (phoneNum.test(phone) === false) {
      setError("?????nh d???ng s??? ??i???n tho???i sai");
    } else if (password === "") {
      setError("Xin vui l??ng nh???p m???t kh???u");
    } else if (passwordComfirm === "") {
      setError("Xin vui l??ng nh???p m???t kh???u X??c Th???c");
      // } else if (gpkd === "") {
      //   setError("Xin vui l??ng nh???p gi???y ph??p kinh doanh");
    } else if (email.length > 100) {
      setError("Email ph???i ?????m b???o: ????? d??i kh??ng qu?? 100 k?? t???");
    } else if (re.test(email) === false) {
      setError("?????nh d???ng sai Emai! - v?? d???: nguyenvana@gmail.com");
    } else if (pass.test(password) === false) {
      setError(
        "M???t kh???u ph???i: d??i 8-50 k?? t???, c?? ??t nh???t 1 ch??? c??i (a-z ho???c A-Z) v?? 1 s??? v?? c?? 1 k?? t??? ?????c bi???t"
      );
    } else if (pass.test(passwordComfirm) === false) {
      setError(
        "X??c nh???n M???t kh???u ph???i: d??i 8-50 k?? t???, c?? ??t nh???t 1 ch??? c??i (a-z ho???c A-Z) v?? 1 s??? v?? c?? 1 k?? t??? ?????c bi???t"
      );
    } else if (password != passwordComfirm) {
      setError("M???t kh???u kh??ng kh???p");
    } else {
      const data = {
        name: name,
        emailUser: email,
        phone: phone,
        masothue: tax,
        passwordUser: password,
        status: 3,
        idRole: 3,
        idWards: ward.id,
        address: address,
      };
      console.log(data);
      await Authentication.registerCompany(data).then((res) => {
        if (res.data == -1) setError("Email ???? ???????c ????ng k??");
        else if (res.data == 0) setError("????ng k?? th???t b???i. Vui l??ng th??? l???i");
        else
          props.history.push({
            pathname: "/login",
            state: {
              mess: "regis",
            },
          });
      });
    }
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 30,

      borderWeight: 1,
      borderColor: "black",
      borderRadius: 10,
      margin: 1,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 4,
    }),
    multiValue: (base) => ({
      ...base,
      // backgroundColor: variables.colorPrimaryLighter,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px 0px",
      minHeight: 30,
      height: 42,
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      minHeight: 30,
    }),
  };
  return (
    <div style={{ width: "100%" }}>
      <div className="header">????ng k?? doanh nghi???p</div>
      <Row>
        <Form
          style={{
            width: 300,
            marginTop: 150,
            marginLeft: 60,
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicAccout">
            <Form.Control
              type="text"
              placeholder="T??n c??ng ty"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setError("")}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => setError("")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="number"
              placeholder="S??? ??i???n tho???i"
              onChange={(e) => setPhone(e.target.value)}
              onFocus={(e) => setError("")}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="password"
              placeholder="M???t kh???u"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => setError("")}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="X??c nh???n m???t kh???u"
              onChange={(e) => setPasswordComfirm(e.target.value)}
              onFocus={(e) => setError("")}
            />
          </Form.Group>
          {/* <div row>
            <Button style={{ backgroundColor: "#809fff" }}>???nh ?????i di???n</Button>
          </div> */}
        </Form>
        <Form
          style={{
            width: 350,
            // marginTop: 150,
            // marginLeft: 60,
          }}
        >
          <Container className="col" style={{ marginTop: 150 }}>
            <Form.Group className="mb-3" style={{ width: 278 }}>
              <Select
                className="mb-2 "
                placeholder="Ch???n t???nh/th??nh ph???"
                value={province}
                styles={customStyles}
                options={listProvince.map((item) => ({
                  ...item,
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(province) => setProvince(province)}
                onFocus={(e) => setError("")}
              />

              <Select
                className="selectOption mb-1"
                placeholder="Ch???n huy???n/qu???n"
                value={district}
                styles={customStyles}
                isDisabled={!province}
                options={listDistrict
                  .filter((d) => d.idProvince === province.id)
                  .map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.name,
                  }))}
                onChange={(district) => setDistrict(district)}
                onFocus={(e) => setError("")}
              />
              <Select
                placeholder="Ch???n x??/ph?????ng"
                value={ward}
                styles={customStyles}
                isDisabled={!district}
                options={listWards
                  .filter((d) => d.idDistrict === district.id)
                  .map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.name,
                  }))}
                onChange={(ward) => setWard(ward)}
                onFocus={(e) => setError("")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="?????a ch???"
                onChange={(e) => setAddress(e.target.value)}
                onFocus={(e) => setError("")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="M?? s??? thu???"
                onChange={(e) => setTax(e.target.value)}
                onFocus={(e) => setError("")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            {/* <Form.Group controlId="formFile" className="mb-3">
              <Form.Text> Gi???y ph??p kinh doanh</Form.Text>
              <Form.Control type="file" label="Gi???y ph??p kinh doanh" />
            </Form.Group> */}
          </Container>
        </Form>
        {/* <Col> */}

        {/* </Col> */}
      </Row>
      <img className="imgBia" alt="" src={anhbiasignup} />
      <div style={{ marginLeft: 70, width: 600 }}>
        <Form.Group controlId="formBasicAccout" className="col">
          {error && <Alert severity="error">{error}</Alert>}
        </Form.Group>
      </div>

      <Button
        style={{ marginTop: 10, marginLeft: 135, width: 400 }}
        className="primary"
        variant="primary"
        size="lg"
        onClick={handleRegister}
      >
        ????ng k??
      </Button>
      <Button
        style={{
          // backgroundColor: "#255464",
          marginTop: 70,
          marginLeft: 135,
          width: 400,
        }}
        className="primary"
        variant="primary"
        size="lg"
        href="/login"
      >
        ????ng nh???p
      </Button>

      {/* <img className="nav-blue" src={BlueOther} alt="" />
      <img className="nav-last" src={blue} alt="" /> */}
    </div>
  );
};

export default SignUp;
