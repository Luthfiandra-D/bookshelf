{
    const canvas = document.getElementById("bar");
    const ctx = canvas.getContext("2d");
    const labels = ["18 Oct", "25 Oct", "1 Nov", "8 Nov", "15 Nov"];
    const data = [12, 0, 7, 15, 10];
    const chartWidth = canvas.width;
    const chartHeight = canvas.height;
    const padding = 40;
    const barWidth = (chartWidth - 2 * padding) / data.length - 20;
    const maxData = Math.max(...data);

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, chartHeight - padding);
    ctx.lineTo(chartWidth - padding, chartHeight - padding);
    ctx.stroke();

    data.forEach((value, index) => {
        const x = padding + index * (barWidth + 20) + 10;
        const y = chartHeight - padding - (value / maxData) * (chartHeight - 2 * padding);
        const height = (value / maxData) * (chartHeight - 2 * padding);

        ctx.fillStyle = "#0f172a";
        ctx.fillRect(x, y, barWidth, height);

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(labels[index], x + barWidth / 2, chartHeight - padding + 15)
        ctx.fillText(value, x + barWidth / 2, y - 10);
    })
}