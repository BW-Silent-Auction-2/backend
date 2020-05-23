module.exports = {
    validateDate,
    calBidDuration
}

function validateDate(dateValue) {
    let theDate = dateValue
    if (theDate == "") {
        return false
    }

    let regExp = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    let dateMatch = theDate.match(regExp)

    if (dateMatch == null) {
        return false;
    }

    month = dateMatch[1];
    day = dateMatch[3];
    year = dateMatch[5]

    if (month < 1 || month > 12) {
        return false;
    } else if (day < 1 || day > 31) {
        return false;
    } else if (( month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        return false
    } else if (month == 2) {
        let isLeapYear = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isLeapYear)) {
            return false
        }
    }
    return true;
}

function calBidDuration(timeEnd, timeSubmitted) {
    let timeEndString = timeEnd + " 00:00:00 GMT"
    console.log("trueTimeEnd before parse", timeEndString)
    trueTimeEnd = Date.parse(timeEndString)
    console.log("trueTimeEnd after parse", trueTimeEnd)

    let trueTimeSubmitted = timeSubmitted
    console.log("trueTimeSubmitted after parse", trueTimeSubmitted)

    let hours = (((trueTimeEnd - trueTimeSubmitted)/ 1000)/60/60)
    let hoursLeft = Math.floor(hours)
    let minutes = (hours - hoursLeft) * 60
    let minutesLeft = Math.floor(minutes)
    let seconds = Math.floor((minutes - minutesLeft) * 60)
    let days = 0
    let hoursCal = hoursLeft
    for (let i = hours; i > 24; i -= 24) {
      days += 1
      hoursCal -= 24
    }
    console.log("Days left: ", days)
    console.log("Hours left: ", hoursCal)
    console.log("Minutes left: ", minutesLeft)
    console.log("Seconds left: ", seconds)
    return `${days} days, ${hoursCal} hours, ${minutesLeft} minutes, ${seconds} seconds left`
}