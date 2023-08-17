// Function to generate a reception ID in the format of an invoice
const generateReceptionID = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
    return `INV${year}${month}${day}${hour}${minute}${randomDigits}`;
  }
  
module.exports = {
    generateReceptionID
}