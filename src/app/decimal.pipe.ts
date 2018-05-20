import { Pipe, PipeTransform, Injectable } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'decimal' })
@Injectable()
export class DecimalPipe implements PipeTransform {
    transform(value: number): number {
        return Math.round(value * 100) / 100
    }
}