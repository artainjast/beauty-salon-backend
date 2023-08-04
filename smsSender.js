// require('dotenv').config();
// const Sequelize = require('sequelize');
// const { QueryTypes } = require('sequelize');

// const db = new Sequelize('mysql://root:mjjiAFhmNOKVkIxiZoGnjX6o@grace.iran.liara.ir:32308/MariNail3'); 


//  try {
//    db.authenticate();
//    console.log('Connection has been established successfully.');
//  } catch (error) {
//    console.error('Unable to connect to the database:', error);
//  }

// const data = async () => {
//     let temp;
//    temp = await
//         db.query(
//         'SELECT FIRST_NAME , LAST_NAME , PHONE_NUMBER , mariNail_Receptions.ID FROM mariNail_Receptions INNER JOIN mariNail_Customers ON mariNail_Receptions.CUSTOMER_ID = mariNail_Customers.ID WHERE mariNail_Receptions.CREATED_AT BETWEEN 1680606000 AND 1680652500 '
//        , { type: QueryTypes.UPDATE });
//     console.log(temp);
// }

// console.log(data);

// const data = () => {
    
// }


const data = [
  {
    name: 'نيلوفر',
    phone: '09192156843'
  },
  {
    name: 'اعظم',
    phone: '09195579711'
  },
  {
    name: 'مهرابي',
    phone: '09368955202'
  },
  {
    name: 'الناز',
    phone: '09126232187'
  },
  {
    name: 'سمیه',
    phone: '09126232187'
  },
  {
    name: 'عطيه',
    phone: '09199095969'
  },
  {
    name: 'مهسا',
    phone: '09915549660'
  },
  {
    name: 'پريسا',
    phone: '09120585261'
  },
  {
    name: 'پگاه',
    phone: '09127231455'
  },
  {
    name: 'آنيا',
    phone: '09127231455'
  },
  {
    name: 'مريم',
    phone: '09198856395'
  },
  {
    name: 'مينا',
    phone: '09194544652'
  },
  {
    name: 'مهري',
    phone: '09121382313'
  },
  {
    name: 'اكرم',
    phone: '09106628287'
  },
  {
    name: 'ياسمن',
    phone: '09335222120'
  }
];

// const data2 = [{
//   name: ' sfحسین',
//   phone: '09033062112'
// }]
const { toEn } = require('./utils/index')
const axios = require('axios');
let unSuccessfull = [];
let successfully = [];
let i = 0;
data.map((item) => {
  try {
    axios
      .post('http://ippanel.com/api/select', {
        op: 'send',
        uname: 'U9033062112',
        pass: 'Med0023632666',
        message: `سلام ${item.name} عزیز به خانواده نیل مری خوش اومدی. nail-maryi.ir`,
        from: '+983000505',
        to: `+98${toEn(item.phone)}`
      })
      .then((res) => {
        successfully.push(...item);
        console.log(item);
        console.log(res.status);
        i++
      })
      .catch((err) => {
        unSuccessfull.push(item);
      });
    // console.log(process.env.SMS_PANEL_URL);
    // smsPanelAxios
    //   .post('/', {
    //     op: 'send',
    //     uname: 'U9033062112',
    //     pass: 'Med0023632666',
    //     message: `سلام ${item.name} عزیز به خانواده نیل مری خوش اومدی. nail-maryi.ir`,
    //     from: '+983000505',
    //     to: `+98${toEn(item.phone)}`
    //   })
    //   .then((res) => {
    //     successfully.push(...item);
    //     console.log(item);
    //     console.log(res.status);
    //   })
    //   .catch((err) => {
    //     unSuccessfull.push(item);
    //   });
  } catch (error) {
    console.log(error);
  }
  
})

console.log(unSuccessfull);
console.log('unSuccessfull' + unSuccessfull.length);
console.log(successfully);
console.log('successfully' + unSuccessfull.length);
console.log(i);