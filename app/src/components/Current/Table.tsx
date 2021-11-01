import { DataGrid, GridColDef, GridRowData } from "@mui/x-data-grid";
import {
  ContractCall,
  shortenIfAddress,
  useContractCalls,
} from "@usedapp/core";
import { useEffect, useState } from "react";
import { ParamsType } from "../../@types/types";
import { useGlobalContext, Menu } from "../../context/GlobalContext";
import { contractAddress, contractInterface } from "../../customHooks";
import VoteDialog from "../VoteDialog";

export default function Table() {
  const [contractCallsArray, setContractCallsArray] = useState<ContractCall[]>(
    []
  );
  const fakeRow = [
    {
      id: 0,
      title: "First",
      body: "Poll",
      numYes: 35,
      numNo: 23,
      numVoters: 3200,
      payBack: 32309,
      balance: 13444,
      creator: "0x00",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 160 },
    { field: "body", headerName: "Body", width: 250 },
    { field: "numYes", headerName: "Num Yes", width: 200 },
    { field: "numNo", headerName: "Num No", width: 200 },
    { field: "numVoters", headerName: "Num Voters", width: 230 },
    { field: "payBack", headerName: "Payback", width: 200 },
    { field: "balance", headerName: "Balance", width: 200 },
    {
      field: "creator",
      headerName: "creator",
      width: 150,
      renderCell: (params: any) => (
        <>
          {params.value && params.value !== "0x00"
            ? shortenIfAddress(params.value)
            : "0x00"}
        </>
      ),
    },
  ];

  const getRows = (): GridRowData[] => {
    const keysToKeep: string[] = [
      "id",
      "title",
      "body",
      "numYes",
      "numNo",
      "numVoters",
      "payBack",
      "balance",
      "creator",
    ];
    const redux = (array: any[]): GridRowData[] =>
      array.map((o: any) =>
        keysToKeep.reduce((acc: any, curr: string) => {
          acc[curr] = o[curr];
          return acc;
        }, {})
      );
    const polls = allPolls.filter((poll: any) => poll?.title !== "");

    return polls.length !== 0 && !polls.includes(undefined)
      ? redux(polls)
      : fakeRow;
  };

  const { menu, setOpenDialog } = useGlobalContext();

  const [pollsCounter] = useContractCalls([
    {
      abi: contractInterface,
      address: contractAddress,
      method: "pollsCounter",
      args: [],
    },
  ]);
  const allPolls = useContractCalls(contractCallsArray);

  const openVoteDialog = (params: ParamsType) => {
    setOpenDialog({
      open: true,
      data: params,
    });
  };

  useEffect(() => {
    if (pollsCounter?.toString()) {
      const arrayToUpdate = [];
      for (
        let i = 0;
        i <= (pollsCounter?.toString() as unknown as number);
        i++
      ) {
        arrayToUpdate.push({
          abi: contractInterface,
          address: contractAddress,
          method: "polls",
          args: [i],
        });
      }
      setContractCallsArray(arrayToUpdate);
    }
  }, [pollsCounter]);

  function Footer() {
    return <div className="c-mb-1">Double click on single row to vote </div>;
  }

  return (
    <>
      {menu === Menu.Default && (
        <DataGrid
          className="table-container"
          rows={getRows()}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowDoubleClick={(params) =>
            openVoteDialog(params.row as ParamsType)
          }
          components={{ Footer: Footer }}
        />
      )}
      <VoteDialog />
    </>
  );
}
