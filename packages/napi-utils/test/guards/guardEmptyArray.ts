import 'mocha';
import { expect } from 'chai';
import { guardEmptyArray } from '../../src/guards/guardEmptyArray';
import { GuardEmptyArrayException } from '../../src/guards/exceptions/guardEmptyArrayException';
import { GuardException } from '../../src/guards/exceptions/guardException';

class FailingTestGuard {
    private _sampleArray = [];
}

class PassingTestGuard {
    private _sampleArray = ['value'];
}

describe('guardEmptyArray', () => {
    it('should throw GuardException when nothing is supplied', () => {
        expect(guardEmptyArray).to.throw(GuardException);
    });

    it('should throw GuardEmptyArrayException when [] is supplied', () => {
        expect((() => guardEmptyArray([]))).to.throw(GuardEmptyArrayException);
    });

    it('should throw when array as property is empty', () => {
        expect(() => guardEmptyArray(new FailingTestGuard(), '_sampleArray')).to.throw(GuardEmptyArrayException);
    });

    it('should throw when array as property key is null', () => {
        expect(() => guardEmptyArray(new FailingTestGuard, null)).to.throw(GuardException);
    });

    it('should throw when array as property key is undefined', () => {
        expect(() => guardEmptyArray(new FailingTestGuard, undefined)).to.throw(GuardException);
    });

    it('should throw when array as property key is empty', () => {
        expect(() => guardEmptyArray(new FailingTestGuard, '')).to.throw(GuardException);
    });

    it('should throw when array as property key is blank', () => {
        expect(() => guardEmptyArray(new FailingTestGuard, ' ')).to.throw(GuardException);
    });

    it('should throw when array as property key is unknown', () => {
        expect(() => guardEmptyArray(new FailingTestGuard, 'unknown')).to.throw(GuardException);
    });

    it('should not throw when [value] is supplied', () => {
        expect(() => guardEmptyArray(['value'])).to.not.throw();
    });

    it('should not throw when array as property is supplied', () => {
        expect(() => guardEmptyArray(new PassingTestGuard(), '_sampleArray')).to.not.throw();
    });
});