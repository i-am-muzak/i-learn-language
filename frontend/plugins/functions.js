import dayjs from "dayjs";

export default (context, inject) => {
  const unixToDate = (unix) => {
    return dayjs.unix(unix).format("DD MMMM, YYYY HH:mm")
  }

  inject('unixToDate', unixToDate)
}
