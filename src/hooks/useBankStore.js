import { useEffect } from 'react';

import { bankStore } from '../stores/BankStore';

import useForceUpdate from './useForceUpdate';

export default function useBankStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    bankStore.subscribe(forceUpdate);

    return () => bankStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return bankStore;
}
