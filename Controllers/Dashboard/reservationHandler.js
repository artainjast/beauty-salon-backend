const db = require('../../Config/DBconfig'); // Import your Sequelize database instance
const {reservationCalenderModel} = require('../../models'); // Import your ReservationCalendar model
const {reservationSpaceModel} = require('../../models'); // Import your ReservationSpace model

const addReservationCalendar = async () => {
  let transaction;

  try {
    const {date ,startTime , endTime ,  maximumCount } = req.body
    // Convert start and end times to Unix timestamps
    const startTimeUnix = Math.floor(Date.parse(`${date} ${startTime}`) / 1000);
    const endTimeUnix = Math.floor(Date.parse(`${date} ${endTime}`) / 1000);

    // Start a transaction to ensure data consistency
    transaction = await db.transaction();

    // Create a reservation calendar entry
    const reservationCalendar = await ReservationCalendar.create(
      {
        startTime: startTimeUnix,
        endTime: endTimeUnix,
        currentSpace: 0,
        maximumSpace: maximumCount,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
        deleted_at: 0,
      },
      { transaction }
    );

    // Retrieve the newly created reservation calendar's ID
    const reservationCalendarId = reservationCalendar.id;

    // Create reservation space rows associated with the calendar ID
    const reservationSpaces = [];
    for (let i = 0; i < maximumCount; i++) {
      reservationSpaces.push({
        reservation_calender_id: reservationCalendarId,
        customer_id: null,
        space_state: 0,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
        deleted_at: 0,
      });
    }

    // Bulk insert the reservation space rows
    await ReservationSpace.bulkCreate(reservationSpaces, { transaction });

    // Commit the transaction
    await transaction.commit();

    console.log(`Reservation calendar created with ${maximumCount} spaces.`);
  } catch (error) {
    // Rollback the transaction if an error occurs
    if (transaction) {
      await transaction.rollback();
    }

    console.error('Error creating reservation calendar:', error);
  }
};

// Example usage:
const startTime = '10:00:00'; // Replace with your desired start time
const endTime = '11:00:00'; // Replace with your desired end time
const maximumCount = 5; // Replace with your desired maximum count

// const createDynamicRoutineReservations = async (req, res) => {
//   let transaction;

//   try {
//     // Start a transaction to ensure data consistency
//     transaction = await db.transaction();
//     // Convert open and close times to Unix timestamps for comparison
//     const openTimestamp = Date.parse(openTime);
//     const closeTimestamp = Date.parse(closeTime);
//     const startDateUnix = new Date(startDate * 1000);
//     const endDateUnix = new Date(endDate * 1000);
//     // Define the time interval in milliseconds based on the intervalInMinutes
//     const timeInterval = intervalInMinutes * 60 * 1000;

//     // Iterate over the date range
//     let currentDate = startDateUnix;
//     console.log(currentDate);
//     while (currentDate <= endDateUnix) {
//       // Calculate the start and end times for the reservation interval
//       const startTime = currentDate.getTime() / 1000; // Convert to Unix timestamp
//       const endTime = startTime + timeInterval;
//       // console.log(startTime >= openTimestamp && endTime <= closeTimestamp);
//       // Check if the interval falls within the open hours
//       if (startTime >= openTimestamp && endTime <= closeTimestamp) {
//         console.log('reach');
//         // Create a reservation calendar entry for this interval
//         const reservationCalendar = await ReservationCalendar.create(
//           {
//             startTime,
//             endTime,
//             currentSpace: 0,
//             maximumSpace: maxSpacesPerInterval,
//             created_at: Math.floor(Date.now() / 1000),
//             updated_at: Math.floor(Date.now() / 1000),
//             deleted_at: 0,
//           },
//           { transaction }
//         );

//         // Retrieve the newly created reservation calendar's ID
//         const reservationCalendarId = reservationCalendar.id;

//         // Create reservation space rows associated with the calendar ID
//         const reservationSpaces = [];
//         for (let i = 0; i < maxSpacesPerInterval; i++) {
//           reservationSpaces.push({
//             reservation_calender_id: reservationCalendarId,
//             customer_id: null,
//             space_state: 0,
//             created_at: Math.floor(Date.now() / 1000),
//             updated_at: Math.floor(Date.now() / 1000),
//             deleted_at: 0,
//           });
//         }

//         // Bulk insert the reservation space rows
//         await ReservationSpace.bulkCreate(reservationSpaces, { transaction });
//       }

//       // Move to the next interval
//       currentDate = new Date(currentDate.getTime() + timeInterval);
//     }

//     // Commit the transaction
//     await transaction.commit();
//     res.send({
//       message : 'it declared'
//     })
//     console.log(`Dynamic routine reservations created from ${startDate} to ${endDate}.`);
//   } catch (error) {
//     // Rollback the transaction if an error occurs
//     if (transaction) {
//       await transaction.rollback();
//     }

//     console.error('Error creating dynamic routine reservations:', error);
//   }
// };

const createDynamicRoutineReservations = async (
  req, res
) => {
  let transaction;

  try {
    const {  startDateUnix,  endDateUnix , maxSpacesPerInterval, intervalInMinutes , openTime , closeTime} = req.body;

    // Start a transaction to ensure data consistency
    transaction = await db.transaction();

    // Convert open and close times to Unix timestamps

    const timeInterval = intervalInMinutes * 60;
    // Define the time interval in seconds based on the intervalInMinutes
    let currentTime = startDateUnix;

    while (currentTime <= endDateUnix) {
      // Calculate the start and end times for the reservation interval
      const startTime = +currentTime;
      const endTime = Math.min(currentTime + timeInterval, endDateUnix);

      // Calculate the open and close times for the current day (10:00 AM to 11:59 PM)
      const currentDate = new Date(currentTime * 1000);
      console.log(currentDate);
      currentDate.setHours(openTime, 0, 0, 0); // Set the time to 10:00 AM
      const openTimestamp = currentDate.getTime() / 1000;
      currentDate.setHours(closeTime, 0, 0, 0); // Set the time to 11:59:59 PM
      const closeTimestamp = currentDate.getTime() / 1000;
      // Check if the interval falls within the open hours
      console.log(openTimestamp < closeTimestamp);
      console.log(openTimestamp );
      console.log(closeTimestamp );
      if (startTime < endTime && openTimestamp < closeTimestamp) {
        // Create a reservation calendar entry for this interval
        const reservationCalendar = await reservationCalenderModel.create(
          {
            startTime,
            endTime,
            currentSpace: 0,
            maximumSpace: maxSpacesPerInterval,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            deleted_at: 0,
          },
          { transaction }
        );

        // Retrieve the newly created reservation calendar's ID
        const reservationCalendarId = reservationCalendar.id;

        // Create reservation space rows associated with the calendar ID
        const reservationSpaces = [];
        for (let i = 0; i < maxSpacesPerInterval; i++) {
          reservationSpaces.push({
            reservation_calender_id: reservationCalendarId,
            customer_id: null,
            space_state: 0,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            deleted_at: 0,
          });
        }

        // Bulk insert the reservation space rows
        await reservationSpaceModel.bulkCreate(reservationSpaces, { transaction });
      }

      // Move to the next interval
      currentTime += timeInterval;
    }

    // Commit the transaction
    await transaction.commit();

    res.send('done')
    console.log(`Dynamic routine reservations created from ${startDateUnix} to ${endDateUnix}.`);
  } catch (error) {
    // Rollback the transaction if an error occurs
    if (transaction) {
      await transaction.rollback();
    }

    console.error('Error creating dynamic routine reservations:', error);
  }
};

const createMyself = async (req , res) => {
  let transaction;

  try {
    // transaction = await db.transaction();
    const {  reservationDates , maxSpacesPerInterval, intervalInMinutes , openTime , closeTime} = req.body;
    reservationDates && reservationDates.map(async (date) => {
      const reservationStartDayInSecond = (new Date(date * 1000).setHours(openTime , 0 , 0))/1000;
      const reservationCloseInSecond = (new Date(date * 1000).setHours(closeTime , 0 , 0 ))/1000;
      let currentTime =  reservationStartDayInSecond + (intervalInMinutes * 60);
      while (currentTime <= reservationCloseInSecond) {
        const reservationCalendar = await reservationCalenderModel.create(
          {
            startTime : currentTime,
            endTime : parseInt(currentTime + (intervalInMinutes * 60 )) ,
            currentSpace: maxSpacesPerInterval,
            maximumSpace: maxSpacesPerInterval,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            deleted_at: 0,
          },
          { transaction }
        );
        const reservationCalendarId = reservationCalendar.id;
        const reservationSpaces = [];
        for (let i = 0; i < maxSpacesPerInterval; i++) {
          reservationSpaces.push({
            reservation_calender_id: reservationCalendarId,
            customer_id: null,
            space_state: 0,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),
            deleted_at: 0,
          });
        }
        currentTime = parseInt(currentTime + (intervalInMinutes * 60 ))
        // Bulk insert the reservation space rows
        await reservationSpaceModel.bulkCreate(reservationSpaces, { transaction });
      }
    })
    res.send('sended')

  }
  catch(error){
    if (transaction) {
      await transaction.rollback();
    }

    console.error('Error creating dynamic routine reservations:', error);
  }
}

// Example usage:
// const startDate = new Date('2023-06-01T00:00:00Z'); // Replace with your start date
// const endDate = new Date('2023-06-07T23:59:59Z'); // Replace with your end date
// const maxSpacesPerInterval = 5; // Number of spaces available in each interval
// const intervalInMinutes = 30; // Interval between reservations in minutes
// const openTime = '10:00:00'; // Shop open time
// const closeTime = '19:00:00'; // Shop close time


module.exports = {
  createDynamicRoutineReservations,
  addReservationCalendar,
  createMyself

}