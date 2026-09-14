function toF(tempC) {
  return (tempC * 9 / 5) + 32;
}

function toC(tempF) {
  return (tempF - 32) * (5 / 9);
}

export { toF, toC }