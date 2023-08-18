const { default: axios } = require("axios");
const { toEn } = require("../utils");
const https = require('https');

const username = '9191402617';
const password = 'ML%236S';

export const sendSMS  = (phoneNumber , text) => {
  const data = {
    'from': '50004001402617',
    'to': toEn(phoneNumber) ,
    'text': text
  };
  axios.post(`https://console.melipayamak.com/api/send/simple/${process.env.MELI_PAYAMAK_TOKEN}` , data)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false
    })

}

const refererCustomerSms = (phoneNumber , refererName , referedName) => {
  const data = JSON.stringify({
    'bodyId': 139352,
    'to': toEn(phoneNumber),
    'args': [refererName , referedName]
  });

  const options = {
    hostname: 'console.melipayamak.com',
    port: 443,
    path: '/api/send/shared/f4b71c314be949ec93fa7a65851c4786',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
  };

  const req = https.request(options, res => {
      res.on('data', d => {
          process.stdout.write(d)
      });
  });

  req.on('error', error => {
      // tslint:disable-next-line:no-console
      console.error(error);
  });

  req.write(data); 
}

const signUpByCustomerSms = (phoneNumber , customerName , referCode) => {
  const data = JSON.stringify({
    'bodyId': 139350,
    'to': toEn(phoneNumber),
    'args': [customerName , referCode]
  });

  const options = {
    hostname: 'console.melipayamak.com',
    port: 443,
    path: '/api/send/shared/f4b71c314be949ec93fa7a65851c4786',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
  };

  const req = https.request(options, res => {
      res.on('data', d => {
          process.stdout.write(d)
      });
  });

  req.on('error', error => {
    // tslint:disable-next-line:no-console
      console.error(error);
  });

  req.write(data); 
}

const customerSignupByAdmin = (phoneNumber , customerName , referCode) => {

  const bodyId = 140017;
  const url = `https://api.payamak-panel.com/post/send.asmx/SendByBaseNumber?username=${username}&password=${password}&text=${customerName}&text=${referCode}&to=${phoneNumber}&bodyId=${bodyId}`;
  axios.get(url)
  .then(() => {
    return true;
  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
    return false
  })

}

const noticeCustomer = (phoneNumber , customerName , serviceName ) => {
  const bodyId = 155837;
  const url = `https://api.payamak-panel.com/post/send.asmx/SendByBaseNumber?username=${username}&password=${password}&text=${customerName}&text='ترمیم '&text=${serviceName}&to=${phoneNumber}&bodyId=${bodyId}`;
  axios.get(url)
  .then(() => {
    return true;
  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
    sendSMS("09033062112" , "we have some problems in notices")
  })

}

const afterReceptionSMS = (phoneNumber , customerName ) => {
  const bodyId = 141221;
  const url = `https://api.payamak-panel.com/post/send.asmx/SendByBaseNumber?username=${username}&password=${password}&text=${customerName}&to=${phoneNumber}&bodyId=${bodyId}`;
  axios.get(url)
  .then(() => {
    return true;
  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
    return false
  })

}

const sendOTP = (otpCode , phoneNumber) => {
  const data = JSON.stringify({
    'bodyId': 133705,
    'to': phoneNumber,
    'args': [otpCode]
  });

  const options = {
    hostname: 'console.melipayamak.com',
    port: 443,
    path: '/api/send/shared/f4b71c314be949ec93fa7a65851c4786',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
  };

  const req = https.request(options, res => {
      res.on('data', d => {
          process.stdout.write(d)
      });
  });

  req.on('error', error => {
    // tslint:disable-next-line:no-console
    console.error(error);
  });

  req.write(data);  
  req.end();

}
  
export const getCredit = () => {
  try {
    axios.get('https://console.melipayamak.com/api/receive/credit/f4b71c314be949ec93fa7a65851c4786').then((response) => {
      if (response.data.amount <= 50) {
        sendSMS("09033062112" , "sms provider credit need to recharge")
        sendSMS("09335255362" , "پروایدر اس ام اس نیاز به شارژ دارد")
        return;
      }
    })
  } catch (error) {
    sendSMS("09033062112" , "get credit had some Problem")
    // tslint:disable-next-line:no-console
    console.log(error);
  }

}

export default sendSMS

// module.exports = {
//     sendSMS,
//     sendOTP,
//     customerSignupByAdmin,
//     signUpByCustomerSms,
//     refererCustomerSms,
//     getCredit,
//     noticeCustomer,
//     afterReceptionSMS
// } ;