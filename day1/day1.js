const fs = require("fs");
const readline = require("readline");

const main = async () => {
    if (process.argv.length < 3) {
        console.log("Ingrese la ruta del archivo de entrada");
        process.exit();
    }

    const filename = process.argv[2];

    file = openFile(filename);

    if (file === null) {
        process.exit();
    }

    calibrationValue = await getCalibrationValue(file);

    console.log("The calibration value is: ", calibrationValue);
}

const getCalibrationValue = async (file) => {
    let calibrationValue = 0;

    for await (const line of file) {
        const calib = getCalibrationValueLine(line);
        calibrationValue += calib;
    }

    return calibrationValue;
}

const getCalibrationValueLine = (line) => {
    let firstDigit = null, lastDigit = null;

    for (let i = 0; i <= line.length - 1; i++) {
       const num = Number(line[i]);

        if (!isNaN(num)) {
            if (firstDigit === null) {
                firstDigit = num;
            }

            lastDigit = num;
        }
    }

    return firstDigit * 10 + lastDigit;
}

const openFile = (filename) => {
    try {
        const fileStream = fs.createReadStream(filename);

        const inputFile = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        return inputFile;

    } catch (exc) {
        console.error(exc);

        return null;
    }
}

main();
