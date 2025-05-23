// This file is part of Astar.

// Copyright (C) Stake Technologies Pte.Ltd.
// SPDX-License-Identifier: GPL-3.0-or-later

// Astar is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Astar is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Astar. If not, see <http://www.gnu.org/licenses/>.

use super::*;

use frame_benchmarking::v2::*;
use frame_support::traits::tokens::Precision;
use frame_system::{Pallet as System, RawOrigin};
use sp_std::prelude::*;

const UNIT: u128 = 1_000_000_000_000_000_000;

/// Assert that the last event equals the provided one.
fn assert_last_event<T: Config>(generic_event: <T as Config>::RuntimeEvent) {
    System::<T>::assert_last_event(generic_event.into());
}

// Set up initial config in the database, so it's not empty.
fn initial_config<T: Config>() {
    // Some dummy inflation params
    let params = InflationParameters {
        max_inflation_rate: Perquintill::from_percent(7),
        treasury_part: Perquintill::from_percent(5),
        collators_part: Perquintill::from_percent(3),
        dapps_part: Perquintill::from_percent(20),
        base_stakers_part: Perquintill::from_percent(25),
        adjustable_stakers_part: Perquintill::from_percent(35),
        bonus_part: Perquintill::from_percent(12),
        ideal_staking_rate: Perquintill::from_percent(50),
    };
    assert!(params.is_valid());

    // Some dummy inflation config
    let total_issuance = T::Currency::total_issuance();
    let issuance_safety_cap =
        total_issuance.saturating_add(params.max_inflation_rate * total_issuance);
    let config = InflationConfiguration {
        recalculation_era: 123,
        issuance_safety_cap,
        collator_reward_per_block: 11111 * UNIT,
        treasury_reward_per_block: 33333 * UNIT,
        dapp_reward_pool_per_era: 55555 * UNIT,
        base_staker_reward_pool_per_era: 77777 * UNIT,
        adjustable_staker_reward_pool_per_era: 99999 * UNIT,
        bonus_reward_pool_per_period: 123987 * UNIT,
        ideal_staking_rate: Perquintill::from_percent(50),
    };

    InflationParams::<T>::put(params);
    ActiveInflationConfig::<T>::put(config);

    // Create some issuance so it's not zero
    let dummy_account = whitelisted_caller();
    let _debt = T::Currency::deposit(
        &dummy_account,
        1_000_000_000_000_000_000_000,
        Precision::Exact,
    )
    .expect("Must succeed for benchmarking");
}

#[benchmarks]
mod benchmarks {
    use super::*;

    #[benchmark]
    fn force_set_inflation_params() {
        initial_config::<T>();

        let params = InflationParameters::default();
        assert!(params.is_valid());

        #[extrinsic_call]
        _(RawOrigin::Root, params);

        assert_last_event::<T>(Event::<T>::InflationParametersForceChanged.into());
    }

    #[benchmark]
    fn force_inflation_recalculation() {
        initial_config::<T>();

        #[extrinsic_call]
        _(RawOrigin::Root, 123);

        let config = ActiveInflationConfig::<T>::get();
        assert_last_event::<T>(Event::<T>::ForcedInflationRecalculation { config }.into());
    }

    #[benchmark]
    fn force_readjust_config() {
        initial_config::<T>();

        #[extrinsic_call]
        _(RawOrigin::Root);

        let config = ActiveInflationConfig::<T>::get();
        assert_last_event::<T>(Event::<T>::ForcedInflationRecalculation { config }.into());
    }

    #[benchmark]
    fn recalculation() {
        initial_config::<T>();

        let init_recalculation_era = ActiveInflationConfig::<T>::get().recalculation_era;
        DoRecalculation::<T>::put(init_recalculation_era);

        #[block]
        {
            Pallet::<T>::block_before_new_era(init_recalculation_era);
            Pallet::<T>::on_finalize(1u32.into());
        }

        assert!(ActiveInflationConfig::<T>::get().recalculation_era > init_recalculation_era);
    }

    #[benchmark]
    fn hooks_without_recalculation() {
        initial_config::<T>();

        let init_config = ActiveInflationConfig::<T>::get();
        let init_issuance = T::Currency::total_issuance();
        DoRecalculation::<T>::kill();

        let block = 1u32.into();
        #[block]
        {
            Pallet::<T>::on_initialize(block);
            Pallet::<T>::on_finalize(block);
        }

        assert_eq!(ActiveInflationConfig::<T>::get(), init_config);

        // The 'sane' assumption is that at least something will be issued for treasury & collators
        assert!(T::Currency::total_issuance() > init_issuance);
    }

    impl_benchmark_test_suite!(
        Pallet,
        crate::benchmarking::tests::new_test_ext(),
        crate::mock::Test,
    );
}

#[cfg(test)]
mod tests {
    use crate::mock;
    use sp_io::TestExternalities;

    pub fn new_test_ext() -> TestExternalities {
        mock::ExternalityBuilder::build()
    }
}
