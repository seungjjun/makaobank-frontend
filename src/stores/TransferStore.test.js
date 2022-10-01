import TransferStore from './TransferStore';

const context = describe;

describe('TransferStore', () => {
  context('when amount is correct', () => {
    it('updates amount', () => {
      const transferStore = new TransferStore();

      expect(transferStore.amount('12345678')).toBe(2_000);
      expect(transferStore.amount('56789012')).toBe(0);

      transferStore.transfer('12345678', '56789012', 1_000);

      expect(transferStore.amount('12345678')).toBe(1_000);
      expect(transferStore.amount('56789012')).toBe(1_000);
    });
  });

  context('when amount is too large', () => {
    it('updates amount', () => {
      const transferStore = new TransferStore();

      expect(transferStore.amount('12345678')).toBe(2_000);
      expect(transferStore.amount('56789012')).toBe(0);

      transferStore.transfer('12345678', '56789012', 10_000);

      expect(transferStore.amount('12345678')).toBe(2_000);
      expect(transferStore.amount('56789012')).toBe(0);
    });
  });
});
