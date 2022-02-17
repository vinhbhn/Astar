initSidebarItems({"constant":[["DAYS",""],["GAS_PER_SECOND","Current approximation of the gas/s consumption considering EVM execution over compiled WASM (on 4.4Ghz CPU). Given the 500ms Weight, from which 75% only are used for transactions, the total EVM execution gas limit is: GAS_PER_SECOND * 0.500 * 0.75 ~= 15_000_000."],["HOURS",""],["MILLISDN","Constant values used within the runtime."],["MILLISECS_PER_BLOCK","Change this to adjust the block time."],["MINUTES",""],["SDN",""],["VERSION","Runtime version."],["WASM_BINARY",""],["WASM_BINARY_BLOATY",""],["WEIGHT_PER_GAS","Approximate ratio of the amount of Weight per Gas. u64 works for approximations because Weight is a very small unit compared to gas."]],"enum":[["BalancesCall","Contains one variant per dispatchable that can be called by an extrinsic."],["Call",""],["Event",""],["OriginCaller",""],["SmartContract","Multi-VM pointer to smart contract instance."]],"fn":[["deposit","Charge fee for stored bytes and items."],["native_version","Native version."],["wasm_binary_unwrap","Wasm binary unwrapped. If built with `BUILD_DUMMY_WASM_BINARY`, the function panics."]],"mod":[["api",""]],"struct":[["AdjustmentVariable",""],["BaseFeeThreshold",""],["BaseFilter",""],["BasicDeposit",""],["BlockGasLimit","EVM gas limit"],["BlockPerEra",""],["BonusEraDuration",""],["CallFee",""],["CallMagicNumber",""],["ChainId","Ethereum-compatible chain_id:"],["DappsStakingPalletId",""],["DealWithFees",""],["DefaultBaseFeePerGas",""],["DeletionQueueDepth",""],["DeletionWeightLimit",""],["DepositBase",""],["DepositFactor",""],["DepositPerByte",""],["DepositPerItem",""],["DeveloperRewardPercentage",""],["EcdsaUnsignedPriority",""],["ExistentialDeposit",""],["FieldDeposit",""],["FindAuthorTruncated",""],["FixedGasPrice",""],["GenesisConfig",""],["HistoryDepth",""],["IsActive",""],["MaxAdditionalFields",""],["MaxAuthorities",""],["MaxCandidates",""],["MaxInvulnerables",""],["MaxLocks",""],["MaxNumberOfStakersPerContract",""],["MaxRegistrars",""],["MaxReserves",""],["MaxSignatories",""],["MaxSubAccounts",""],["MaxUnlockingChunks",""],["MaxValueSize",""],["MinCandidates",""],["MinVestedTransfer",""],["MinimumMultiplier",""],["MinimumPeriod",""],["MinimumRemainingAmount",""],["MinimumStakingAmount",""],["OnBlockReward",""],["OperationalFeeMultiplier",""],["Origin","The runtime origin type representing the origin of a call."],["PalletInfo","Provides an implementation of `PalletInfo` to provide information about the pallet setup in the runtime."],["PotId",""],["PrecompilesValue",""],["RegisterDeposit",""],["ReservedDmpWeight",""],["RewardAmount",""],["Runtime",""],["RuntimeApi",""],["RuntimeApiImpl","Implements all runtime apis for the client side."],["RuntimeBlockLength",""],["RuntimeBlockWeights",""],["SS58Prefix",""],["Schedule",""],["SessionKeys",""],["SessionOffset",""],["SessionPeriod",""],["ShibuyaNetworkPrecompiles","The PrecompileSet installed in the Shiden runtime."],["ShidenGasWeightMapping",""],["SubAccountDeposit",""],["TargetBlockFullness",""],["ToStakingPot",""],["TransactionByteFee",""],["TreasuryPalletId",""],["UnbondingPeriod",""],["UncleGenerations",""],["Version",""],["WeightToFee","Handles converting a weight scalar to a fee value, based on the scale and granularity of the node’s balance type."]],"trait":[["BuildStorage","Complex storage builder stuff."]],"type":[["AccountId","Some way of identifying an account on the chain. We intentionally make it equivalent to the public key of our transaction signing scheme."],["Address","The address format for describing accounts."],["AllPallets","All pallets included in the runtime as a nested tuple of types."],["AllPalletsReversedWithSystemFirst","All pallets included in the runtime as a nested tuple of types in reversed order. With the system pallet first."],["AllPalletsWithSystem","All pallets included in the runtime as a nested tuple of types."],["AllPalletsWithSystemReversed","All pallets included in the runtime as a nested tuple of types in reversed order."],["AllPalletsWithoutSystem","All pallets included in the runtime as a nested tuple of types. Excludes the System pallet."],["AllPalletsWithoutSystemReversed","All pallets included in the runtime as a nested tuple of types in reversed order. Excludes the System pallet."],["Aura",""],["AuraConfig",""],["AuraExt",""],["AuraExtConfig",""],["AuraId","An Aura authority identifier using S/R 25519 as its crypto."],["Authorship",""],["Balance","Balance of an account."],["Balances",""],["BalancesConfig",""],["BaseFee",""],["BaseFeeConfig",""],["Block","Block type as expected by this runtime."],["BlockId","BlockId type as expected by this runtime."],["BlockNumber","An index to a block."],["BlockReward",""],["CheckedExtrinsic","Extrinsic type that has already been checked."],["CollatorSelection",""],["CollatorSelectionConfig",""],["Contracts",""],["DappsStaking",""],["EVM",""],["EVMConfig",""],["EthCall",""],["Ethereum",""],["EthereumConfig",""],["Executive","Executive: handles dispatch to the various modules."],["Hash","A hash of some data used by the chain."],["Header","Block header type as expected by this runtime."],["Identity",""],["Index","Index of a transaction in the chain."],["Multisig",""],["ParachainInfo",""],["ParachainInfoConfig",""],["ParachainSystem",""],["Precompiles",""],["RandomnessCollectiveFlip",""],["Session",""],["SessionConfig",""],["Signature","Alias to 512-bit hash when used in the context of a transaction signature on the chain."],["SignedBlock","A Block signed with a Justification"],["SignedExtra","The SignedExtension to the basic transaction logic."],["SignedPayload","The payload being signed in transactions."],["Sudo",""],["SudoConfig",""],["System",""],["SystemConfig",""],["Timestamp",""],["TransactionPayment",""],["UncheckedExtrinsic","Unchecked extrinsic type as expected by this runtime."],["Utility",""],["Vesting",""],["VestingConfig",""]]});