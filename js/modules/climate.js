/**
 * @file Class definitions for climate generators
 * @author Zachary Mullen
 * @module climate
 * @typedef { import("../../types/climate").ClimateGenerator }
 */

/**
 * @implements {ClimateGenerator}
 * @param {number} week - The current week of the simulation
 * @param {number} temperature - The current temperature of the simulation
 */
class IntegralStableClimate {
    constructor(week, temperature) {
        this.week = week;
        this.temperature = temperature;
        // random number between 21 and 28
        this.baseSnowlessYearWeek = Math.floor(Math.random() * 8) + 21;
        this.currentSnowlessYearWeek = this.baseSnowlessYearWeek;
        this.snowWeek = 36;
    }

    advanceWeek() {
        this.week++;
    }
    
    getSnowCoverage() {
        const yearWeek = this.week % 52;
        // if start of year, choose a random week within a delta of 1 week of the base week
        if (yearWeek === 0) {
            const delta = Math.floor(Math.random() * 3) - 1;
            this.currentSnowlessYearWeek = this.baseSnowlessYearWeek + delta
        }
        // set the temperature to 0 if it is between the snowless week and the snow week
        if (yearWeek < this.currentSnowlessYearWeek || yearWeek >= this.snowWeek) {
            this.temperature = 0;
        } else {
            this.temperature = 10;
        }
        if (this.temperature < 1) {
            return 1;
        }
        return 0;
    }
};

/**
 * @implements {ClimateGenerator}
 * @param {number} week - The current week of the simulation
 * @param {number} temperature - The current temperature of the simulation
 * @todo Implement variable climate logic
 */
class IntegralVariableClimate {
    constructor(week, temperature) {
        this.week = week;
        this.temperature = temperature;
    }
    advanceWeek() {
        this.week++;
    }
    getSnowCoverage() {
        return 0;
    }
};

export {
    IntegralStableClimate,
    IntegralVariableClimate,
};
