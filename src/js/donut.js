const canvas = document.getElementById('circle');
const ctx = canvas.getContext('2d');

const data = [
    { label: "Pengeluaran", value: 30, color: "#0f172a" },
    { label: "Pemasukan", value: 20, color: "#f59e0b" },
    { label: "Aktivitas", value: 25, color: "#2e4885" },
    { label: "Lainnya", value: 25, color: "#8b5cf6" }
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;
const innerRadius = 70;

let startAngle = -0.5 * Math.PI;

data.forEach(segment => {
    const sliceAngle = (segment.value / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();

    ctx.fillStyle = segment.color;
    ctx.fill();

    startAngle += sliceAngle;
});

ctx.beginPath();
ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
ctx.fillStyle = "#fff";
ctx.fill();

ctx.fillStyle = "#000";
ctx.font = "20px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

const description = document.getElementById("description");
description.innerHTML = "";

data.forEach(item => {
    const descItem = document.createElement("div");
    descItem.className = "desc-item";
    descItem.style.display = "flex";
    descItem.style.alignItems = "center";
    descItem.style.gap = "8px";
    descItem.style.marginBottom = "4px";

    const colorBox = document.createElement("div");
    colorBox.style.width = "15px";
    colorBox.style.height = "15px";
    colorBox.style.borderRadius = "3px";
    colorBox.style.backgroundColor = item.color;

    const labelText = document.createElement("span");
    labelText.textContent = `${item.label} (${Math.round((item.value / total) * 100)}%)`;

    descItem.appendChild(colorBox);
    descItem.appendChild(labelText);
    description.appendChild(descItem);
});
