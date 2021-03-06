import changeAmountPerPoint from '../changeAmountPerPoint';

describe('changeAmountPerPoint', () => {
    it('should never return value more than 2 decimal places', () => {
        const newVal = 0.99999;
        const updatedAmountPerPoint = changeAmountPerPoint(newVal);
        expect(updatedAmountPerPoint.amountPerPoint.length).toEqual(4);
    });
});
