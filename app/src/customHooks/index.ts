import { useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import { abi, contractAddress } from "../contractConfig";

export const contractInterface = new utils.Interface(abi);
export const contract = new Contract(contractAddress, contractInterface);

export function useContractMethod(
  methodName: string,
  transactionName?: string
) {
  const { state, send } = useContractFunction(contract, methodName, {
    transactionName: transactionName,
  });
  return { state, send };
}
