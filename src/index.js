import './style.scss'

const TET = new Date('February 12, 2021 00:00:00 GMT+07:00')

const ONE_SEC = 1000
const ONE_MIN = 60 * ONE_SEC
const ONE_HOUR = 60 * ONE_MIN
const ONE_DAY = 24 * ONE_HOUR

document.addEventListener('DOMContentLoaded', () => {
  function calculateAndSetTime() {
    let now = new Date()
    let secondsDiff = TET.getTime() - now.getTime()

    let days = Math.floor(secondsDiff / ONE_DAY)
    secondsDiff -= days * ONE_DAY

    let hours = Math.floor(secondsDiff / ONE_HOUR)
    secondsDiff -= hours * ONE_HOUR

    let minutes = Math.floor(secondsDiff / ONE_MIN)
    secondsDiff -= minutes * ONE_MIN

    let seconds = Math.ceil(secondsDiff / ONE_SEC)

    document.querySelector('.days > .box').innerHTML = to2Number(days)
    document.querySelector('.hours > .box').innerHTML = to2Number(hours)
    document.querySelector('.minutes > .box').innerHTML = to2Number(minutes)
    document.querySelector('.seconds > .box').innerHTML = to2Number(seconds)
  }

  function to2Number(number) {
    return number < 10 ? `0${number}` : `${number}`
  }

  setInterval(calculateAndSetTime, 1)
})
