export function isValidHexColor(color) {
    return /^#[0-9A-F]{6}$/i.test(color);
}

export function formatCompanyColors(colors, index = -1) {
    
    // Company colors exists of a string with four different hex colors.
    // e.g "#FF00FF,#00FF00,#F0F0F0,#0F0F0F"
    // We're formatting those values in here and returning a specified color based on a 0 based index.

    const emptyColor = '#000000';

    if(!colors || index === -1) {
        return emptyColor;
    }

    const colorList = colors.split(",");

    if(colorList.length !== 4) {
        return emptyColor;
    }
    return colorList[index];
}

export function generateColorList(currentColor) {
    let theList = [];
    let hslValues = rgbToHsl(
        hexToR(currentColor),
        hexToG(currentColor),
        hexToB(currentColor)
    );
    for(let x = 0; x < 25; x++) {
        let rgb = hslToRgb(hslValues[0], hslValues[1], x * 0.04);
        theList.push(rgbToHex(rgb[0], rgb[1], rgb[2]));
    }
    theList.push('#FFFFFF');
    return theList;
}

export function hexToHsl(hex) {
    return rgbToHsl(
        hexToR(hex),
        hexToG(hex),
        hexToB(hex)
    );
}

export function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

export function  rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function  hue2rgb(p, q, t) {
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
}

export function hslToRgb(h, s, l){
    let r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
  
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: return;
      }
  
      h /= 6;
    }
  
    return [ h, s, l ];
}

export function hexToR(h) {
    return parseInt((cutHex(h)).substring(0,2),16);
}

export function hexToG(h) {
    return parseInt((cutHex(h)).substring(2,4),16);
}

export function hexToB(h) {
    return parseInt((cutHex(h)).substring(4,6),16);
}

export function cutHex(h) {
    return (h.charAt(0)==="#") ? h.substring(1,7):h;
}