// This code is tested 
// and works quite well 
// basically this code can rotate a
// 3d array on the top bottom or sides



// rotateTop
// rotates any 3darray with same width,height,depth
// clockwise = 1 = 90 degrees
// clockwise = 0 = -90 degrees array[y][z][x]
export function rotateTop(array, clockwise) {
    let newTop = [];
    for (let x = 0; x < array[0].length; x++) {
        let newRow = []


        if (clockwise)
            for (let z = 0; z < array[0].length; z++) {
                let negZ = (z - array.length - 1);
                negZ = negZ ? -1 * (negZ + 2) : negZ;
                newRow.push(array[0][negZ][x])
            }
        else {
            for (let z = 0; z < array[0].length; z++) {
                let negX = (x - array.length - 1);
                negX = negX ? -1 * (negX + 2) : negX;
                newRow.push(array[0][z][negX])
            }
        }
        newTop.push(newRow);
    }

    array[0] = newTop;
}


// rotateBottom
// rotates any 3darray with same width,height,depth
// clockwise = 1 = 90 degrees
// clockwise = 0 = -90 degrees array[y][z][x]
export function rotateBottom(array, clockwise) {
    let newTop = [];
    for (let x = 0; x < array[0].length; x++) {
        let newRow = []


        if (clockwise)
            for (let z = 0; z < array[array.length - 1].length; z++) {
                let negZ = (z - array.length - 1);
                negZ = negZ ? -1 * (negZ + 2) : negZ;
                newRow.push(array[array.length - 1][negZ][x])
            }
        else {
            for (let z = 0; z < array[array.length - 1].length; z++) {
                let negX = (x - array.length - 1);
                negX = negX ? -1 * (negX + 2) : negX;
                newRow.push(array[array.length - 1][z][negX])
            }
        }
        newTop.push(newRow);
    }

    array[array.length - 1] = newTop;
}



// rotateLeft 
// rotates any 3d array with same width, height, depth
// similar to previous functions
export function rotateLeft(array, clockwise) {
    let arrayCopy = arrayShallowCopy(array)

    for (let y = 0; y < array.length; y++) {
        for (let z = 0; z < array.length; z++) {

            let negY = (y - array.length - 1);
            negY = negY ? -1 * (negY + 2) : negY;
            let negZ = (z - array.length - 1);
            negZ = negZ ? -1 * (negZ + 2) : negZ;

            if (clockwise)
                array[y][z][0] = arrayCopy[negZ][y][0];
            else
                array[y][z][0] = arrayCopy[z][negY][0];
        }
    }
}


// rotateRight
// rotates any 3d array with same width, height, depth
// similar to previous functions
export function rotateRight(array, clockwise) {
    let arrayCopy = arrayShallowCopy(array)

    for (let y = 0; y < array.length; y++) {
        for (let z = 0; z < array.length; z++) {

            let negY = (y - array.length - 1);
            negY = negY ? -1 * (negY + 2) : negY;
            let negZ = (z - array.length - 1);
            negZ = negZ ? -1 * (negZ + 2) : negZ;

            if (clockwise)
                array[y][z][array.length - 1] = arrayCopy[negZ][y][array.length - 1];
            else
                array[y][z][array.length - 1] = arrayCopy[z][negY][array.length - 1];
        }
    }
}

// rotateFront
// rotates any 3d array with same width, height, depth
// similar to previous functions
export function rotateFront(array, clockwise) {
    let arrayCopy = arrayShallowCopy(array)

    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array.length; x++) {
            let negY = (y - array.length - 1);
            negY = negY ? -1 * (negY + 2) : negY;
            let negX = (x - array.length - 1);
            negX = negX ? -1 * (negX + 2) : negX;

            if (clockwise)
                array[y][array.length - 1][x] = arrayCopy[negX][array.length - 1][y];
            else
                array[y][array.length - 1][x] = arrayCopy[x][array.length - 1][negY];

        }
    }
}


// rotateBack
// rotates any 3d array with same width, height, depth
// similar to previous functions
export function rotateBack(array, clockwise) {
    let arrayCopy = arrayShallowCopy(array)

    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array.length; x++) {
            let negY = (y - array.length - 1);
            negY = negY ? -1 * (negY + 2) : negY;
            let negX = (x - array.length - 1);
            negX = negX ? -1 * (negX + 2) : negX;

            if (clockwise)
                array[y][0][x] = arrayCopy[negX][0][y];
            else
                array[y][0][x] = arrayCopy[x][0][negY];

        }
    }
}


// arrayShallowCopy
// a cool little function
// that creates a shallow copy of 
// an array, meaning it maintains refs
// using recursion.
export function arrayShallowCopy(array) {
    let arrayCopy = [];
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            arrayCopy.push(arrayShallowCopy(array[i]));
        } else
            arrayCopy.push(array[i]);
    }

    return arrayCopy;
}