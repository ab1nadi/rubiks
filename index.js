import {init, animate, doodle, setPivotPosition} from './src/rubiks'
export function initRubiks(domClass, givenClass) {init(domClass, givenClass)}
export function animateRubiks() {animate()}
export function doodleRubiks() {doodle()}
export function setRubiksPosition(x,y) {setPivotPosition(x,y)}



