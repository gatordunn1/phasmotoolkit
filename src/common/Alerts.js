import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

import { removeAlert, selectAlerts } from "../appSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: theme.spacing(2),
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Alerts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const alerts = useSelector(selectAlerts);
  const [activeAlerts, setActiveAlerts] = React.useState([]);

  const handleClose = (alertId, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setActiveAlerts(activeAlerts.filter((alert) => alert.id !== alertId));
    dispatch(removeAlert(alertId));
  };

  // Maintain a maximum of 4 active alerts
  React.useEffect(() => {
    if (alerts && alerts.length > 0) {
      return setActiveAlerts((prev) => [...prev, ...alerts.slice(0, 4).map((a) => a.id)]);
    }
    setActiveAlerts([]);
  }, [alerts]);

  return alerts && alerts.length > 0 ? (
    <div className={classes.root}>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={activeAlerts.includes(alert.id)}
          autoHideDuration={5000}
          onClose={(_, reason) => handleClose(alert.id, reason)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClick={() => handleClose(alert.id)} severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  ) : null;
}
