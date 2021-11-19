export const socket = io("http://192.168.1.231:9092");


socket.on("connect", () => {
  console.log("socket connected");
});

socket.on("disconnect", function () {
  console.log("socket disconnected");
});

socket.on("reconnect_attempt", (attempts) => {
  console.log("Try to reconnect at " + attempts + " attempt(s).");
});
