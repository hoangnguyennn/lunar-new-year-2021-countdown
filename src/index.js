import './style.scss'

const TET = new Date('February 12, 2021 00:00:00 GMT+07:00').toUTCString()
const TET_MOMENT = moment(TET)

const ONE_SEC = 1000
const ONE_MIN = 60 * ONE_SEC
const ONE_HOUR = 60 * ONE_MIN
const ONE_DAY = 24 * ONE_HOUR

document.addEventListener('DOMContentLoaded', () => {
  function calculateAndSetTime() {
    let now = moment(new Date().toUTCString())
    let secondsDiff = TET_MOMENT - now

    let days = Math.floor(secondsDiff / ONE_DAY)
    secondsDiff -= days * ONE_DAY

    let hours = Math.floor(secondsDiff / ONE_HOUR)
    secondsDiff -= hours * ONE_HOUR

    let minutes = Math.floor(secondsDiff / ONE_MIN)
    secondsDiff -= minutes * ONE_MIN

    let seconds = secondsDiff / ONE_SEC

    document.querySelector('.days > .box').innerHTML = days
    document.querySelector('.hours > .box').innerHTML = hours
    document.querySelector('.minutes > .box').innerHTML = minutes
    document.querySelector('.seconds > .box').innerHTML = seconds
  }

  setInterval(calculateAndSetTime, 1)
})
