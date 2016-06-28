'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['feedbase'] = (function builder () {
  var environments = {
      'morden': {
        'objects': {
          'feedbase': {
            'class': 'Feedbase',
            'address': '0x813fcfcf74688c62eb36211ccdc5ba1f068759c3'
          }
        }
      }
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
      'objects': {
        'feedbase': {
          'class': 'Feedbase',
          'address': '0x813fcfcf74688c62eb36211ccdc5ba1f068759c3'
        }
      }
    };
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'Feedbase': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'fee',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'expiration',
            'outputs': [
              {
                'name': '',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'paid',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'token',
                'type': 'address'
              }
            ],
            'name': 'claim',
            'outputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'paymentNeeded',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'fee',
                'type': 'uint256'
              }
            ],
            'name': 'setFee',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'tryRead',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'claim',
            'outputs': [
              {
                'name': '',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'description',
                'type': 'bytes32'
              }
            ],
            'name': 'setDescription',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'expired',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'transfer',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'read',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'free',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'timestamp',
            'outputs': [
              {
                'name': '',
                'type': 'uint64'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'token',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              },
              {
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'name': 'expiration',
                'type': 'uint64'
              }
            ],
            'name': 'publish',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'description',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Claimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Configured',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Published',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Paid',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526110bd806100126000396000f3606060405236156100f8576000357c0100000000000000000000000000000000000000000000000000000000900480630fdb468f146100fa5780631216e771146101265780631c2f38ff1461015c5780631e83409a1461018a5780631fb6e99d146101c057806321b36a08146101ee57806349cbe3381461020f5780634d1f8c31146102485780634e71d92d1461028a578063774343a6146102b75780637c79ebce146102d85780637ef094761461030657806389b8b492146103275780639e66cd3814610357578063c017111214610385578063cebce72d146103bb578063df9fb6df146103fd578063e86afde014610427576100f8565b005b6101106004808035906020019091905050610457565b6040518082815260200191505060405180910390f35b61013c6004808035906020019091905050610497565b604051808267ffffffffffffffff16815260200191505060405180910390f35b61017260048080359060200190919050506104e8565b60405180821515815260200191505060405180910390f35b6101a06004808035906020019091905050610532565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6101d660048080359060200190919050506106a0565b60405180821515815260200191505060405180910390f35b61020d60048080359060200190919080359060200190919050506106fd565b005b610225600480803590602001909190505061080f565b604051808360001916815260200182151581526020019250505060405180910390f35b61025e600480803590602001909190505061088d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61029760048050506108ea565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6102d66004808035906020019091908035906020019091905050610900565b005b6102ee60048080359060200190919050506109ff565b60405180821515815260200191505060405180910390f35b6103256004808035906020019091908035906020019091905050610a5c565b005b61033d6004808035906020019091905050610b7c565b604051808260001916815260200191505060405180910390f35b61036d6004808035906020019091905050610baa565b60405180821515815260200191505060405180910390f35b61039b6004808035906020019091905050610c36565b604051808267ffffffffffffffff16815260200191505060405180910390f35b6103d16004808035906020019091905050610c87565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104256004808035906020019091908035906020019091908035906020019091905050610ce4565b005b61043d6004808035906020019091905050610ebf565b604051808260001916815260200191505060405180910390f35b600060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b50600201600050549050610492565b919050565b600060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060050160089054906101000a900467ffffffffffffffff1690506104e3565b919050565b600060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060050160109054906101000a900460ff16905061052d565b919050565b600068060000000000000000600081819054906101000a900467ffffffffffffffff168092919060010191906101000a81548167ffffffffffffffff021916908302179055509050805060006806000000000000000060009054906101000a900467ffffffffffffffff1667ffffffffffffffff1614156105b257610002565b3360006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508160006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508067ffffffffffffffff167f5f4ef1494bcb0f5e604fbc98ffaeb0f9a9726ac34005ed67e83ce91e3773da5560405180905060405180910390a25b919050565b60006106ab82610baa565b1580156106f1575060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060050160109054906101000a900460ff16155b90506106f8565b919050565b8160006000508167ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561078657610002565b61078f83610baa565b1561079957610002565b8160006000508467ffffffffffffffff16680100000000000000008110156100025790906006020160005b50600201600050819055508267ffffffffffffffff167f49f909d090a95aef91667c0010548957082fc75b87ed1f772e2f0193bc179a7f60405180905060405180910390a2505b5050565b6000600061081c836109ff565b8061082e575061082c8333610eff565b155b1561084a57600060008160010291509150915061088856610887565b60006000508367ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060040160005054600191509150610888565b5b915091565b600060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506108e5565b919050565b60006108f66000610532565b90506108fd565b90565b8160006000508167ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561098957610002565b8160006000508467ffffffffffffffff16680100000000000000008110156100025790906006020160005b50600101600050819055508267ffffffffffffffff167f49f909d090a95aef91667c0010548957082fc75b87ed1f772e2f0193bc179a7f60405180905060405180910390a2505b5050565b600060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060050160089054906101000a900467ffffffffffffffff1667ffffffffffffffff1642119050610a57565b919050565b8160006000508167ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ae557610002565b8160006000508467ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508267ffffffffffffffff167f49f909d090a95aef91667c0010548957082fc75b87ed1f772e2f0193bc179a7f60405180905060405180910390a2505b5050565b600060006000610b8b8461080f565b91509150801515610b9b57610002565b819250610ba3565b5050919050565b6000600073ffffffffffffffffffffffffffffffffffffffff1660006000508367ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050610c31565b919050565b600060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060050160009054906101000a900467ffffffffffffffff169050610c82565b919050565b600060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610cdf565b919050565b8260006000508167ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d6d57610002565b8260006000508567ffffffffffffffff16680100000000000000008110156100025790906006020160005b50600401600050819055504260006000508567ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060050160006101000a81548167ffffffffffffffff021916908302179055508160006000508567ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060050160086101000a81548167ffffffffffffffff02191690830217905550600060006000508567ffffffffffffffff16680100000000000000008110156100025790906006020160005b5060050160106101000a81548160ff021916908302179055508367ffffffffffffffff167f702d5266917c5f67a70dd2dfcc0ab488ccbba11b6d571ed60fecfba18f88657a60405180905060405180910390a2505b505050565b600060006000508267ffffffffffffffff16680100000000000000008110156100025790906006020160005b50600101600050549050610efa565b919050565b6000600060006000508467ffffffffffffffff16680100000000000000008110156100025790906006020160005b509050610f39846106a0565b1515610f4a576001915081506110b5565b8060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd848360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168460020160005054604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506020604051808303816000876161da5a03f1156100025750505060405180519060200150156110ad578367ffffffffffffffff167f6bb8ef5b69e9aa0d6757dbd4ac50ed4b60f0c59f21c6fc1ca2254cb3e97bf99260405180905060405180910390a260018160050160106101000a81548160ff021916908302179055506001915081506110b4565b6000915081505b5b5b509291505056'
      },
      'FeedbaseEvents': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Claimed',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Configured',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Published',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'Paid',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052600a8060106000396000f360606040526008565b00'
      },
      'FeedbaseTester': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'tryRead',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'target',
                'type': 'address'
              }
            ],
            'name': '_target',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'uint64'
              }
            ],
            'name': 'read',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          }
        ],
        'bytecode': '60606040526102df806100126000396000f360606040523615610053576000357c01000000000000000000000000000000000000000000000000000000009004806349cbe338146100cb5780634bbb216c1461010457806389b8b4921461011c57610053565b6100c95b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600036604051808383808284378201915050925050506000604051808303816000866161da5a03f191505015156100c657610002565b5b565b005b6100e1600480803590602001909190505061014c565b604051808360001916815260200182151581526020019250505060405180910390f35b61011a6004808035906020019091905050610203565b005b6101326004808035906020019091905050610232565b604051808260001916815260200191505060405180910390f35b60006000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166349cbe33884604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506040604051808303816000876161da5a03f1156100025750505060405180519060200180519060200150915091506101fe565b915091565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166389b8b49283604051827c0100000000000000000000000000000000000000000000000000000000028152600401808267ffffffffffffffff1681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015090506102da565b91905056'
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      this.objects[i] = this.classes[obj['class']].at(obj.address);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['feedbase'];
}
