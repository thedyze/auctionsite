export const socket = io("http://10.250.84.76:9092");


socket.on("connect", () => {
  console.log("socket connected");
});

socket.on("disconnect", function () {
  console.log("socket disconnected");
});

socket.on("reconnect_attempt", (attempts) => {
  console.log("Try to reconnect at " + attempts + " attempt(s).");
});
