// function Equipment(brand, condition, price, inStock) {
//     this._brand = brand;
//     this._condition = condition;
//     this._price = price;
//     this._inStock = inStock;
// }
//
// Equipment.prototype.brand = function (newBrand) {
//     if (newBrand) this._brand = newBrand;
//     return this._brand;
// };
//
// Equipment.prototype.condition = function (newCondition) {
//     if (newCondition) this._condition = newCondition;
//     return this._condition;
// };
//
// Equipment.prototype.equipmentInfo = function () {
//     alert('Brand: ' + this._brand + ' Condition: ' + this._condition + ' Price: ' + this._price + ' In stock: ' + this._inStock);
// };
//
// Equipment.prototype.updatePrice = function (newPrice) {
//     this._price = newPrice;
//     alert('Price has been updated: ' + this._price);
// };
//
// Equipment.prototype.inStock = function (newInStock) {
//     if (newInStock) this._inStock = newInStock;
//     return this._inStock;
// };
//
// Equipment.prototype.calculateTotalValue = function () {
//     return this._price * this._inStock;
// };
//
// function PressureWasher(brand, condition, price, inStock, power, isHandheld) {
//     Equipment.call(this, brand, condition, price, inStock);
//     this._power = power;
//     this._isHandheld = isHandheld;
// }
//
// PressureWasher.prototype = Object.create(Equipment.prototype);
//
// PressureWasher.prototype.power = function (newPower) {
//     if (newPower < 100) {
//         alert("Invalid power parameter");
//     } else {
//         this._power = newPower;
//     }
//     return this._power;
// };
//
// PressureWasher.prototype.isHandheld = function (newIsHandheld) {
//     if (newIsHandheld !== undefined) this._isHandheld = newIsHandheld;
//     return this._isHandheld;
// };
//
// PressureWasher.prototype.discountPrice = function (discountPercentage) {
//     if (discountPercentage >= 0 && discountPercentage <= 100) {
//         return this._price - (this._price * (discountPercentage / 100));
//     } else {
//         alert("Invalid discount percentage");
//         return null;
//     }
// };
//
// PressureWasher.prototype.powerUp = function (increase) {
//     const newPower = this._power + increase;
//     if (newPower < 100) {
//         alert("Invalid power parameter");
//     } else {
//         this._power = newPower;
//         alert(`Power increased to: ${this._power}`);
//     }
// };


function hugeValue(func) {
    return function () {
        const result = func.apply(this);
        if (result >= 2000) {
            alert('Huge value of equipment in stock: $' + result)
        } else {
            alert("Low baller..")
        }
    };
}

class Equipment {
    constructor(brand, condition, price, inStock) {
        this._brand = brand;
        this._condition = condition;
        this._price = price;
        this._inStock = inStock;
    }

    set brand(newBrand) {
        this._brand = newBrand;
    }

    get brand() {
        return this._brand;
    }

    set condition(newCondition) {
        this._condition = newCondition;
    }

    get condition() {
        return this._condition;
    }

    equipmentInfo() {
        alert('Brand: ' + this._brand + 'Condition: ' + this._condition + "Price: " + this._price + "In stock: " + this._inStock)
    }

    updatePrice(newPrice) {
        this._price = newPrice
        alert('Price has been updated: ' + this._price)
    }

    set inStock(newInStock) {
        this._inStock = newInStock;
    }

    get inStock() {
        return this._inStock;
    }

    calculateTotalValue() {
        return this._price * this._inStock;
    }
}

class PressureWasher extends Equipment {
    constructor(brand, condition, price, inStock, power, isHandheld) {
        super(brand, condition, price, inStock);
        this._power = power;
        this._isHandheld = isHandheld;
    }

    set power(newPower) {
        if (newPower < 100) {
            alert("Invalid power parameter")
        } else {
            this._power = newPower;
        }
    }

    get power() {
        return this._power;
    }

    set isHandheld(newIsHandheld) {
        this._isHandheld = newIsHandheld;
    }

    get isHandheld() {
        return this._isHandheld;
    }

    discountPrice(discountPercentage) {
        if (discountPercentage >= 0 && discountPercentage <= 100) {
            return this.price - (this.price * (discountPercentage / 100));
        } else {
            alert("Invalid discount percentage");
            return null;
        }
    }

    powerUp(increase) {
        const newPower = this._power + increase;
        if (newPower < 100) {
            alert("Invalid power parameter");
        } else {
            this._power = newPower;
            alert(`Power increased to: ${this._power}`);
        }
    }
}

const pressureWasher = new PressureWasher('Karcher', 'Good', 200, 10, '1200', true);

Equipment.prototype.calculateTotalValue = hugeValue(Equipment.prototype.calculateTotalValue);

pressureWasher.calculateTotalValue();
console.log(pressureWasher.power);
console.log(pressureWasher.isHandheld);

pressureWasher.power = 1400;
console.log(pressureWasher.power);

pressureWasher.power = 1;


function displayClasses() {
    const container = document.getElementById('classes');
    container.innerHTML = '<h2>Classes task output:</h2>';

    container.innerHTML += `<p>${pressureWasher.power} <br> ${pressureWasher.isHandheld} </p>`;
}
