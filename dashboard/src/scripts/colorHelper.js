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