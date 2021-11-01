import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useGlobalContext } from "../../context/GlobalContext";
import { ParamsType } from "../../@types/types";
import { useContractMethod } from "../../customHooks";
import { BigNumberish } from "@ethersproject/bignumber";

export default function VoteDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { send: vote } = useContractMethod("vote");
  const { openDialog, setOpenDialog } = useGlobalContext();
  const data = openDialog.data as ParamsType;

  const VoteAndClose = (opinion: number, id: BigNumberish) => {
    vote(opinion, id);
    setOpenDialog({ open: false, data: {} });
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={openDialog.open}
        onClose={() => setOpenDialog({ open: false, data: {} })}
      >
        <DialogTitle id="responsive-dialog-title">{data.title}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText></DialogContentText>
          <DialogContentText>{data.body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => VoteAndClose(0, data.id)}>
            Disagree
          </Button>
          <Button onClick={() => VoteAndClose(1, data.id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
