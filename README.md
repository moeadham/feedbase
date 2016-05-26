Feedbase
========

This simple contract enables anyone to create "price feeds" which can
be used to publish an arbitrary sequence of values over time.

The feeds can be updated by their owners at any time, and expiration
dates can be set to prevent consumers from reading stale data.

Feeds can be transferred between owners, and the owner of a feed is
able to charge a fee to on-chain consumers.


Installation
------------

Feedbase can be installed using npm:

    $ npm install -g feedbase

By default, Feedbase connects to the local Ethereum node on port 8545
and uses the coinbase account as the default account.  To change this,
you can set the environment variables `ETH_RPC_URL` and `ETH_ACCOUNT`.


Claiming a feed
---------------

Before you can start publishing values, you need to claim a feed ID:

    $ feedbase claim
    {
      "id": 15,
      "owner": "0xeb5150cc175e6892c1bd7bf559aab19e3d347e69",
      "description": "",
      "token": "0x0000000000000000000000000000000000000000",
      "fee": "0x0",
      "value": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 0,
      "expiration": 0,
      "expired": true
    }

If you want to be able to charge a fee, when claiming your feed ID,
you need to specify the address of the token you wish to use:

    $ feedbase claim 0x4244e29ec71fc32a34dba8e89d4856e507d1bc87
    {
      "id": 16,
      "owner": "0xeb5150cc175e6892c1bd7bf559aab19e3d347e69",
      "description": "",
      "token": "0x4244e29ec71fc32a34dba8e89d4856e507d1bc87",
      "fee": "0x0",
      "value": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 0,
      "expiration": 0,
      "expired": true
    }

The token address of a feed can never be changed, but the fee itself
can be reset at any time (including to zero):

    $ feedbase set-fee 16 0x10000000

Fees are always charged to the first contract to read each value,
but the fee is not charged to subsequent reads of the same value.
When a new value is published, the fee is charged again.

If you want, you can add a description (32 bytes maximum):

    $ feedbase set-description 16 "Temperature in Central Park"

Inspect the feed to make sure your changes went through:

    $ feedbase inspect 16
    {
      "id": 16,
      "owner": "0xeb5150cc175e6892c1bd7bf559aab19e3d347e69",
      "description": "Temperature in Central Park",
      "token": "0x4244e29ec71fc32a34dba8e89d4856e507d1bc87",
      "fee": "0x10000000",
      "value": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 0,
      "expiration": 0,
      "expired": true
    }


Publishing feed values
----------------------

Feed values are 32 bytes of arbitrary data plus expiration dates:

    $ feedbase publish 16 \
    0x0000000000000000000000000000000490000000000000000000000000000000 \
    $((`date +%s` + 300))

In this example we're setting the value of the feed to the number 73
represented in 128x128 fixed-point notation.  The expiration date is
set to 5 minutes from now.


More information
----------------

For more details, please consult the following files:

    bin/feedbase
    lib/feedbase.js
    contracts/feedbase.sol
    contracts/feedbase_test.sol
