import { DataGrid, GridColDef, GridRowData } from "@mui/x-data-grid";
import { ContractCall, useContractCalls } from "@usedapp/core";
import { useEffect, useState } from "react";
import { useMenuContext, Menu } from "../../context/MenuContext";
import { contractAddress, contractInterface } from "../../customHooks";

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

  //https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-material-ui-datagrid/64331367#64331367
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 160 },
    { field: "body", headerName: "Body", width: 160 },
    { field: "numYes", headerName: "Num Yes", width: 200 },
    { field: "numNo", headerName: "Num No", width: 200 },
    { field: "numVoters", headerName: "Num Voters", width: 230 },
    { field: "payBack", headerName: "Payback", width: 200 },
    { field: "balance", headerName: "Balance", width: 200 },
    { field: "creator", headerName: "creator", width: 250 },
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

  const { menu } = useMenuContext();

  const [pollsCounter] = useContractCalls([
    {
      abi: contractInterface,
      address: contractAddress,
      method: "pollsCounter",
      args: [],
    },
  ]);
  const allPolls = useContractCalls(contractCallsArray);

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
      {allPolls.forEach((el: any) => {
        el && el.title.toString() !== "" && console.log(el);
      })}
      {menu === Menu.Default && (
        <DataGrid
          className="table-container"
          rows={getRows()}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{ Footer: Footer }}
        />
      )}
    </>
  );
}
