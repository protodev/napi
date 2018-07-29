import { GuardEmptyArrayException } from "./exceptions/guardEmptyArrayException";
import { GuardException } from "./exceptions/guardException";

export function guardEmptyArray(target?: any, key?: string): void {
    let array = target;
    
    if (!target) {
        throw new GuardException('a target to guard must be supplied');
    }

    if (!Array.isArray(target)) {
        if (!key) {
            throw new GuardException('a key to guard must be supplied');
        }
        
        array = target[key];
        if (!Array.isArray(array)) {
            throw new GuardEmptyArrayException(`target[${key}] must be an array`)
        }
    }

    if (array.length === 0) {
        throw new GuardEmptyArrayException();
    }
}