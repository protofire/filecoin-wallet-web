import { useIsWalletProposer } from '@/hooks/useProposers'
import { FEATURES } from '@/utils/chains'
import { useAppSelector } from '@/store'
import { selectSpendingLimits } from '@/store/spendingLimitsSlice'
import useWallet from '@/hooks/wallets/useWallet'
import useIsSafeOwner from '@/hooks/useIsSafeOwner'
import { useHasFeature } from './useChains'

const useIsOnlySpendingLimitBeneficiary = (): boolean => {
  const isEnabled = useHasFeature(FEATURES.SPENDING_LIMIT)
  const spendingLimits = useAppSelector(selectSpendingLimits)
  const wallet = useWallet()
  const isSafeOwner = useIsSafeOwner()
  const isProposer = useIsWalletProposer()

  if (isSafeOwner || !isEnabled || spendingLimits.length === 0 || isProposer) {
    return false
  }

  return spendingLimits.some(({ beneficiary }) => beneficiary === wallet?.address)
}

export default useIsOnlySpendingLimitBeneficiary
