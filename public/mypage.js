// Task 1
const btnCheckNumber = document.getElementById("btnCheckNumber");
const outputNumber = document.getElementById("outputNumber");

btnCheckNumber.addEventListener("click", () => {
  const arrayInput = document.getElementById("arrayInput").value;
  const numberInput = document.getElementById("numberInput").value;

  const arr = arrayInput
    .split(",")
    .map(item => Number(item.trim()))
    .filter(item => !isNaN(item));

  const target = Number(numberInput);

  if (arr.length === 0) {
    outputNumber.innerText = "Vui lòng nhập mảng hợp lệ!";
    return;
  }
  if (isNaN(target)) {
    outputNumber.innerText = "Vui lòng nhập số cần tìm hợp lệ!";
    return;
  }

  const found = arr.find(num => num === target);
  outputNumber.innerText = found !== undefined ? "YES" : "NO";
});

// Task 2
const btnHarvest = document.getElementById("btnHarvest");
const outputHarvest = document.getElementById("outputHarvest");

btnHarvest.addEventListener("click", () => {
  const daysInput = document.getElementById("daysInput").value;
  const yieldInput = document.getElementById("yieldInput").value;

  const N = Number(daysInput);
  if (isNaN(N) || N <= 0) {
    outputHarvest.innerText = "Vui lòng nhập số ngày hợp lệ!";
    return;
  }

  const yields = yieldInput
    .split(",")
    .map(item => Number(item.trim()))
    .filter(item => !isNaN(item));

  if (yields.length !== N) {
    outputHarvest.innerText = `Số lượng yield phải bằng ${N}!`;
    return;
  }

  let maxSum = yields[0];
  let currentSum = yields[0];
  let maxLen = 1;
  let currentLen = 1;

  for (let i = 1; i < N; i++) {
    if (currentSum + yields[i] >= yields[i]) {
      currentSum += yields[i];
      currentLen += 1;
    } else {
      currentSum = yields[i];
      currentLen = 1;
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxLen = currentLen;
    }
  }

  outputHarvest.innerText = `Độ dài chuỗi tốt nhất: ${maxLen}`;
});
