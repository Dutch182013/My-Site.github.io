const getID = document.getElementById('getID');
const getIDon = document.getElementById('getIDon');
const getVGSon = document.getElementById('getVGSon');
const getVGSth = document.getElementById('getVGSth');
const getCalculateButton = document.getElementById('calculateButton');
const getResult = document.getElementById('result');

const get_Value = (element) => {
    return parseFloat(element.value);
};

getCalculateButton.addEventListener('click', function() {
    console.log('Button clicked');
    let ID = Number(get_Value(getID));
    let IDon = Number(get_Value(getIDon));
    let VGSon = Number(get_Value(getVGSon));
    let VGSth = Number(get_Value(getVGSth));
    console.log(`ID: ${ID}, IDon: ${IDon}, VGSon: ${VGSon}, VGSth: ${VGSth}`);

    let k = IDon / ((VGSon - VGSth) ** 2);
    console.log(`Calculated k: ${k}`);
    output = `Calculated k: ${k.toFixed(2)}`;

    let VGS = Math.sqrt(ID / k) + VGSth;
    console.log(`Calculated VGS: ${VGS}`);
    output += `<br> VGS: ${VGS.toFixed(2)}`;

    getResult.innerHTML = output;
    console.log(`<p>Result displayed: ${output}</p>`);
});