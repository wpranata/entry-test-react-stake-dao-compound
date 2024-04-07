/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { StakeDao, StakeDaoInterface } from "../../contracts/StakeDao";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Compounded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    inputs: [],
    name: "DISTRIBUTION_START",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EMISSION_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_EMISSION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "staker_",
        type: "address",
      },
    ],
    name: "claimableReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "compoundReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTotalRewardPerToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "since_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "periodSecondsRemainder_",
        type: "uint256",
      },
    ],
    name: "getDeltaPeriodWithRemainder",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "since_",
        type: "uint256",
      },
    ],
    name: "getDeltaSeconds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "staker_",
        type: "address",
      },
    ],
    name: "getLatestStakerReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "seconds_",
        type: "uint256",
      },
    ],
    name: "getPeriodSecondsRemainder",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rewardEmission_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "emissionPeriod_",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakers",
    outputs: [
      {
        internalType: "uint256",
        name: "staked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimableReward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardPerToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "latestUpdateTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "latestPeriodSecondsRemainder",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "total",
    outputs: [
      {
        internalType: "uint256",
        name: "staked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardPerToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "latestUpdateTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "latestPeriodSecondsRemainder",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506111e6806100206000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c80637a1ac61e116100b2578063a6d46d2d11610081578063bb03b4e311610066578063bb03b4e314610299578063e9503425146102b6578063f86b3587146102c957600080fd5b8063a6d46d2d14610288578063b88a802f1461029157600080fd5b80637a1ac61e146101d157806382bfefc8146101e45780639168ae721461020f578063a694fc3a1461027557600080fd5b806338c20cfa116100ee57806338c20cfa1461019a5780633ff60bc9146101ad578063404259c6146101c05780636d971a10146101c957600080fd5b80632a0ac9d9146101205780632ddbd13a146101465780632e17de781461017c57806333c56e0b14610191575b600080fd5b61013361012e36600461102c565b6102dc565b6040519081526020015b60405180910390f35b60055460065460075460085461015c9392919084565b60408051948552602085019390935291830152606082015260800161013d565b61018f61018a366004611047565b6102ed565b005b61013360035481565b6101336101a8366004611047565b61045c565b6101336101bb366004611047565b610467565b61013360015481565b61018f610472565b61018f6101df366004611060565b61054d565b6000546101f7906001600160a01b031681565b6040516001600160a01b03909116815260200161013d565b61024d61021d36600461102c565b60046020819052600091825260409091208054600182015460028301546003840154939094015491939092909185565b604080519586526020860194909452928401919091526060830152608082015260a00161013d565b61018f610283366004611047565b6107c7565b61013360025481565b61018f610987565b6102a1610a4d565b6040805192835260208301919091520161013d565b6101336102c436600461102c565b610a60565b6102a16102d7366004611093565b610a9a565b60006102e782610ab3565b92915050565b600081116103675760405162461bcd60e51b8152602060048201526024808201527f556e7374616b6520616d6f756e742073686f756c64206265206d6f726520746860448201527f616e20300000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b336000908152600460205260409020548111156103c65760405162461bcd60e51b815260206004820152601a60248201527f496e73756666696369656e74207374616b656420616d6f756e74000000000000604482015260640161035e565b6103ce610b35565b33600090815260046020526040812080548392906103ed9084906110cb565b9091555050600580548291906000906104079084906110cb565b9091555050600054610423906001600160a01b03163383610bd2565b60405181815233907f0f5bb82176feb1b5e747e28471aa92156a04d9f3ab9f45f28e2d704232b93f75906020015b60405180910390a250565b60006102e782610c4b565b60006102e782610c57565b61047a610b35565b3360009081526004602052604090206001810154806104db5760405162461bcd60e51b815260206004820152601660248201527f4e6f20636f6d706f756e6461626c652072657761726400000000000000000000604482015260640161035e565b6000600183018190558254829184916104f59084906110de565b90915550506005805482919060009061050f9084906110de565b909155505060405181815233907fc16de066392da7e40ceccb739c331fc48a2e76bf147449613c48023d960eec329060200160405180910390a25050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000810460ff16159067ffffffffffffffff166000811580156105985750825b905060008267ffffffffffffffff1660011480156105b55750303b155b9050811580156105c3575080155b156105fa576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561062e57845468ff00000000000000001916680100000000000000001785555b6040516370a0823160e01b815230600482015288906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610677573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069b91906110f1565b9050888110156107135760405162461bcd60e51b815260206004820152602c60248201527f496e73756666696369656e742062616c616e636520666f72207265776172642060448201527f646973747269627574696f6e0000000000000000000000000000000000000000606482015260840161035e565b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03841617905560018990556002889055426003819055600781905561076d9061076890610c4b565b610c57565b600855505083156107bd57845468ff000000000000000019168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b6000811161083d5760405162461bcd60e51b815260206004820152602260248201527f5374616b6520616d6f756e742073686f756c64206265206d6f7265207468616e60448201527f2030000000000000000000000000000000000000000000000000000000000000606482015260840161035e565b6000546040516370a0823160e01b815233600482015282916001600160a01b0316906370a0823190602401602060405180830381865afa158015610885573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a991906110f1565b10156108f75760405162461bcd60e51b815260206004820152601460248201527f496e73756666696369656e742062616c616e6365000000000000000000000000604482015260640161035e565b6108ff610b35565b336000908152600460205260408120805483929061091e9084906110de565b9091555050600580548291906000906109389084906110de565b9091555050600054610955906001600160a01b0316333084610c7e565b60405181815233907f9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d90602001610451565b61098f610b35565b33600090815260046020526040902060010154806109ef5760405162461bcd60e51b815260206004820152601360248201527f4e6f20636c61696d61626c652072657761726400000000000000000000000000604482015260640161035e565b33600081815260046020526040812060010181905554610a1b916001600160a01b039091169083610bd2565b60405181815233907fd8138f8a3f377c5259ca548e70e4c2de94f129f5a11036a15b69513cba2b426a90602001610451565b600080610a58610cbd565b915091509091565b6001600160a01b03811660009081526004602052604081206001015481610a8684610ab3565b9050610a9281836110de565b949350505050565b600080610aa78484610d4f565b915091505b9250929050565b6001600160a01b0381166000908152600460205260408120548103610ada57506000919050565b6000610ae4610cbd565b506001600160a01b03841660009081526004602052604081206002015491925090610b0f90836110cb565b6001600160a01b038516600090815260046020526040902054909150610a92908261110a565b610b3d610da8565b336000908152600460205260408120600301549003610b6157610b5f33610dd1565b565b33600090815260046020819052604082206003810154918101549092918291610b8a9190610d4f565b9150915081600014610bb857610b9f33610ab3565b836001016000828254610bb291906110de565b90915550505b600654600284015542600384015560049092019190915550565b6040516001600160a01b03838116602483015260448201839052610c4691859182169063a9059cbb906064015b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610e12565b505050565b60006102e782426110cb565b600254600090610c678184611137565b600254610c7491906110cb565b6102e79190611137565b6040516001600160a01b038481166024830152838116604483015260648201839052610cb79186918216906323b872dd90608401610bff565b50505050565b6000804260056002015403610cd85750506006546008549091565b600080610cef600560020154600560030154610d4f565b915091508160001480610d025750600554155b15610d135760065494909350915050565b600060056000015483600154610d29919061110a565b610d33919061114b565b600654909150610d449082906110de565b959194509092505050565b6000806000610d5d85610c4b565b905083811015610d7d576000610d7382866110cb565b9250925050610aac565b600060025482610d8d919061114b565b90506000610d9a83610c57565b919791965090945050505050565b600080610db3610cbd565b60065491935091508214610dc75760068290555b4260075560085550565b6001600160a01b03811660009081526004602052604090204260038083019190915554610e019061076890610c4b565b600482015560065460029091015550565b6000610e276001600160a01b03841683610e8e565b90508051600014158015610e4c575080806020019051810190610e4a919061115f565b155b15610c46576040517f5274afe70000000000000000000000000000000000000000000000000000000081526001600160a01b038416600482015260240161035e565b6060610e9c83836000610ea3565b9392505050565b606081471015610ee1576040517fcd78605900000000000000000000000000000000000000000000000000000000815230600482015260240161035e565b600080856001600160a01b03168486604051610efd9190611181565b60006040518083038185875af1925050503d8060008114610f3a576040519150601f19603f3d011682016040523d82523d6000602084013e610f3f565b606091505b5091509150610f4f868383610f59565b9695505050505050565b606082610f6e57610f6982610fce565b610e9c565b8151158015610f8557506001600160a01b0384163b155b15610fc7576040517f9996b3150000000000000000000000000000000000000000000000000000000081526001600160a01b038516600482015260240161035e565b5080610e9c565b805115610fde5780518082602001fd5b6040517f1425ea4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80356001600160a01b038116811461102757600080fd5b919050565b60006020828403121561103e57600080fd5b610e9c82611010565b60006020828403121561105957600080fd5b5035919050565b60008060006060848603121561107557600080fd5b61107e84611010565b95602085013595506040909401359392505050565b600080604083850312156110a657600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b818103818111156102e7576102e76110b5565b808201808211156102e7576102e76110b5565b60006020828403121561110357600080fd5b5051919050565b80820281158282048414176102e7576102e76110b5565b634e487b7160e01b600052601260045260246000fd5b60008261114657611146611121565b500690565b60008261115a5761115a611121565b500490565b60006020828403121561117157600080fd5b81518015158114610e9c57600080fd5b6000825160005b818110156111a25760208186018101518583015201611188565b50600092019182525091905056fea2646970667358221220be21deb8ff90a3ada4ea9a9c0caa1f72b30fe9787444ffd92b21f81779fcc48b64736f6c63430008180033";

type StakeDaoConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakeDaoConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakeDao__factory extends ContractFactory {
  constructor(...args: StakeDaoConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      StakeDao & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): StakeDao__factory {
    return super.connect(runner) as StakeDao__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakeDaoInterface {
    return new Interface(_abi) as StakeDaoInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): StakeDao {
    return new Contract(address, _abi, runner) as unknown as StakeDao;
  }
}
