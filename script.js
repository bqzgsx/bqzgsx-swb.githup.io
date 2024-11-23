const colorTemp = document.getElementById('colorTemp');
const tempSlider = document.getElementById('tempSlider');
const display = document.getElementById('display');
const tempDisplay = document.getElementById('tempDisplay');

function updateColor(value) {
    let temp = parseInt(value);
    if (isNaN(temp)) return;
    
    if (temp >= 1000 && temp <= 12000) {
        const color = colorTemperatureToRGB(temp);
        display.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        tempDisplay.textContent = `${temp}K`;
        tempSlider.value = temp;
    }
}

colorTemp.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value === '') {
        colorTemp.value = '';
        tempDisplay.textContent = '0K';
        return;
    }
    updateColor(value);
});

colorTemp.addEventListener('blur', (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1000) {
        value = 1000;
    } else if (value > 12000) {
        value = 12000;
    }
    colorTemp.value = value;
    updateColor(value);
});

tempSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    colorTemp.value = value;
    updateColor(value);
});

// 初始化显示
updateColor(1000);

function colorTemperatureToRGB(kelvin) {
    let temp = kelvin / 100;
    let red, green, blue;

    if (temp <= 66) {
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
        if (temp <= 19) {
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);
        blue = 255;
    }

    return {
        red: clamp(red, 0, 255),
        green: clamp(green, 0, 255),
        blue: clamp(blue, 0, 255)
    };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
} 
