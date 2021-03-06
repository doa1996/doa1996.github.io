/* **UWAGA** Skrypt NIE sprawdza, czy wprowadzone dane mają sens w kontekście Managera; robi tylko quick-maths.*/
'use strict';

const MIN_PART_VALUE = 40;
var partCostBase = {
    "aero": 200,
    "gearbox": 180,
    "brakes": 120,
    "electronics": 100,
    "suspension": 160,
    "reliability": 140
};

function calcOne(part, factory, base) {
    part += Number(factory);
    return base + 80 * (Math.floor((Number(part) - MIN_PART_VALUE) / 10));
}

/* ******** */
function main() {
    let factories = {
        "aero": document.getElementById('factory-aero').value,
        "gearbox": document.getElementById('factory-telemetry').value,
        "brakes": document.getElementById('factory-telemetry').value,
        "electronics": document.getElementById('factory-electronics').value,
        "suspension": document.getElementById('factory-suspension').value,
        "reliability": document.getElementById('factory-quality').value
    }
    let parts = {
        "aero": document.getElementById('aero').value,
        "gearbox": document.getElementById('gearbox').value,
        "brakes": document.getElementById('brakes').value,
        "electronics": document.getElementById('electronics').value,
        "suspension": document.getElementById('suspension').value,
        "reliability": document.getElementById('reliability').value
    }
    let upgrades = {
        "aero": document.getElementById('upgrade-aero').value,
        "gearbox": document.getElementById('upgrade-gearbox').value,
        "brakes": document.getElementById('upgrade-brakes').value,
        "electronics": document.getElementById('upgrade-electronics').value,
        "suspension": document.getElementById('upgrade-suspension').value,
        "reliability": document.getElementById('upgrade-reliability').value
    }
    let DDR = document.getElementById('DDR').checked;
    let cost = 0;

    let series = 'FS';
    if (document.getElementById('SPS').checked) series = 'SPS';

    let ceiling = 100;
    if (series == 'FS') ceiling = 90;


    if (DDR) {
        cost = Number(cost) + calcOne(Number(parts.aero), Number(factories.aero), Number(partCostBase.aero)) / 2;
        parts.aero = Number(parts.aero) + Number(factories.aero);
//         if (parts.aero >= 90) cost -= 40;
        upgrades.aero--;

        cost = Number(cost) + calcOne(Number(parts.gearbox), Number(factories.gearbox), Number(partCostBase.gearbox)) / 2;
        parts.gearbox = Number(parts.gearbox) + Number(factories.gearbox);
//         if (parts.gearbox >= 90) cost -= 40;
        upgrades.gearbox--;

        cost = Number(cost) + calcOne(Number(parts.brakes), Number(factories.brakes), Number(partCostBase.brakes)) / 2;
        parts.brakes = Number(parts.brakes) + Number(factories.brakes);
//         if (parts.brakes >= 90) cost -= 40;
        upgrades.brakes--;

        cost = Number(cost) + calcOne(Number(parts.electronics), Number(factories.electronics), Number(partCostBase.electronics)) / 2;
        parts.electronics = Number(parts.electronics) + Number(factories.electronics);
//         if (parts.electronics >= 90) cost -= 40;
        upgrades.electronics--;

        cost = Number(cost) + calcOne(Number(parts.suspension), Number(factories.suspension), Number(partCostBase.suspension)) / 2;
        parts.suspension = Number(parts.suspension) + Number(factories.suspension);
//         if (parts.suspension >= 90) cost -= 40;
        upgrades.suspension--;

        cost = Number(cost) + calcOne(Number(parts.reliability), Number(factories.reliability), Number(partCostBase.reliability)) / 2;
        parts.reliability = Number(parts.reliability) + Number(factories.reliability);
//         if (parts.reliability >= 90) cost -= 40;
        upgrades.reliability--;
    }
    if (
        upgrades.aero == '0'           ||
        upgrades.gearbox == '0'        ||
        upgrades.brakes == '0'         ||
        upgrades.electronics == '0'    ||
        upgrades.suspension == '0'     ||
        upgrades.reliability == '0'
    ) {
        if (upgrades.aero === '0')          parts.aero--;
        if (upgrades.gearbox === '0')       parts.gearbox--;
        if (upgrades.brakes === '0')        parts.brakes--;
        if (upgrades.electronics === '0')   parts.electronics--;
        if (upgrades.suspension === '0')    parts.suspension--;
        if (upgrades.reliability === '0')   parts.reliability--;
    }
    if (
        upgrades.aero == '0.5'           ||
        upgrades.gearbox == '0.5'        ||
        upgrades.brakes == '0.5'         ||
        upgrades.electronics == '0.5'    ||
        upgrades.suspension == '0.5'     ||
        upgrades.reliability == '0.5'
    ) {
        if (upgrades.aero === '0.5') {
            cost = Number(cost) + calcOne(Number(parts.aero) - Number(factories.aero), Number(factories.aero), Number(partCostBase.aero)) / 2;
        }
        if (upgrades.gearbox === '0.5') {
            cost = Number(cost) + calcOne(Number(parts.gearbox) - Number(factories.gearbox), Number(factories.gearbox), Number(partCostBase.gearbox)) / 2;
        }
        if (upgrades.brakes === '0.5') {
            cost = Number(cost) + calcOne(Number(parts.brakes) - Number(factories.brakes), Number(factories.brakes), Number(partCostBase.brakes)) / 2;
        }
        if (upgrades.electronics === '0.5') {
            cost = Number(cost) + calcOne(Number(parts.electronics) - Number(factories.electronics), Number(factories.electronics), Number(partCostBase.electronics)) / 2;
        }
        if (upgrades.suspension === '0.5') {
            cost = Number(cost) + calcOne(Number(parts.suspension) - Number(factories.suspension), Number(factories.suspension), Number(partCostBase.suspension)) / 2;
        }
        if (upgrades.reliability === '0.5') {
            cost = Number(cost) + calcOne(Number(parts.reliability) - Number(factories.reliability), Number(factories.reliability), Number(partCostBase.reliability)) / 2;
        }
    }

    while (upgrades.aero >= 1) {
        cost = Number(cost) + calcOne(Number(parts.aero), Number(factories.aero), Number(partCostBase.aero));
        parts.aero = Number(parts.aero) + Number(factories.aero);
        upgrades.aero--;
        if (parts.aero >= ceiling) {
            parts.aero = ceiling;
            if (series == 'FS') cost -= 80;
            break;
        }
    }
    while (upgrades.gearbox >= 1) {
        cost = Number(cost) + calcOne(Number(parts.gearbox), Number(factories.gearbox), Number(partCostBase.gearbox));
        parts.gearbox = Number(parts.gearbox) + Number(factories.gearbox);
        upgrades.gearbox--;
        if (parts.gearbox >= ceiling) {
            parts.gearbox = ceiling;
            if (series == 'FS') cost -= 80;
            break;
        }
    }
    while (upgrades.brakes >= 1) {
        cost = Number(cost) + calcOne(Number(parts.brakes), Number(factories.brakes), Number(partCostBase.brakes));
        parts.brakes = Number(parts.brakes) + Number(factories.brakes);
        upgrades.brakes--;
        if (parts.brakes >= ceiling) {
            parts.brakes = ceiling;
            if (series == 'FS') cost -= 80;
            break;
        }
    }
    while (upgrades.electronics >= 1) {
        cost = Number(cost) + calcOne(Number(parts.electronics), Number(factories.electronics), Number(partCostBase.electronics));
        parts.electronics = Number(parts.electronics) + Number(factories.electronics);
        upgrades.electronics--;
        if (parts.electronics >= ceiling) {
            parts.electronics = ceiling;
            if (series == 'FS') cost -= 80;
            break;
        }
    }
    while (upgrades.suspension >= 1) {
        cost = Number(cost) + calcOne(Number(parts.suspension), Number(factories.suspension), Number(partCostBase.suspension));
        parts.suspension = Number(parts.suspension) + Number(factories.suspension);
        upgrades.suspension--;
        if (parts.suspension >= ceiling) {
            parts.suspension = ceiling;
            if (series == 'FS') cost -= 80;
            break;
        }
    }
    while (upgrades.reliability >= 1) {
        cost = Number(cost) + calcOne(Number(parts.reliability), Number(factories.reliability), Number(partCostBase.reliability));
        parts.reliability = Number(parts.reliability) + Number(factories.reliability);
        upgrades.reliability--;
        if (parts.reliability >= ceiling) {
            parts.reliability = ceiling;
            if (series == 'FS') cost -= 80;
            break;
        }
    }


    document.getElementById('final-aero').innerText = parts.aero;
    document.getElementById('final-gearbox').innerText = parts.gearbox;
    document.getElementById('final-brakes').innerText = parts.brakes;
    document.getElementById('final-electronics').innerText = parts.electronics;
    document.getElementById('final-suspension').innerText = parts.suspension;
    document.getElementById('final-reliability').innerText = parts.reliability;
    document.getElementById('cost').innerText = cost;
}
