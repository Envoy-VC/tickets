import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/ui/tabs';

import CardPayments from '../card-payment';
import CryptoPayment from '../crypto-payment';

const Payment = () => {
  return (
    <Tabs defaultValue='card' className='!dark'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='card'>Credit/Debit Card</TabsTrigger>
        <TabsTrigger value='crypto'>Pay with Crypto</TabsTrigger>
      </TabsList>
      <TabsContent value='card'>
        <CardPayments />
      </TabsContent>
      <TabsContent value='crypto'>
        <CryptoPayment />
      </TabsContent>
    </Tabs>
  );
};

export default Payment;
