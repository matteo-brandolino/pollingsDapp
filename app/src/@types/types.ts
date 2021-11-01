import { BigNumberish } from "ethers";

export type ParamsType = {
  id: BigNumberish;
  title: string;
  body: string;
  numYes: BigNumberish;
  numNo: BigNumberish;
  numVoters: BigNumberish;
  payBack: BigNumberish;
  creator: string;
};
export type ContractCall = {
  abi: any;
  addres: string;
  method: string;
  arg: number[] | any;
};
