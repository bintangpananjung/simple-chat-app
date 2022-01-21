export function getDateofListMessage(prevtime, timemap, now) {
  // console.log(timemap);
  var messageDate;
  if (now.getFullYear() === timemap.getFullYear()) {
    if (now.getMonth() === timemap.getMonth()) {
      if (
        now.getDate() > timemap.getDate() &&
        timemap.getDate() !== prevtime.getDate()
      ) {
        // console.log(timemap.getDate(), prevtime.getDate());
        if (now.getDate() > prevtime.getDate() + 1) {
          messageDate = (
            <p className="text-[10px] text-center text-gray-400">
              (
              {prevtime.toLocaleString("default", { month: "short" }) +
                " " +
                prevtime.getDate()}
              )
            </p>
          );
        }
        if (now.getDate() === prevtime.getDate() + 1) {
          messageDate = (
            <p className="text-[10px] text-center text-gray-400">(Yesterday)</p>
          );
        }
        if (now.getDate() === prevtime.getDate()) {
          messageDate = (
            <p className="text-[10px] text-center text-gray-400">(Today)</p>
          );
        }
      }
    } else {
      if (timemap.getDate() !== prevtime.getDate()) {
        messageDate = (
          <p className="text-[10px] text-center text-gray-400">
            (
            {prevtime.toLocaleString("default", { month: "short" }) +
              " " +
              prevtime.getDate()}
            )
          </p>
        );
      }
    }
  } else {
    if (timemap.getFullYear() !== prevtime.getFullYear()) {
      if (timemap.getFullYear() === prevtime.getFullYear() + 1) {
        messageDate = (
          <p className="text-[10px] text-center text-gray-400">
            (
            {prevtime.toLocaleString("default", { month: "short" }) +
              " " +
              prevtime.getDate()}
            )
          </p>
        );
      } else {
        if (timemap.getMonth() !== prevtime.getMonth()) {
          messageDate = (
            <p className="text-[10px] text-center text-gray-400">
              (
              {prevtime.toLocaleString("default", { month: "short" }) +
                ", " +
                prevtime.getFullYear()}
              )
            </p>
          );
        }
      }
    }
  }
  return messageDate;
}
