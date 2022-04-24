import axios from "axios";
import HOST from "../API/Host";
class NotificationService {
  getAllTokenActive() {
    return axios.get(`${HOST}/token/getAllTokenActive`);
  }

  async sendPushNotification(token, title, body, navigate, item) {
    const message = {
      to: token,
      sound: "default",
      title: title,
      body: body,
      data: { navigation: navigate, data: item },
    };

    console.log(message);

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
}
export default new NotificationService();
