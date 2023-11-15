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

console.log(pressureWasher.power);
console.log(pressureWasher.isHandheld);

pressureWasher.power = 1400;
console.log(pressureWasher.power);

pressureWasher.power = 1;
